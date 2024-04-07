import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "./popup1.css";

const Confirmation = ({ open, handleClose }) => { // Ajoutez les props open et handleClose
  return (
    <div className="confirmation">
      <Dialog open={open} onClose={handleClose}> {/* Utilisez la prop open pour afficher la boîte de dialogue */}
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Vous y êtes presque, pour confirmer votre inscription
            veuillez consulter votre email et entrer le code reçu.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="confirmation code"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Confirmation;
