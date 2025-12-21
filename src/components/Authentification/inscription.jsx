import React, { useState } from "react";
import { Typography, Card } from "@mui/material";
import "./inscription.css";
import { Link, useNavigate } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Swal from "sweetalert2";
import Confirmation from "./confirmation.jsx";
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

const Inscription = () => {
  const navigate = useNavigate();

  const [admins, setAdmins] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [passwordError, setPasswordError] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validation simple
    if (
      admins.password.length < 8 ||
      !/\d/.test(admins.password) ||
      !/[a-zA-Z]/.test(admins.password)
    ) {
      setPasswordError(
        "Le mot de passe doit contenir au moins 8 caractères, avec lettres et chiffres."
      );
      Swal.fire({
        icon: "error",
        title: "Oups !!!",
        text: "Le mot de passe doit contenir au moins 8 caractères, y compris des chiffres et des lettres.",
      });
      return;
    }
    setPasswordError("");

    try {
      // ✅ Symfony attend: nom, email, password
      const payload = {
        nom: admins.name,
        email: admins.email,
        password: admins.password,
      };

      const res = await authApi.register(payload);

      if (res.status === 200 || res.status === 201) {
        // ✅ stocke l'email pour que Confirmation le récupère même si on change de page
        localStorage.setItem("pending_email", admins.email);

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
              X Inscription
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
          <div className="box">
            <div className="slogane">
              <Typography variant="h3" component="h1" style={{ color: "white" }}>
                S'inscrire
              </Typography>
            </div>

            <div className="inscription">
              <Typography variant="h5" component="h1" style={{ color: "white" }}>
                vous avez déjà un compte ?
                <Link className="suppression__link" to="/connexion">
                  <span>Connectez-vous</span>
                </Link>
              </Typography>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="input-container">
                <input
                  className="edit"
                  required
                  placeholder="username"
                  type="text"
                  value={admins.name}
                  onChange={(e) =>
                    setAdmins({ ...admins, name: e.target.value })
                  }
                />
              </div>

              <div className="input-container">
                <input
                  className="edit"
                  required
                  placeholder="email"
                  type="email"
                  value={admins.email}
                  onChange={(e) =>
                    setAdmins({ ...admins, email: e.target.value })
                  }
                />
              </div>

              <div className="input-container-col">
                <input
                  className="edit"
                  required
                  placeholder="Mot de passe"
                  type="password"
                  value={admins.password}
                  onChange={(e) =>
                    setAdmins({ ...admins, password: e.target.value })
                  }
                />
                {passwordError && <p className="error">{passwordError}</p>}
              </div>

              <div className="contenaire">
                <button className="connecter-button" type="submit">
                  S'inscrire
                </button>
              </div>
            </form>

            {/* ✅ Confirmation : on ne navigate PAS sur close,
                on navigue seulement quand confirmé */}
            <Confirmation
              open={showConfirmation}
              handleClose={() => {
                setShowConfirmation(false);
                // Optionnel : si annulation, on peut supprimer l'email pending
                // localStorage.removeItem("pending_email");
              }}
              onConfirmed={() => {
                setShowConfirmation(false);
                localStorage.removeItem("pending_email");
                navigate("/connexion");
              }}
            />

            <div className="inscription">
              <Typography variant="h5" component="h1" style={{ color: "white" }}>
                Oups un problème ?
                <Link to="/forgetPassword" className="suppression__link">
                  <span>Mot de passe oublié</span>
                </Link>
              </Typography>
            </div>
          </div>

          <div className="site">
            <img src={process.env.PUBLIC_URL + "/site.PNG"} alt="Site" />
          </div>
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
