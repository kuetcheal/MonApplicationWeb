// src/components/layout/layout.jsx
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header1 from "./header1";
import Footer from "./footer";
import "./layout.css";

const Layout = () => {
  const location = useLocation();

  // ✅ routes où on ne veut pas Header/Footer
  const noHeaderRoutes = [
    "/", // inscription chez toi
    "/connexion",
    "/forgetPassword",
    "/alertPassword",
    "/errorPassword",
    "/popup1",
  ];

  const hideHeader = noHeaderRoutes.includes(location.pathname);

  return (
    <div className="appLayout">
      {!hideHeader && <Header1 />}

      {/* ✅ Container uniforme */}
      <main className="appContent">
        <div className="siteContainer">
          <Outlet />
        </div>
      </main>

      {!hideHeader && <Footer />}
    </div>
  );
};

export default Layout;
