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

  // const [confirmationCode, setConfirmationCode] = useState(""); 

 
  // const handleConfirmationCodeChange = (e) => {
  //   setConfirmationCode(e.target.value);
  // };
 

  
  // const sendConfirmationCodeToBackend = async () => {
  //   try {
    
  //     const response = await axios.post("http://localhost:3001/admins", { code: confirmationCode });
      
     
  //     if (response.status === 200) {
        
  //       window.location.href = "/navbar";
       

       
  //       alert("Inscription réussie !");
  //       handleClose(); 
  //     } else {
        
  //       Swal.fire({
  //         icon: "error",
  //         title: "Oups !!!",
  //         text: "Le code fourni est incorrect, veuillez vérifier encore.",
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Erreur lors de l'envoi du code de confirmation au backend :", error);
     
  //     alert("Erreur lors de la vérification du code de confirmation. Veuillez réessayer.");
  //   }
  // };



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
            // value={confirmationCode} 
            // onChange={handleConfirmationCodeChange}
          />
        </DialogContent>
        <DialogActions>
        <Button onClick={handleClose} color="primary">Annuler</Button>
        {/* <Button onClick={sendConfirmationCodeToBackend} color="primary">Confirmer</Button> */}
        <Button onClick={handleClose} color="primary">Confirmer</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Confirmation;
