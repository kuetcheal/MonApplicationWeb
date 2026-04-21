import React, { useState } from "react";
import { Typography, Card } from "@mui/material";
import "./inscription.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Confirmation from "./confirmation.jsx";
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

const Inscription = () => {
  const navigate = useNavigate();

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [passwordError, setPasswordError] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    if (
      registerData.password.length < 8 ||
      !/\d/.test(registerData.password) ||
      !/[a-zA-Z]/.test(registerData.password)
    ) {
      const msg =
        "Le mot de passe doit contenir au moins 8 caractères, avec lettres et chiffres.";
      setPasswordError(msg);
      Swal.fire({
        icon: "error",
        title: "Oups !!!",
        text: msg,
      });
      return;
    }

    setPasswordError("");
    setIsRegistering(true);

    try {
      const payload = {
        nom: registerData.name,
        email: registerData.email,
        password: registerData.password,
      };

      const res = await authApi.register(payload);

      if (res.status === 200 || res.status === 201) {
        localStorage.setItem("pending_email", registerData.email);
        setShowConfirmation(true);
      }
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Impossible de créer le compte. Réessaie plus tard.";

      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: msg,
      });

      setShowConfirmation(false);
      console.error(err);
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <Card style={pageStyles.card}>
      <div className="register-shell">
        <div className="register-split">
          <section className="register-left-zone">
            <div className="register-left-body">
              <div className="register-form-box">
                <div className="register-main-title">
                  <Typography variant="h3" component="h2">
                    S'inscrire
                  </Typography>
                </div>

                <div className="register-switch-line">
                  <Typography variant="h5" component="h3">
                    vous avez déjà un compte ?
                    <Link className="register-inline-link" to="/connexion">
                      <span> Connectez-vous</span>
                    </Link>
                  </Typography>
                </div>

                <form
                  onSubmit={handleRegisterSubmit}
                  className="register-form-area"
                >
                  <div className="register-field-row">
                    <input
                      className="register-text-field"
                      required
                      placeholder="username"
                      type="text"
                      value={registerData.name}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          name: e.target.value,
                        })
                      }
                      disabled={isRegistering}
                    />
                  </div>

                  <div className="register-field-row">
                    <input
                      className="register-text-field"
                      required
                      placeholder="email"
                      type="email"
                      value={registerData.email}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          email: e.target.value,
                        })
                      }
                      disabled={isRegistering}
                    />
                  </div>

                  <div className="register-field-row">
                    <input
                      className="register-text-field"
                      required
                      placeholder="Mot de passe"
                      type="password"
                      value={registerData.password}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          password: e.target.value,
                        })
                      }
                      disabled={isRegistering}
                    />
                    {passwordError && (
                      <p className="register-error-text">{passwordError}</p>
                    )}
                  </div>

                  <div className="register-button-row">
                    <button
                      className="register-submit-btn"
                      type="submit"
                      disabled={isRegistering}
                    >
                      {isRegistering ? "Inscription..." : "S'inscrire"}
                    </button>
                  </div>
                </form>

                <Confirmation
                  open={showConfirmation}
                  email={registerData.email}
                  handleClose={() => setShowConfirmation(false)}
                  onConfirmed={() => {
                    setShowConfirmation(false);
                    localStorage.removeItem("pending_email");
                    navigate("/connexion");
                  }}
                />

                <div className="register-help-row">
                  <Typography variant="h5" component="h3">
                    Oups un problème ?
                    <Link
                      to="/forgetPassword"
                      className="register-inline-link"
                    >
                      <span> Mot de passe oublié</span>
                    </Link>
                  </Typography>
                </div>
              </div>
            </div>
          </section>

          <section
            className="register-right-zone"
            style={{
              backgroundImage: `linear-gradient(rgba(90,90,90,0.58), rgba(90,90,90,0.58)), url(${process.env.PUBLIC_URL + "/connexion.png"})`,
            }}
          >
            <div className="register-right-overlay">
              <div className="register-hero-center">
                <div className="register-brand-title">
                  <Typography variant="h2" component="h1">
                    AFRICA-<span>WEB</span>
                  </Typography>
                </div>

                <div className="register-brand-subtitle">
                  <Typography variant="h4" component="h2">
                    Explorer l'univers du web Africain 2.0
                  </Typography>
                </div>
              </div>
            </div>
          </section>
        </div>

        <footer className="register-footer-bar">
          <div className="register-footer-left">
            <div className="register-footer-logo">
              <img
                src={process.env.PUBLIC_URL + "/jenee-logo.svg"}
                alt="Logo Jenee"
              />
            </div>
          </div>

          <div className="register-footer-center">
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

export default Inscription;