import React from "react";
import { useEffect, useState } from "react";
//import { Card } from "@mui/material";
import "./accueil.css"
import { Link } from "react-router-dom"; // Importer Link si vous utilisez react-router-dom
import Avatar from "@mui/material/Avatar";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
const Accueil = () => {
  return (
    <div>  
        <Toolbar className="navbar">
          {/* Logo */}
          <img
            src={process.env.PUBLIC_URL + "/carte_afrique.png"} // Remplacez /logo.png par le chemin de votre logo
            alt="Logo"
            className="navbar__logo"
          />
          {/* Nom du site */}
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            className="navbar__title"
          >
            Bienvenue sur votre espace personnel 
          </Typography>
          {/* Avatar pour accéder au compte utilisateur */}
          <Link to="/mon-compte" className="navbar__link">
            <IconButton color="inherit" className="navbar__avatar">
              <Avatar>
                <AccountCircleIcon />
              </Avatar>
            </IconButton>
          </Link>
        </Toolbar>
    </div>
  );
};

export default Accueil;
