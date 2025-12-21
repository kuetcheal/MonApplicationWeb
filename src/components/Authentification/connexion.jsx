import React, { useState } from "react";
import { Typography, Card } from "@mui/material";
import "./connexion.css";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
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

const Connexion = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Veuillez remplir email et mot de passe.",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await authApi.login(email, password);

      const token = res?.data?.token;

      if (!token) {
        Swal.fire({
          icon: "error",
          title: "Erreur",
          text: "Token introuvable. Vérifie la réponse /api/login.",
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
      setLoading(false);
    }
  };

  return (
    <Card style={styles.card}>
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
            <Typography variant="h4" component="h1">
              X Connexion
            </Typography>
          </div>

          <div className="annonce">
            <div className="tittle" style={{ color: "white" }}>
              <Typography variant="h4" component="h1">
                AFRICA-<span>WEB</span>
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
            <div className="slogane">
              <Typography variant="h3" component="h1" style={{ color: "white" }}>
                Se connecter
              </Typography>
            </div>

            <div className="inscription">
              <Typography variant="h5" component="h1" style={{ color: "white" }}>
                vous n'avez pas un compte ?
                <Link className="suppression__link" to="/">
                  <span>inscrivez-vous</span>
                </Link>
              </Typography>
            </div>

            <div className="formulaire">
              <form onSubmit={handleSubmit}>
                <div className="input-containere">
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

                <div
                  className="input-containere"
                  style={{ marginTop: "15px" }}
                >
                  <input
                    className="edit-input4"
                    placeholder="Mot de passe"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                  />
                </div>

                <div className="contenaire" style={{ marginTop: "15px" }}>
                  <button
                    type="submit"
                    className="connecter-button"
                    disabled={loading}
                  >
                    {loading ? "Connexion..." : "Se connecter"}
                  </button>
                </div>
              </form>
            </div>

            <div className="inscription">
              <Typography variant="h5" component="h1" style={{ color: "white" }}>
                Oups un problème ?
                <Link to="/forgetPassword" className="suppression__link">
                  <span>Mot de passe oublié</span>
                </Link>
              </Typography>
            </div>
          </div>

          <div className="sites">
            <img src={process.env.PUBLIC_URL + "/site.PNG"} alt="Site" />
          </div>
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
