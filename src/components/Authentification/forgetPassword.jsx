import React from "react";
import { Typography, Card } from "@mui/material";
import "./forgetPassword.css";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const styles = {
  card: {
    backgroundColor: "black",
    height: "660px",
    width: "100%",
  },
};

const Inscription = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card style={styles.card}>
      <div className="header">
        <div className="logo">
          <img
            src={process.env.PUBLIC_URL + "/jenee-logo.svg"}
            alt="Mon image"
            style={{ height: "110px", width: "110px" }}
          />
        </div>
        <div className="connection">
          <Typography variant="h4" component="h1">
            {" "}
            X Mot de passe Oublié
          </Typography>
        </div>
        <div className="annonces">
          <div className="tittles" style={{ color: "white" }}>
            <Typography variant="h3" component="h1">
              {" "}
              AFRICA-<span>WEB</span>{" "}
            </Typography>
          </div>
          <div className="slogane">
            <Typography variant="h4" component="h1">
              Explorer l'univers du web Africain 2.0
            </Typography>
          </div>
        </div>
      </div>

      <div className="main">
        <div className="box">
          {" "}
          <div className="slogane">
            <Typography variant="h4" component="h1" style={{ color: "white" }}>
              Mot de passe oublier
            </Typography>
          </div>
          <div className="inscription">
            <Typography variant="h6" component="h1" style={{ color: "white" }}>
              Veuillez renseigner l'addresse email du compte
            </Typography>
          </div>
          <div className="input-container">
            <input
              className="edit-input4"
              placeholder="username ou email"
              type="text"
              style={{ width: "450px" }}
            />
          </div>
          <div className="connexion">
            <div className="connecter">
              <button
                variant="outlined"
                onClick={handleClickOpen}
                className="forget__button"
              >
                Passer à l'étape suivante
              </button>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle
                  style={{ color: "rgb(224, 12, 139)", textAlign: "center" }}
                >
                  Mot de passe oublié
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Vous y êtes presque, pour modifier votre mot de passe
                    veuillez consulter vos mails pour poursuivre la procédure.
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Email Address"
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
            </div>{" "}
          </div>
          <div className="forgot-password">
            <Typography variant="h5" component="h1" style={{ color: "white" }}>
              Mot de passe oublié ?
            </Typography>
          </div>
        </div>
        <div className="site">
          <img
            src={process.env.PUBLIC_URL + "/site.PNG"}
            alt="Mon image"
            style={{ height: "350px", width: "650px", marginLeft: "120px" }}
          />
        </div>
      </div>
      <div className="confidentialitées">
        <div className="itemes">
          <Link to="/#">@Jenee</Link>
          <Link to="/#">Contact</Link>
          <Link to="/#">Confidentialité</Link>
          <Link to="/#">CGU</Link>
        </div>
        <div className="outilité">
          <Link to="/#">
            <FacebookIcon />
          </Link>
          <Link to="/#">
            <TwitterIcon />
          </Link>
          <Link to="/#">
            <WhatsAppIcon />
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default Inscription;
