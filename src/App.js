import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Connexion from "./components/Authentification/connexion";
import ErrorPassword from "./components/Authentification/errorPassword";
import AlertPassword from "./components/Authentification/alertPassword";
import Popup1 from "./components/Authentification/popup1";
import Inscription from "./components/Authentification/inscription";
import ForgetPassword from "./components/Authentification/forgetPassword";
import Navbar from "./components/navbar"; 
import Header from "./components/header";
import Videos from "./components/videos";
import Videos1 from "./components/videos1";
import Fluxod from "./components/fluxod";
import NotFoundPage from "./components/NotFoundPage";
import Accueil from "./components/Admins/Accueil";
import Sidebar from "./components/Admins/sidebar";
import Setting from "./components/settings/setting";
import Supression from "./components/settings/supression";
import Parametre from "./components/settings/parametre";

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Inscription/>} />
      <Route path="/connexion" element={<Connexion/>} />
      <Route path="/navbar" element={<Navbar/>} /> 
       <Route path="/header" element={<Header/>} /> 
      <Route path="/forgetPassword" element={<ForgetPassword/>} /> 
      <Route path="/videos" element={<Videos/>} />
      <Route path="/videos1" element={<Videos1/>} />
      <Route path="/popup1" element={<Popup1/>} />
      <Route path="/fluxod" element={<Fluxod/>} />
      <Route path="/errorPassword" element={<ErrorPassword/>} />
      <Route path="/alertPassword" element={<AlertPassword/>} />
      <Route path="/Accueil" element={<Accueil/>} />
      <Route path="/sidebar" element={<Sidebar/>} />
      <Route path="/setting" element={<Setting/>} />
      <Route path="/parametre" element={<Parametre/>} />
      <Route path="/supression" element={<Supression/>} />
      <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router> 
  );
};

export default App;
