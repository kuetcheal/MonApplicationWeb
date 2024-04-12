import React, { useState } from "react";
import { Typography, Card } from "@mui/material";
import "./forgetPassword.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const styles = {
  card: {
    backgroundColor: "black",
    height: "660px",
    width: "100%",
  },
};

const Inscription = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();


  const handleSubmit=  async (e) =>{
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3001/error", { email });
      console.log(res.data); // Affiche la réponse du serveur dans la console
          navigate("/alertPassword");
    } catch (error) {
      console.error("Erreur lors de l'envoi de la demande:", error);
      // Afficher une notification ou un message d'erreur à l'utilisateur
      navigate("/alertPassword");
    }
  } 

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
          <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input className="edit-input4" placeholder=" email" type="text" style={{ width: "450px" }} required  
              value={email}
              onChange={(e) =>setEmail(e.target.value)}
            />
          </div>
          <div className="connexion"> <br />
            <div className="connecter">
              <button className="forget__button"  variant="outlined" > Passer à l'étape suivante  </button>                                        
            </div>{" "}
          </div>
          </form>
          <div className="forgot-password"  style={{ marginLeft: "35px" }}>
            <Typography variant="h5" component="h1" style={{ color: "white" }}>
             Oups !!! je me rappelles
              <Link
                to="/connexion"
                className="suppression__link"
                 style={{ marginLeft: "9px" }}
              >
                <span>Se connecter</span>{" "}
              </Link>
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
