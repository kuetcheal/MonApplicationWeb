import React, { useState, useEffect } from "react";
import { Typography, Card } from "@mui/material";
import "./connexion.css";
 import axios from "axios";
 import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const styles = {
  card: {
    backgroundColor: "black",
    height: "656px",
    width: "100%",
  },
};

const Connexion = () => {
     const [email, setEmail]= useState("");
     const [password, setPassword]= useState("");

const handleSubmit = async (e) =>{
  e.preventDefault();
  try {
    const res= await axios.post("http://localhost:3001/login", {email, password,});
     if(res.data.success){
      window.location.href = "/navbar";
     }else{
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: res.data.message,
      });
     }
  } catch (error){
          console.error("erreur lors de la connexion", error);

          Swal.fire({
            icon: "error",
            title: "Erreur",
            text: "les identifiants fournis sont incompatibles.",
          });
  }

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
            X Connexion
          </Typography>
        </div>
        <div className="annonce">
          <div className="tittle" style={{ color: "white" }}>
            <Typography variant="h2" component="h1">
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
        <div className="boxe">
          {" "}
          <div className="slogane">
            <Typography variant="h3" component="h1" style={{ color: "white" }}>
              Se connecter
            </Typography>
          </div>
          <div className="inscription">
            <Typography variant="h5" component="h1" style={{ color: "white" }}>
              vous n'avez pas un compte ?
              <Link className="suppression__link" to="/">
                <span>inscrivez-vous</span>{" "}
              </Link>
            </Typography>
          </div>
          <div className="formulaire">
            <form onSubmit={handleSubmit}>
              <div className="input-containere">
                <input
                  className="edit-input4"
                  placeholder="username ou email"
                  type="text"
                  required
                  value={email}
                  onChange={(e) =>setEmail(e.target.value)}
                />
              </div>
              <div className="input-containere" style={{ marginTop: "15px" }}>
                <input
                  className="edit-input4"
                  placeholder="Mot de passe"
                  type="password"
                  required
                  value={password}
                  onChange={(e) =>setPassword(e.target.value)}
                />
              </div>

              <div className="connexion" style={{ marginTop: "15px" }}>
                <div className="connecter">
                  
                    <button type="submit" className="connecter-button">
                      {" "}
                      Se connecter{" "}
                    </button>
                  
                </div>{" "}
              </div>
            </form>
          </div>
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
        <div className="sites">
          <img src={process.env.PUBLIC_URL + "/site.PNG"} alt="Mon image" />
        </div>
      </div>
      <div className="confidentialites">
        <div className="class">
          <Link to="/#">@Jenee</Link>
          <Link to="/#">Contact</Link>
          <Link to="/#">Confidentialité</Link>
          <Link to="/#">CGU</Link>
        </div>
        <div className="outil">
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

export default Connexion;