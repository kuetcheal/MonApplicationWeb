import React from "react";
import { useEffect, useState } from "react";
//import { Card } from "@mui/material";
import "./accueil.css";
import { Link } from "react-router-dom"; // Importer Link si vous utilisez react-router-dom
import Avatar from "@mui/material/Avatar";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
//import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios from "axios";

const Accueil = () => {
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const responses = await axios.post("http://localhost:3001/admins", {
          name,
        });
        const { userId } = responses.data;
        setUserId(userId);

        const response = await axios.get(
          "http://localhost:3001/user/${userId}"
        );
        const userData = response.data;
        setName(userData.name);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données de l'utilisateur :",
          error
        );
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <div className="navbar">
         <div className="logo">
          <img
            src={process.env.PUBLIC_URL + "/jenee-logo.svg"}
            alt="Logo"
            
            style={{ height: "120px", width: "120px" }}
          />
          </div>
          <div className="partie" style={{color: "white"}}>
          <Typography> <h2>X Admins</h2> </Typography>
          </div>
          <div className="entete">
            <Typography>
              Bienvenue sur votre espace personnel {name}
            </Typography>
          </div>
          <div className="avatar">
              <IconButton color="inherit" >
                <Avatar>   
                </Avatar>
              </IconButton>
          </div>
      </div>

      <div className="bording">
        
      </div>
    </div>
  );
};

export default Accueil;
