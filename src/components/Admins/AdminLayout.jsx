import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./adminLayout.css";

import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Avatar from "@mui/material/Avatar";

const AdminLayout = () => {
  const navigate = useNavigate();

  const logout = () => {
    // adapte si tu as une autre logique
    localStorage.removeItem("access_token");
    navigate("/connexion");
  };

  const navItems = [
    { label: "Dashboard", to: "/Accueil", icon: <DashboardIcon /> },
    { label: "Utilisateurs", to: "/clients", icon: <GroupIcon /> },
    { label: "Vidéos", to: "/admin/videos", icon: <VideoLibraryIcon /> },
    { label: "Paramètres", to: "/admin/parametres", icon: <SettingsIcon /> },
  ];

  return (
    <div className="adLayout">
      {/* TOP BAR */}
      <header className="adTopbar">
        <div className="adBrand">
          <img
            src={process.env.PUBLIC_URL + "/jenee-logo.svg"}
            alt="JENEE"
            className="adBrandLogo"
          />
          <div className="adBrandText">
            <div className="adBrandTitle">X Admins</div>
            <div className="adBrandSub">Bienvenue sur votre espace personnel Admin</div>
          </div>
        </div>

        <div className="adTopbarRight">
          <button className="adIconBtn" type="button" aria-label="notifications">
            <NotificationsNoneIcon />
          </button>
          <Avatar className="adAvatar">A</Avatar>
        </div>
      </header>

      {/* BODY */}
      <div className="adBody">
        {/* SIDEBAR */}
        <aside className="adSidebar">
          <div className="adNav">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `adNavItem ${isActive ? "active" : ""}`
                }
              >
                <span className="adNavIcon">{item.icon}</span>
                <span className="adNavLabel">{item.label}</span>
              </NavLink>
            ))}
          </div>

          <div className="adSidebarBottom">
            <div className="adSidebarDivider" />
            <button type="button" className="adLogout" onClick={logout}>
              <LogoutIcon />
              <span>Déconnexion</span>
            </button>
          </div>
        </aside>

        {/* CONTENT (pages admin) */}
        <main className="adContent">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
