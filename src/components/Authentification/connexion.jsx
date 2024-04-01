import React, { useState, useEffect } from "react";
import { Typography, Card } from "@mui/material";
import "./connexion.css";
// import Navbar from './Navbar'
// import { useNavigate } from "react-router-dom";
 import axios from "axios";
// import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const styles = {
  card: {
    backgroundColor: "black",
    height: "656px",
    width: "100%",
    // backgroundImage: `url('https://c.wallhere.com/photos/45/4f/1920x1080_px_artwork_Colorful_digital_art_Lights-569988.jpg!d')`,
    // backgroundSize: "cover",
    // backgroundPosition: "center",
  },
};

const Connexion = () => {



  useEffect(() => {
    const adminId = 1; // Remplacez par l'ID de l'administrateur que vous souhaitez récupérer
  
    axios.get(`http://localhost:3001/admins/${adminId}`)
      .then((response) => {
        const adminData = response.data;
        // Comparer les identifiants, vérifier la connexion, etc.
        console.log(adminData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  // const navigate = useNavigate();
  // const [passe, setPasse] = useState("");
  // const [email, setEmail] = useState("");
  // const [admins, setAdmins] = useState([]);
  // useEffect(() => {
  //   seConnecter();
  // }, []);

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

  // const seConnecter = async () => {
  //   try {
  //     const response = await axios.get(`http://localhost:8000/api/listeAdmin`);
  //     setAdmins(response.data);
  //     if (response.data.length > 0) {
  //       const isAdmin = admins.some(
  //         (valeur) =>
  //           (valeur.nomAdmin === email || valeur.email === email) &&
  //           valeur.motPasse === passe
  //       );

  //       if (isAdmin) {
  //         navigate("/navbar");
  //       } else {
  //         Swal.fire({
  //           icon: "error",
  //           text: "Erreur de connexion",
  //         });
  //       }
  //     } else {
  //       Swal.fire({
  //         icon: "error",
  //         text: "Aucun admin dans la base de données",
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Erreur lors de la connexion :", error);
  //     Swal.fire({
  //       icon: "error",
  //       text: "Une erreur s'est produite lors de la connexion",
  //     });
  //   }
  // };

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
        <div className="boxe">
          {" "}
          <div className="slogane">
            <Typography variant="h3" component="h1" style={{ color: "white" }}>
              Se connecter
            </Typography>
          </div>
          <div className="inscription">
            <Typography variant="h5" component="h1" style={{ color: "white" }}>
              vous n'avez pas un compte ?
              <Link className="suppression__link" to="/">
                <span>inscrivez-vous</span>{" "}
              </Link>
            </Typography>
          </div>
          <div className="formulaire">
            <form>
              {/* <form
              onSubmit={(e) => {
                e.preventDefault();
                seConnecter();
              }}
            > */}
              <div className="input-containere">
                <input
                  className="edit-input4"
                  placeholder="username ou email"
                  type="text"
                />
              </div>
              <div className="input-containere" style={{ marginTop: "15px" }}>
                <input
                  className="edit-input4"
                  placeholder="Mot de passe"
                  type="password"
                />
              </div>

              <div className="connexion" style={{ marginTop: "15px" }}>
                <div className="connecter">
                  <Link to="/navbar">
                    <button type="submit" className="connecter-button">
                      {" "}
                      Se connecter{" "}
                    </button>
                  </Link>
                </div>{" "}
              </div>
            </form>
          </div>
          <div className="inscription" style={{ marginLeft: "10px" }}>
            <Typography variant="h5" component="h1" style={{ color: "white" }}>
              Oups un problème ?
              <Link
                to="/forgetPassword"
                className="suppression__link"
                style={{ marginLeft: "9px" }}
              >
                <span>Mot de passe oublié</span>{" "}
              </Link>
            </Typography>
          </div>
        </div>
        <div className="sites">
          <img src={process.env.PUBLIC_URL + "/site.PNG"} alt="Mon image" />
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

{
  /* <div className="input-containere">
<input
  className="edit-input4"
  placeholder="username ou email"
  type="text"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
</div>
<div className="input-containere" style={{ marginTop: "15px" }}>
<input
  className="edit-input4"
  placeholder="Mot de passe"
  type="password"
  value={passe}
  onChange={(e) => setPasse(e.target.value)}
/>
</div> */
}

{
  /* <div className="input-containere">
<input
  className="edit-input4"
  placeholder="username ou email"
  type="text"
  value={email}
/> */
}
