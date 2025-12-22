import React, { useState } from "react";
import { Typography, Card } from "@mui/material";
import "./forgetPassword.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Link, useNavigate } from "react-router-dom";
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

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await authApi.forgotPassword(email);

      // on garde l'email pour "Renvoyer"
      localStorage.setItem("pending_reset_email", email);

      navigate("/alertPassword");
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        "Impossible d'envoyer l'email. Réessaie plus tard.";

      Swal.fire({ icon: "error", title: "Erreur", text: msg });
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
                  disabled={loading}
                />
              </div>

              <div className="connexion">
                <button type="submit" className="forget__button" disabled={loading}>
                  {loading ? "Envoi..." : "Passer à l'étape suivante"}
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

export default ForgetPassword;
