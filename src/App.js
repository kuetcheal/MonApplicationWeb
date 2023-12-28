import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Connexion from "./components/Authentification/connexion";
import Popup1 from "./components/Authentification/popup1";
import Inscription from "./components/Authentification/inscription";
import ForgetPassword from "./components/Authentification/forgetPassword";
import Navbar from "./components/navbar"; // Importez correctement votre composant navbar.jsx
import Videos from "./components/videos";
import Videos1 from "./components/videos1";
import Fluxod from "./components/fluxod";

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Inscription/>} />
      <Route path="/connexion" element={<Connexion/>} />
      <Route path="/navbar" element={<Navbar/>} /> 
      <Route path="/forgetPassword" element={<ForgetPassword/>} /> 
      <Route path="/videos" element={<Videos/>} />
      <Route path="/videos1" element={<Videos1/>} />
      <Route path="/popup1" element={<Popup1/>} />
      <Route path="/fluxod" element={<Fluxod/>} />
      </Routes>
    </Router> 
  );
};

export default App;
