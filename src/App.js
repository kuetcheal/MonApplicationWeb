import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// AUTH (sans Layout)
import Connexion from "./components/Authentification/connexion";
import ErrorPassword from "./components/Authentification/errorPassword";
import AlertPassword from "./components/Authentification/alertPassword";
import Popup1 from "./components/Authentification/popup1";
import Inscription from "./components/Authentification/inscription";
import ForgetPassword from "./components/Authentification/forgetPassword";

// APP
import Navbar from "./components/navbar";
import SingleVideo from "./components/SingleVideo";
import Header from "./components/header";
import Fluxod from "./components/fluxod";
import NotFoundPage from "./components/NotFoundPage";

// Admin / Settings
import Accueil from "./components/Admins/Accueil";
import Sidebar from "./components/Admins/sidebar";
import Setting from "./components/settings/setting";
import Supression from "./components/settings/supression";
import Parametre from "./components/settings/parametre";

// Layout
import Layout from "./components/layout/layout";

const App = () => {
  return (
    <Router>
      <Routes>
       
        <Route path="/" element={<Inscription />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route path="/popup1" element={<Popup1 />} />
        <Route path="/errorPassword" element={<ErrorPassword />} />
        <Route path="/alertPassword" element={<AlertPassword />} />

       
        <Route element={<Layout />}>
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/video/:id" element={<SingleVideo />} />
          <Route path="/header" element={<Header />} />
          <Route path="/fluxod" element={<Fluxod />} />

          <Route path="/Accueil" element={<Accueil />} />
          <Route path="/sidebar" element={<Sidebar />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/parametre" element={<Parametre />} />
          <Route path="/supression" element={<Supression />} />
        </Route>

     
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
