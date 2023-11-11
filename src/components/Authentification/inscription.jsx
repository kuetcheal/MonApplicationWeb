import React from "react";
import { Typography, Card } from "@mui/material";
import "./inscription.css";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const styles = {
  card: {
    backgroundColor: "black",
    height: "660px",
    width: "100%",
    // backgroundImage: `url('https://c.wallhere.com/photos/45/4f/1920x1080_px_artwork_Colorful_digital_art_Lights-569988.jpg!d')`,
    // backgroundSize: "cover",
    // backgroundPosition: "center",
  },
};

const Inscription = () => {
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
                to="/navbar"
                style={{ marginLeft: "2px" }}
              >
                <span>Connectez-vous</span>{" "}
              </Link>
            </Typography>
          </div>
          <div className="input-container">
            <input
              className="edit"
              placeholder="username ou email"
              type="text"
              style={{ width: "450px" }}
            />
          </div>
          <div className="input-container">
            <input
              className="edit"
              placeholder="Mot de passe"
              type="password"
            />
          </div>
          <div className="connexion">
            <div className="connecter">
              <button className="connecter-button"> S'inscrire </button>
            </div>{" "}
          </div>
          <div
            className="forgot-password"
            style={{ color: "white", listStyleType: "none" }}
          >
            <Typography
              variant="h5"
              component="h1"
              style={{ color: "white", marginRight: "90px" }}
            >
              <Link to="/forgetPassword"> Mot de passe oublié ? </Link>
            </Typography>
          </div>
        </div>
        <div className="site">
          <img
            src={process.env.PUBLIC_URL + "/site.PNG"}
            alt="Mon image"
            style={{ height: "400px", width: "650px", marginLeft: "120px" }}
          />
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
