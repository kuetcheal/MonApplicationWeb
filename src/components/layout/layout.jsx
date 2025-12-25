import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header1 from "./header1";
import Footer from "./footer";
import "./layout.css";

const Layout = () => {
  const location = useLocation();

  
  const noHeaderRoutes = [
    "/connexion",
    "/inscription",
    "/forgetPassword",
    "/alertPassword",
    "/errorPassword",
  ];

  const hideHeader = noHeaderRoutes.includes(location.pathname);

  return (
    <div className="appLayout">
      {!hideHeader && <Header1 />}
      <main className="appContent">
        <Outlet />
      </main>
      {!hideHeader && <Footer />}
    </div>
  );
};

export default Layout;
