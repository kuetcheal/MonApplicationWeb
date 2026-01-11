// src/components/sidebarLayout.jsx
import React from "react";
import { Typography, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";

import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";

import "./navbar.css";

const SidebarLayout = ({ children }) => {
  const navigate = useNavigate(); // ✅ pour changer de page

  return (
    <div className="awNav-main">
      {/* LEFT SIDEBAR sticky */}
      <aside className="awNav-left">
        <div className="awNav-leftSticky">
          {/* Bloc : Ma Bibliothèque */}
          <div className="awNav-leftBlock">
            <div className="awNav-leftHead">
              <AddToPhotosIcon className="awNav-leftIcon" />
              <Typography
                variant="h5"
                component="h3"
                className="awNav-leftTitle"
              >
                Ma Bibliothèque
              </Typography>
            </div>

            <ul className="awNav-leftMenu">
              <li>
                <button type="button" className="awNav-leftLink">
                  Mon historique
                </button>
              </li>

              {/* 👉 MES FAVORIS => /favoris */}
              <li>
                <ThumbUpIcon className="awNav-miniIcon" />
                <button
                  type="button"
                  className="awNav-leftLink"
                  onClick={() => navigate("/favoris")}
                >
                  Mes favoris
                </button>
              </li>

              {/* 👉 SHOW ALL VIDEOS => /Allcategories */}
              <li>
                <VideoLibraryIcon className="awNav-miniIcon" />
                <button
                  type="button"
                  className="awNav-leftLink awNav-leftPink"
                  onClick={() => navigate("/Allcategories")}
                >
                  Show all videos
                </button>
              </li>
            </ul>
          </div>

          <Divider className="awNav-divider" />

          {/* Bloc : Channels */}
          <div className="awNav-leftBlock">
            <Typography
              variant="h5"
              component="h3"
              className="awNav-leftTitle2"
            >
              Channels
            </Typography>

            <ul className="awNav-leftMenuSmall">
              <li>
                <button type="button" className="awNav-leftLink">
                  Web tv
                </button>
              </li>
              <li>
                <button type="button" className="awNav-leftLink">
                  Actu debat tv
                </button>
              </li>
              <li>
                <button type="button" className="awNav-leftLink">
                  Breaking news tv
                </button>
              </li>
            </ul>
          </div>

          <Divider className="awNav-divider" />

          {/* Bloc : Web catégories */}
          <div className="awNav-leftBlock">
            <Typography
              variant="h6"
              component="h3"
              className="awNav-categoryTitle"
            >
              Web catégories
            </Typography>

            <ul className="awNav-leftMenuSmall">
              {[
                "Web comedie",
                "Actualités",
                "Prank",
                "Web series",
                "Débats",
                "Lives",
              ].map((x) => (
                <li key={x}>
                  <button type="button" className="awNav-leftLink">
                    {x}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <Divider className="awNav-divider" />

          {/* Bloc : Web cinéma */}
          <div className="awNav-leftBlock">
            <Typography
              variant="h6"
              component="h3"
              className="awNav-categoryTitle"
            >
              Web cinéma
            </Typography>

            <ul className="awNav-leftMenuSmall">
              {[
                "Thriller",
                "Romance",
                "Actions",
                "suspenses",
                "Séries",
                "Lives",
              ].map((x) => (
                <li key={x}>
                  <button type="button" className="awNav-leftLink">
                    {x}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>

      {/* RIGHT CONTENT */}
      <section className="awNav-content">{children}</section>
    </div>
  );
};

export default SidebarLayout;
