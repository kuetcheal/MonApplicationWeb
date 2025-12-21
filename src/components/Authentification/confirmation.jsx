import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Swal from "sweetalert2";
import "./popup1.css";
import { authApi } from "../../api/authApi";

const Confirmation = ({ open, handleClose, onConfirmed }) => {
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setCode("");
      setEmail(localStorage.getItem("pending_email") || "");
    }
  }, [open]);

  const onChangeCode = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setCode(value.slice(0, 6));
  };

  const handleConfirm = async () => {
    if (!email) {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Email manquant. Recommence l'inscription.",
      });
      return;
    }

    if (code.length !== 6) {
      Swal.fire({
        icon: "error",
        title: "Code invalide",
        text: "Le code doit contenir 6 chiffres.",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await authApi.confirmEmail(email, code);

      Swal.fire({
        icon: "success",
        title: "Confirmation réussie",
        text: res?.data?.message || "Votre email a bien été confirmé.",
      });

      localStorage.removeItem("pending_email");
      handleClose();
      onConfirmed?.();
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        "Code incorrect ou expiré. Vous pouvez renvoyer un nouveau code.";

      Swal.fire({
        icon: "error",
        title: "Oups",
        text: msg,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Email manquant. Recommence l'inscription.",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await authApi.resendConfirmation(email);

      Swal.fire({
        icon: "success",
        title: "Code renvoyé",
        text: res?.data?.message || "Un nouveau code a été envoyé par email.",
      });
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        "Impossible de renvoyer le code. Réessaie dans quelques instants.";

      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: msg,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="confirmation">
      <Dialog open={open} onClose={loading ? undefined : handleClose}>
        <DialogTitle>Confirmation</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Vous y êtes presque ! Un code a été envoyé à :
            <br />
            <b>{email || "—"}</b>
            <br />
            Entrez le code reçu pour confirmer votre inscription.
          </DialogContentText>

          <TextField
            margin="dense"
            autoFocus
            fullWidth
            label="Code (6 chiffres)"
            variant="standard"
            value={code}
            onChange={onChangeCode}
            disabled={loading}
            inputProps={{ inputMode: "numeric", maxLength: 6 }}
            type="text"
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>
            Annuler
          </Button>

          <Button onClick={handleResend} disabled={loading}>
            Renvoyer le code
          </Button>

          <Button onClick={handleConfirm} disabled={loading}>
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Confirmation;
