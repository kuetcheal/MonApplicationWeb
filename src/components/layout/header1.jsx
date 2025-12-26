import React, { useState } from "react";
import { Typography, Avatar, Popover } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import LanguageIcon from "@mui/icons-material/Language";

import Setting from "../settings/setting";
import "./header1.css";

const Header1 = () => {
  const location = useLocation();

  const [anchorEl, setAnchorEl] = useState(null);
  const openSettings = Boolean(anchorEl);

  const menu = [
    { label: "Vidéos", path: "/navbar" },
    { label: "Actrices", path: "/actrices" },
    { label: "Nos Lives", path: "/lives" },
    { label: "Nos Engagements", path: "/engagements" },
    { label: "Nos Acteurs", path: "/acteurs" },
  ];

  const handleOpenSettings = (e) => setAnchorEl(e.currentTarget);
  const handleCloseSettings = () => setAnchorEl(null);

  return (
    <header className="awHeader">
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

      <div className="awHeader-actions">
        <NotificationImportantIcon className="awHeader-icon" />
        <AddToPhotosIcon className="awHeader-icon" />
        <LanguageIcon className="awHeader-icon" />

        <Avatar className="awHeader-avatar" onClick={handleOpenSettings} />

        <Popover
          open={openSettings}
          anchorEl={anchorEl}
          onClose={handleCloseSettings}
          keepMounted                 // ✅ évite certains démontages/rebuild
          container={document.body}
          disableScrollLock
          disableRestoreFocus
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          PaperProps={{
            className: "awHeader-settingsPopover",
            style: {
              marginTop: 8,
              maxWidth: "calc(100vw - 16px)",
              marginRight: 8,
            },
          }}
        >
          <Setting handleClose={handleCloseSettings} />
        </Popover>
      </div>
    </header>
  );
};

export default Header1;
