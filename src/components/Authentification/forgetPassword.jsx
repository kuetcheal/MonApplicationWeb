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
    minHeight: "100vh", // ✅ plein écran
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
};

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3001/error", { email });
      navigate("/alertPassword");
    } catch (error) {
      console.error("Erreur lors de l'envoi de la demande:", error);
      navigate("/alertPassword");
    }
  };

  return (
    <Card style={styles.card}>
      {/* ✅ wrapper pour pousser footer en bas */}
      <div className="page">
        <div className="header">
          <div className="logo">
            <img
              src={process.env.PUBLIC_URL + "/jenee-logo.svg"}
              alt="Logo"
              style={{ height: "110px", width: "110px" }}
            />
          </div>

          <div className="connection">
            <Typography variant="h4" component="h1" style={{ color: "white" }}>
              X Mot de passe Oublié
            </Typography>
          </div>

          <div className="annonces">
            <div className="tittles" style={{ color: "white" }}>
              <Typography variant="h4" component="h1">
                AFRICA-<span>WEB</span>
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
            <div className="title-forget">
              <Typography variant="h4" component="h1" style={{ color: "white" }}>
                Mot de passe oublié
              </Typography>
            </div>

            <div className="inscription">
              <Typography variant="h6" component="p" style={{ color: "white" }}>
                Veuillez renseigner l'adresse email du compte
              </Typography>
            </div>

            <form onSubmit={handleSubmit} className="form-forget">
              <div className="input-container">
                <input
                  className="edit-input4"
                  placeholder="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="connexion">
                <button type="submit" className="forget__button">
                  Passer à l'étape suivante
                </button>
              </div>
            </form>

            <div className="forgot-password">
              <Typography variant="h5" component="p" style={{ color: "white" }}>
                Oups !!! je me rappelle
                <Link
                  to="/connexion"
                  className="suppression__link"
                  style={{ marginLeft: "9px" }}
                >
                  <span>Se connecter</span>
                </Link>
              </Typography>
            </div>
          </div>

          <div className="site">
            <img src={process.env.PUBLIC_URL + "/site.PNG"} alt="Site" />
          </div>
        </div>
      </div>

      {/* ✅ footer */}
      <div className="confidentialitées">
        <div className="itemes">
          <Link to="/#">@Jenee</Link>
          <Link to="/#">Contact</Link>
          <Link to="/#">Confidentialité</Link>
          <Link to="/#">CGU</Link>
        </div>

        <div className="outilité">
          <Link to="/#"><FacebookIcon /></Link>
          <Link to="/#"><TwitterIcon /></Link>
          <Link to="/#"><WhatsAppIcon /></Link>
        </div>
      </div>
    </Card>
  );
};

export default ForgetPassword;
