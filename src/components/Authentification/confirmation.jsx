import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import Swal from "sweetalert2";
import "./popup1.css";

const Confirmation = ({ open, handleClose }) => { 

  const [confirmationCode, setConfirmationCode] = useState(""); // Ajoutez un état pour stocker le code de confirmation saisi par l'utilisateur

  // Fonction pour gérer le changement de valeur du champ de texte du code de confirmation
  const handleConfirmationCodeChange = (e) => {
    setConfirmationCode(e.target.value);
  };
 

  // Fonction pour gérer la soumission du formulaire
  const sendConfirmationCodeToBackend = async () => {
    try {
      // Envoyez une requête POST au backend avec le code de confirmation
      const response = await axios.post("http://localhost:3001/admins", { code: confirmationCode });
      
      // Vérifiez la réponse du backend
      if (response.status === 200) {
        
        window.location.href = "/navbar";
        // Insérez ici le code pour insérer les informations d'inscription dans la base de données

       
        alert("Inscription réussie !");
        handleClose(); // Fermez la boîte de dialogue de confirmation
      } else {
        // Si la vérification échoue, affichez un message d'erreur à l'utilisateur
        Swal.fire({
          icon: "error",
          title: "Oups !!!",
          text: "Le code fourni est incorrect, veuillez vérifier encore.",
        });
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi du code de confirmation au backend :", error);
      // Gérez les erreurs en affichant un message d'erreur à l'utilisateur
      alert("Erreur lors de la vérification du code de confirmation. Veuillez réessayer.");
    }
  };



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
            margin="dense"  autoFocus  fullWidth label="confirmation code"
            id="name" 
            type="email"     
            variant="standard"
            value={confirmationCode} // Associez la valeur du champ de texte à l'état confirmationCode
            onChange={handleConfirmationCodeChange}
          />
        </DialogContent>
        <DialogActions>
        <Button onClick={handleClose} color="primary">Annuler</Button>
        <Button onClick={sendConfirmationCodeToBackend} color="primary">Confirmer</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Confirmation;
