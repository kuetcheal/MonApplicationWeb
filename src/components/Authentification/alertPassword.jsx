import React, { useState } from "react";
import { Typography, Card } from "@mui/material";
import "./alertPassword.css";
import { Link, useNavigate } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Swal from "sweetalert2";
import { authApi } from "../../api/authApi";

const styles = {
  card: {
    backgroundColor: "black",
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
};

const AlertPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleResend = async () => {
    const email = localStorage.getItem("pending_reset_email");

    if (!email) {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Email introuvable. Recommence la procédure.",
      });
      navigate("/forgetPassword");
      return;
    }

    setLoading(true);
    try {
      await authApi.forgotPassword(email);
      Swal.fire({
        icon: "success",
        title: "Email renvoyé",
        text: "Si cet email existe, un nouveau lien vient d’être renvoyé.",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: err?.response?.data?.message || "Impossible de renvoyer l'email.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card style={styles.card}>
      <div className="auth-container">
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

          <div className="auth-main">
            <div className="auth-left">
              <div className="box">
                <Typography variant="h4" component="h1" style={{ color: "white" }}>
                  Mot de passe oublié
                </Typography>

                <div style={{ marginTop: 15 }}>
                  <Typography variant="body1" style={{ color: "white" }}>
                    Si votre email est enregistré dans notre base de données, vous allez
                    recevoir un mail de modification du mot de passe. Vérifiez votre boîte
                    email (et les spams).
                  </Typography>
                </div>

                <div style={{ marginTop: 35 }}>
                  <Typography variant="body1" style={{ color: "white" }}>
                    Vous n'avez pas reçu d'email ?
                  </Typography>
                </div>

                <div className="connexion" style={{ marginTop: 14 }}>
                  <button
                    type="button"
                    className="forget__button"
                    onClick={handleResend}
                    disabled={loading}
                  >
                    {loading ? "Renvoi..." : "Renvoyer"}
                  </button>
                </div>

                <div style={{ marginTop: 25 }}>
                  <Link to="/connexion" className="suppression__link">
                    <span>Retour à la connexion</span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="auth-right">
              <img src={process.env.PUBLIC_URL + "/site.PNG"} alt="Site" />
            </div>
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
            <Link to="/#"><FacebookIcon /></Link>
            <Link to="/#"><TwitterIcon /></Link>
            <Link to="/#"><WhatsAppIcon /></Link>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AlertPassword;
