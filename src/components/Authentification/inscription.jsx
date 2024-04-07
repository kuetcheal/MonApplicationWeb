import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  // Dialog,
  // DialogActions,
  // DialogContent,
  // DialogTitle,
  // DialogContentText,
} from "@mui/material";
import "./inscription.css";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
//import Button from "@mui/material/Button";
//import TextField from "@mui/material/TextField";
import axios from "axios";
import Confirmation from "./confirmation.jsx";

const styles = {
  card: {
    backgroundColor: "black",
    height: "656px",
    width: "100%",
  },
};


const Inscription = () => {
  
  const [admins, setAdmins] = useState({
    name: "",
    email: "",
    password: "",
  });

   const [passwordError, setPasswordError] = useState("");
   const [showConfirmation, setShowConfirmation] = useState(false);

 
   const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (admins.password.length < 8 || !/\d/.test(admins.password) || !/[a-zA-Z]/.test(admins.password)){
      setPasswordError(
        "Le mot de passe doit contenir au moins 8 caractères, y compris des chiffres et des lettres."
      );
      return; 
    }
  
    try {
      const res = await axios.post("http://localhost:3001/admins", admins);
      console.log(res);

    if (res.status === 200) {
      setShowConfirmation(true); // Afficher la popup uniquement si l'inscription est réussie
    }
    } catch (err) {
      if (err.response && err.response.status === 400 && err.response.data.error === 'Un administrateur avec cet email existe déjà.') {
        alert("L'email saisi existe déjà. Veuillez saisir un autre email.");
        setShowConfirmation(false);
      } else {
        console.error(err);
      }
    }
  };
  
  const handleClickOpen = () => {
    setShowConfirmation(true);
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
            X Inscription
          </Typography>
        </div>
        <div className="annonce">
          <div className="tittle" style={{ color: "white" }}>
            <Typography variant="h4" component="h1">
              {" "}
              AFRICA-<span>WEB</span>{" "}
            </Typography>
          </div>
          <div className="slogan">
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
            <Typography variant="h3" component="h1" style={{ color: "white" }}>
              S'inscrire
            </Typography>
          </div>
          <div className="inscription">
            <Typography variant="h5" component="h1" style={{ color: "white" }}>
              vous avez déjà un compte ?
              <Link
                className="suppression__link"
                to="/connexion"
                style={{ marginLeft: "2px" }}
              >
                <span>Connectez-vous</span>{" "}
              </Link>
            </Typography>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <input
                className="edit"
                placeholder="username "
                type="text"
                onChange={(e) => setAdmins({ ...admins, name: e.target.value })} 
              />
            </div>
            <div className="input-container">
              <input
                className="edit"
                placeholder=" email"
                type="email"
                onChange={(e) =>
                  setAdmins({ ...admins, email: e.target.value })
                }
              />
            </div>
            <div className="input-container">
              <div className="input-container">
                <input
                className="edit"
                placeholder="Mot de passe"
                type="password"
                onChange={(e) =>
                  setAdmins({ ...admins, password: e.target.value })
                }
                 />
              </div>
                {passwordError && <p className="error">{passwordError}</p>}
            </div>
            <div>
              {/* <div className={`connexion ${open ? "with-opacity" : ""}`}> */}
              <div className="contenaire">
                <button
                  variant="outlined"
                  onClick={handleClickOpen}
                  // onClick={() => handleData()}
                  className="connecter-button"
                  style={{ width: "475px", height: "35px" }}
                >
                  S'inscrire
                </button>
               
              </div>{" "}
            </div>
          </form>
          <Confirmation open={showConfirmation} handleClose={() => setShowConfirmation(false)} />
          <div className="inscription" style={{ marginLeft: "10px" }}>
            <Typography variant="h5" component="h1" style={{ color: "white" }}>
              Oups un problème ?
              <Link
                to="/forgetPassword"
                className="suppression__link"
                style={{ marginLeft: "9px" }}
              >
                <span>Mot de passe oublié</span>{" "}
              </Link>
            </Typography>
          </div>
        </div>
        <div className="site">
          <img src={process.env.PUBLIC_URL + "/site.PNG"} alt="Mon image" />
        </div>
      </div>
      <div className="confidentialite">
        <div className="items">
          <Link to="/#">@Jenee</Link>
          <Link to="/#">Contact</Link>
          <Link to="/#">Confidentialité</Link>
          <Link to="/#">CGU</Link>
        </div>
        <div className="outils">
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
