import React, { useState } from "react";
import { Typography, Divider, IconButton, Dialog, Avatar } from "@mui/material";
import "./header.css";

import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import LanguageIcon from "@mui/icons-material/Language";
import SearchIcon from "@mui/icons-material/Search";

import Setting from "./settings/setting";

const Header = ({
  activeLink,
  onLinkClick,
  texteRecherche,
  onSearchChange,
}) => {
  // popup settings
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="aw-header">
      {/* TOP BAR */}
      <div className="aw-topbar">
        {/* LEFT: Logo + Title */}
        <div className="aw-brand">
          <div className="aw-logo">
            <img
              src={process.env.PUBLIC_URL + "/carte_afrique.png"}
              alt="Africa map"
            />
          </div>

          <div className="aw-title">
            <Typography variant="h4" component="h2">
              AFRICA-<span className="aw-accent">WEB</span>
            </Typography>
          </div>
        </div>

        {/* CENTER: Menu */}
        <nav className="aw-nav">
          <button
            type="button"
            onClick={() => onLinkClick(0)}
            className={`aw-navlink ${activeLink === 0 ? "is-active" : ""}`}
          >
            Vidéos
          </button>

          <button
            type="button"
            onClick={() => onLinkClick(1)}
            className={`aw-navlink ${activeLink === 1 ? "is-active" : ""}`}
          >
            Actrices
          </button>

          <button
            type="button"
            onClick={() => onLinkClick(2)}
            className={`aw-navlink ${activeLink === 2 ? "is-active" : ""}`}
          >
            Nos Lives
          </button>

          <button
            type="button"
            onClick={() => onLinkClick(3)}
            className={`aw-navlink ${activeLink === 3 ? "is-active" : ""}`}
          >
            Nos Engagements
          </button>
        </nav>

        {/* RIGHT: Icons + Avatar */}
        <div className="aw-actions">
          <NotificationImportantIcon className="aw-icon" />
          <AddToPhotosIcon className="aw-icon" />
          <LanguageIcon className="aw-icon" />

          <IconButton className="aw-avatarBtn" onClick={handleOpen}>
            <Avatar sx={{ width: 42, height: 42 }} />
          </IconButton>

          <Dialog open={open} onClose={handleClose}>
            <Setting handleClose={handleClose} />
          </Dialog>
        </div>
      </div>

      {/* SECOND ROW: Mes Events + Tabs + Search */}
      <div className="aw-subbar">
        <div className="aw-subLeft">
          <h1 className="aw-eventsTitle">Mes Events</h1>
        </div>

        <div className="aw-subCenter">
          <button className="aw-subLink">Nouveautés</button>
          <button className="aw-subLink">Tendances</button>
          <button className="aw-subLink">Les plus regardés</button>
        </div>

        <div className="aw-subRight">
          <div className="aw-search">
            <input
              className="aw-searchInput"
              placeholder="Rechercher..."
              type="text"
              value={texteRecherche}
              onChange={onSearchChange}
            />

            <Divider
              orientation="vertical"
              flexItem
              className="aw-searchDivider"
            />

            <SearchIcon className="aw-searchIcon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
