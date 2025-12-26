import * as React from "react";
//import Button from "@mui/material/Button";
//import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "./popup1.css";

const Popup1 = () => {
  return (
    <div className="popup1">
      <Dialog>
        <DialogTitle className="popup1__tittle">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <div>
            <button className="popup__button-set">paramètres</button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default Popup1;
