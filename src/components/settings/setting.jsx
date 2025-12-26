import React, { useEffect, useState } from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import "./settings.css";
import { authApi } from "../../api/authApi";

import ConfirmDialog from "./ConfirmDialog";
import EditProfileDialog from "./EditProfileDialog";

const Setting = ({ handleClose }) => {
  const navigate = useNavigate();

  const [loadingMe, setLoadingMe] = useState(true);
  const [me, setMe] = useState(null);

  const [openLogout, setOpenLogout] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const loadMe = async () => {
    setLoadingMe(true);
    try {
      const res = await authApi.me();
      setMe(res.data);
    } catch (err) {
      localStorage.removeItem("access_token");
      navigate("/connexion");
    } finally {
      setLoadingMe(false);
    }
  };

  useEffect(() => {
    loadMe();
    // eslint-disable-next-line
  }, []);

  const logoutNow = () => {
    localStorage.removeItem("access_token");
    Swal.fire({
      icon: "success",
      title: "Déconnecté",
      timer: 900,
      showConfirmButton: false,
    });
    handleClose?.(); 
    navigate("/connexion");
  };

  const deleteNow = async () => {
    try {
      await authApi.deleteMe();
      localStorage.removeItem("access_token");
      Swal.fire({
        icon: "success",
        title: "Compte supprimé",
        timer: 1200,
        showConfirmButton: false,
      });
      handleClose?.(); 
      navigate("/connexion");
    } catch (err) {
      const msg =
        err?.response?.data?.message || "Impossible de supprimer le compte.";
      Swal.fire({ icon: "error", title: "Erreur", text: msg });
    }
  };

  const saveProfile = async (payload) => {
    try {
      const res = await authApi.updateMe(payload);
      setMe(res.data);
      setOpenEdit(false);
      Swal.fire({
        icon: "success",
        title: "Modifications enregistrées",
        timer: 900,
        showConfirmButton: false,
      });
      // ✅ tu peux laisser le popover ouvert ou le fermer :
      handleClose?.();
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        "Impossible de mettre à jour le profil.";
      Swal.fire({ icon: "error", title: "Erreur", text: msg });
    }
  };

  const nom = me?.nom || me?.client?.nom || "Utilisateur";
  const email = me?.email || me?.client?.email || "";

  return (
    <>
      {/* ✅ contenu mini popover */}
      <Box className="settingsPopoverInner">


        {loadingMe ? (
          <Box className="settingsLoadingMini">
            <CircularProgress size={20} />
          </Box>
        ) : (
          <>
            <Box className="settingsMiniInfo">
              <Typography className="settingsMiniName">{nom}</Typography>
              <Typography className="settingsMiniEmail">{email}</Typography>
            </Box>

            <Box className="settingsMiniActions">
              <Button
                size="small"
                variant="contained"
                className="btnPrimary"
                onClick={() => setOpenEdit(true)}   // ✅ ne ferme pas le popover
              >
                Modifier
              </Button>

              <Button
                size="small"
                variant="outlined"
                className="btnOutline"
                onClick={() => setOpenLogout(true)} // ✅ ne ferme pas le popover
              >
                Déconnexion
              </Button>

              <Button
                size="small"
                variant="contained"
                color="error"
                className="btnDanger"
                onClick={() => setOpenDelete(true)} 
              >
                Supprimer
              </Button>
            </Box>
          </>
        )}
      </Box>

      
      <ConfirmDialog
        open={openLogout}
         sx = {{color: "#000", }}
        title="Déconnexion"
        message="Êtes-vous sûr de vouloir vous déconnecter ?"
        confirmText="Se déconnecter"
        cancelText="Annuler"
        onClose={() => setOpenLogout(false)}
        onConfirm={() => {
          setOpenLogout(false);
          logoutNow();
        }}
      />

      <ConfirmDialog
        open={openDelete}
        sx = {{color: "#000", }}
        title="Suppression du compte"
        message="Attention : cette action est irréversible. Voulez-vous vraiment supprimer votre compte ?"
        confirmText="Supprimer"
        cancelText="Annuler"
        danger
        onClose={() => setOpenDelete(false)}
        onConfirm={() => {
          setOpenDelete(false);
          deleteNow();
        }}
      />

      <EditProfileDialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        me={me}
        onSave={saveProfile}
      />
    </>
  );
};

export default Setting;
