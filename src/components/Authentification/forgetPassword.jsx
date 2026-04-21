import React, { useState } from "react";
import { Typography, Card } from "@mui/material";
import "./forgetPassword.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { authApi } from "../../api/authApi";

const pageStyles = {
  card: {
    backgroundColor: "black",
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    borderRadius: 0,
    boxShadow: "none",
  },
};

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [resetEmail, setResetEmail] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    try {
      await authApi.forgotPassword(resetEmail);

      localStorage.setItem("pending_reset_email", resetEmail);
      navigate("/alertPassword");
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        "Impossible d'envoyer l'email. Réessaie plus tard.";

      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: msg,
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Card style={pageStyles.card}>
      <div className="forgot-shell">
        <div className="forgot-split">
          <section className="forgot-left-zone">
            <div className="forgot-left-body">
              <div className="forgot-form-box">
                <div className="forgot-main-title">
                  <Typography variant="h3" component="h2">
                    Mot de passe oublié
                  </Typography>
                </div>

                <div className="forgot-info-line">
                  <Typography variant="h5" component="h3">
                    Veuillez renseigner l'adresse email du compte
                  </Typography>
                </div>

                <form
                  onSubmit={handleForgotSubmit}
                  className="forgot-form-area"
                >
                  <div className="forgot-field-row">
                    <input
                      className="forgot-text-field"
                      placeholder="email"
                      type="email"
                      required
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      disabled={isSending}
                    />
                  </div>

                  <div className="forgot-button-row">
                    <button
                      type="submit"
                      className="forgot-submit-btn"
                      disabled={isSending}
                    >
                      {isSending ? "Envoi..." : "Passer à l'étape suivante"}
                    </button>
                  </div>
                </form>

                <div className="forgot-help-row">
                  <Typography variant="h5" component="h3">
                    Oups !!! je me rappelle
                    <Link to="/connexion" className="forgot-inline-link">
                      <span> Se connecter</span>
                    </Link>
                  </Typography>
                </div>
              </div>
            </div>
          </section>

          <section
            className="forgot-right-zone"
            style={{
              backgroundImage: `linear-gradient(rgba(90,90,90,0.58), rgba(90,90,90,0.58)), url(${process.env.PUBLIC_URL + "/connexion.png"})`,
            }}
          >
            <div className="forgot-right-overlay">
              <div className="forgot-hero-center">
                <div className="forgot-brand-title">
                  <Typography variant="h2" component="h1">
                    AFRICA-<span>WEB</span>
                  </Typography>
                </div>

                <div className="forgot-brand-subtitle">
                  <Typography variant="h4" component="h2">
                    Explorer l'univers du web Africain 2.0
                  </Typography>
                </div>
              </div>
            </div>
          </section>
        </div>

        <footer className="forgot-footer-bar">
          <div className="forgot-footer-left">
            <div className="forgot-footer-logo">
              <img
                src={process.env.PUBLIC_URL + "/jenee-logo.svg"}
                alt="Logo Jenee"
              />
            </div>
          </div>

          <div className="forgot-footer-center">
            <Link to="/#">@Jenee</Link>
            <Link to="/#">Contact</Link>
            <Link to="/#">politique de Confidentialité</Link>
            <Link to="/#">Contact</Link>
            <Link to="/#">Mentions légales</Link>
            <Link to="/#">CGU</Link>
          </div>
        </footer>
      </div>
    </Card>
  );
};

export default ForgetPassword;