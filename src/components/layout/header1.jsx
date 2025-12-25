import React, { useState } from "react";
import { Typography, Avatar, Dialog } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import LanguageIcon from "@mui/icons-material/Language";

import Setting from "../settings/setting";
import "./header1.css";

const Header1 = () => {
  const location = useLocation();
  const [openSettings, setOpenSettings] = useState(false);

  const menu = [
    { label: "Vidéos", path: "/navbar" },
    { label: "Actrices", path: "/actrices" },
    { label: "Nos Lives", path: "/lives" },
    { label: "Nos Engagements", path: "/engagements" },
    { label: "Nos Acteurs", path: "/acteurs" },
  ];

  return (
    <header className="awHeader">
      {/* Logo */}
      <div className="awHeader-brand">
        <img
          src={process.env.PUBLIC_URL + "/carte_afrique.png"}
          alt="Africa Web"
          className="awHeader-logo"
        />
        <Typography component="h1" className="awHeader-title">
          AFRICA-<span>WEB</span>
        </Typography>
      </div>

      {/* Menu */}
      <nav className="awHeader-nav">
        {menu.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className={
              location.pathname === item.path
                ? "awHeader-link active"
                : "awHeader-link"
            }
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Actions */}
      <div className="awHeader-actions">
        <NotificationImportantIcon />
        <AddToPhotosIcon />
        <LanguageIcon />

        <Avatar
          className="awHeader-avatar"
          onClick={() => setOpenSettings(true)}
        />

        <Dialog open={openSettings} onClose={() => setOpenSettings(false)}>
          <Setting handleClose={() => setOpenSettings(false)} />
        </Dialog>
      </div>
    </header>
  );
};

export default Header1;
