import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from "@mui/material";
import "./inscription.css";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";

const styles = {
  card: {
    backgroundColor: "black",
    height: "656px",
    width: "100%",
  },
};

//Ouverture de la popup
const Inscription = () => {
  
  const [open, setOpen] = React.useState(false);
  const [admins, setAdmins] = useState({
    name: "",
    email: "",
    password: "",
  });

   const [passwordError, setPasswordError] = useState("");


  //Methode pour l'insertion d'un utilisateur
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   axios
  //     .post("http://localhost:3001/admins", admins)
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // };


   const handleSubmit = async (e) => {
     e.preventDefault();
  
    if (
      admins.password.length < 8 ||
      !/\d/.test(admins.password) ||
      !/[a-zA-Z]/.test(admins.password)
    ) {
      setPasswordError(
        "Le mot de passe doit contenir au moins 8 caractères, y compris des chiffres et des lettres."
      );
      return; 
    }



    try {
    const res = await axios.post("http://localhost:3001/admins", admins);
    console.log(res);
    // ... (redirection ou autre action si l'inscription a réussi)
  } catch (err) {
    if (err.response && err.response.status === 400 && err.response.data.error === 'Un administrateur avec cet email existe déjà.') {
      // Afficher un message d'erreur à l'utilisateur (exemple avec une boîte de dialogue)
      alert("L'email saisi existe déjà. Veuillez saisir un autre email.");
    } else {
      console.error(err);
      // Gérer d'autres types d'erreurs
    }
  }
  };
  

  //ouverture et fermeture de la popup
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //Methode pour afficher les utilisateurs
  useEffect(() => {
    axios
      .get("http://localhost:3001/")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // const handleData = async () => {
  //   try {
  //     const response = await axios.post(
  //       `http://localhost:8000/api/adminss`,
  //       admins
  //     );
  //     console.log(response);
  //   } catch (error) {
  //     console.error("Erreur lors de la connexion :", error);
  //   }

  // };

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
              <div className={`connexion ${open ? "with-opacity" : ""}`}>
                <button
                  variant="outlined"
                  onClick={handleClickOpen}
                  // onClick={() => handleData()}
                  className="connecter-button"
                  style={{ width: "475px", height: "35px" }}
                >
                  S'inscrire
                </button>
                <Dialog open={open} onClose={handleClose}>
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
              </div>{" "}
            </div>
          </form>
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
