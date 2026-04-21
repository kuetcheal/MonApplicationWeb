import React, { useState } from "react";
import { Typography, Card } from "@mui/material";
import "./connexion.css";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
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

const Connexion = () => {
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (!userEmail || !userPassword) {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Veuillez remplir email et mot de passe.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await authApi.login(userEmail, userPassword);
      const token = res?.data?.token;

      if (!token) {
        Swal.fire({
          icon: "error",
          title: "Erreur",
          text: "Token introuvable. Vérifie la réponse backend /api/login.",
        });
        return;
      }

      localStorage.setItem("access_token", token);

      Swal.fire({
        icon: "success",
        title: "Connexion réussie",
        timer: 900,
        showConfirmButton: false,
      });

      navigate("/navbar");
    } catch (error) {
      console.error("Erreur lors de la connexion", error);

      const msg =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Les identifiants fournis sont incorrects.";

      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: msg,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card style={pageStyles.card}>
      <div className="login-shell">
        <div className="login-split">
          {/* Partie gauche */}
          <section className="login-left-zone">
            <div className="login-left-body">
              <div className="login-form-box">
                <div className="login-main-title">
                  <Typography variant="h3" component="h2">
                    Se connecter
                  </Typography>
                </div>

                <div className="login-register-line">
                  <Typography variant="h5" component="h3">
                    vous n'avez pas un compte ?
                    <Link className="login-inline-link" to="/">
                      <span> inscrivez-vous</span>
                    </Link>
                  </Typography>
                </div>

                <form onSubmit={handleLoginSubmit} className="login-form-area">
                  <div className="login-field-row">
                    <input
                      className="login-text-field"
                      placeholder="email"
                      type="email"
                      required
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="login-field-row">
                    <input
                      className="login-text-field"
                      placeholder="Mot de passe"
                      type="password"
                      required
                      value={userPassword}
                      onChange={(e) => setUserPassword(e.target.value)}
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="login-button-row">
                    <button
                      type="submit"
                      className="login-submit-btn"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Connexion..." : "Se connecter"}
                    </button>
                  </div>
                </form>

                <div className="login-forgot-row">
                  <Typography variant="h5" component="h3">
                    Oups un problème ?
                    <Link to="/forgetPassword" className="login-inline-link">
                      <span> Mot de passe oublié</span>
                    </Link>
                  </Typography>
                </div>
              </div>
            </div>
          </section>

          {/* Partie droite */}
          <section
            className="login-right-zone"
            style={{
              backgroundImage: `linear-gradient(rgba(90,90,90,0.58), rgba(90,90,90,0.58)), url(${process.env.PUBLIC_URL + "/connexion.png"})`,
            }}
          >
            <div className="login-right-overlay">
              <div className="login-hero-center">
                <div className="login-brand-title">
                  <Typography variant="h2" component="h1">
                    AFRICA-<span>WEB</span>
                  </Typography>
                </div>

                <div className="login-brand-subtitle">
                  <Typography variant="h4" component="h2">
                    Explorer l'univers du web Africain 2.0
                  </Typography>
                </div>
              </div>
            </div>
          </section>
        </div>

        <footer className="login-footer-bar">
          <div className="login-footer-left">
            <div className="login-footer-logo">
              <img
                src={process.env.PUBLIC_URL + "/jenee-logo.svg"}
                alt="Logo Jenee"
              />
            </div>
          </div>

          <div className="login-footer-center">
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

export default Connexion;