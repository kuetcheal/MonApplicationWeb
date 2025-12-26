import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from "@mui/material";

const EditProfileDialog = ({ open, onClose, me, onSave }) => {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setNom(me?.nom || me?.client?.nom || "");
    setEmail(me?.email || me?.client?.email || "");
  }, [me, open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave?.({ nom, email });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Modifier mon profil</DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: "grid", gap: 2, mt: 1 }}>
            <TextField
              label="Nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              fullWidth
              required
            />

            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            Annuler
          </Button>
          <Button type="submit" variant="contained">
            Enregistrer
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditProfileDialog;
