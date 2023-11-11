import React, { useState, useEffect } from "react";
import { Typography, Card } from "@mui/material";
import "./connexion.css";
import {useNavigate} from "react-router-dom"
import axios from 'axios'
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";


const styles = {
  card: {
    backgroundColor: "black",
    height: "100%",
    width: "100%",
    backgroundImage: `url('https://c.wallhere.com/photos/45/4f/1920x1080_px_artwork_Colorful_digital_art_Lights-569988.jpg!d')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
};

const Connexion = () => {
  const navigate = useNavigate();  
  const [passe, setPasse] = useState("");
  const [email, setEmail] = useState("");
  const [admins, setAdmins] = useState([]);
  useEffect(() => {
    seConnecter();
  }, []);


//   const seConnecter =async()=> {
//     await axios.get(`http://localhost:8000/api/listeAdmin`).then(({data})=>{
//             setAdmins(data)
//         })
//         if(admins.lenght>0){
//             admins.map((valeur, key) => {
//                 if((valeur.nomAdmin==`${email}` && valeur.motPasse==`${passe}`) || (valeur.email==`${email}` && valeur.motPasse==`${passe}`) ){
//                     navigate("/navbar");
//                 }
                
//             });
//             Swal.fire({
//                 icon:"error",
//                 text:"Erreur de connexion"
//               })
//         }else{
//             Swal.fire({
//                 icon:"error",
//                 text:"aucun admin dans la base de données"
//               })
//         }
// }

const seConnecter = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/listeAdmin`);
      setAdmins(response.data);
      if (response.data.length > 0) {
        const isAdmin = admins.some(
          (valeur) =>
            (valeur.nomAdmin === email || valeur.email === email) &&
            valeur.motPasse === passe
        );

        if (isAdmin) {
          navigate("/navbar");
        } else {
          Swal.fire({
            icon: "error",
            text: "Erreur de connexion",
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          text: "Aucun admin dans la base de données",
        });
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      Swal.fire({
        icon: "error",
        text: "Une erreur s'est produite lors de la connexion",
      });
    }
  };


  return (
    <Card style={styles.card}>
      <div className="header">
        <div className="logo">
          <img
            src={process.env.PUBLIC_URL + "/jenee-logo.svg"}
            alt="Mon image"
            style={{ height: "110px", width: "110px" }}
          />
        </div>
        <div className="connection">
          <Typography variant="h4" component="h1">
            {" "}
            X Connexion
          </Typography>
        </div>
        <div className="annonce">
          <div className="tittle" style={{ color: "white" }}>
            <Typography variant="h2" component="h1">
              {" "}
              AFRICA-<span>WEB</span>{" "}
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
          {" "}
          <div className="slogane">
            <Typography variant="h3" component="h1" style={{ color: "white" }}>
              Se connecter
            </Typography>
          </div>
          <div className="inscription">
            <Typography variant="h5" component="h1" style={{ color: "white" }}>
              vous n'avez pas un compte ? 
              <Link className="suppression__link" to="/inscription">
                   <span>inscrivez-vous</span>{" "}
                </Link>
            </Typography>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); seConnecter(); }}>
         
            <div className="input-container">
              <input
                className="edit-input4"
                placeholder="username ou email"
                type="text"
                value={email} 
                onChange = {(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-container">
              <input
                className="edit-input4"
                placeholder="Mot de passe"
                type="password"
                value={passe}
                onChange = {(e) => setPasse(e.target.value)}
              />
            </div>
         
          <div className="connexion">
            <div className="connecter">
              <button type="submit" className="connecter-button"> Se connecter </button>
            </div>{" "}
          </div>
          </form>
          <div className="forgot-password">
            <Typography variant="h5" component="h1" style={{ color: "white" }}>
              Mot de passe oublié ?
            </Typography>
          </div>
        </div>
        <div className="site">
          <img
            src={process.env.PUBLIC_URL + "/site.PNG"}
            alt="Mon image"
            style={{ height: "500px", width: "650px", marginLeft: "120px" }}
          />
        </div>
      </div>
    </Card>
  );
};

export default Connexion;
