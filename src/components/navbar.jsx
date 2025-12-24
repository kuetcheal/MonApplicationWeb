import React, { useEffect, useMemo, useState } from "react";
import { Typography, Divider, Box, IconButton, Card, ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import "./navbar.css";

import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import InfoIcon from "@mui/icons-material/Info";

import Videos from "./videos";
import Header from "./header";

import { videoApi } from "../api";

const Navbar = () => {
  // lien actif du menu du haut
  const [activeLink, setActiveLink] = useState(0);
  const handleLinkClick = (index) => setActiveLink(index);

  // recherche
  const [texteRecherche, setTexteRecherche] = useState("");

  // vidéos venant de Symfony
  const [videos, setVideos] = useState([]);
  const [loadingVideos, setLoadingVideos] = useState(true);
  const [errorVideos, setErrorVideos] = useState("");

  // afficher +/-
  const [showAllVideo, setShowAllVideo] = useState(true);
  const toggleShowAllVideo = () => setShowAllVideo(!showAllVideo);

  // fetch vidéos au chargement
  useEffect(() => {
    const load = async () => {
      setLoadingVideos(true);
      setErrorVideos("");
      try {
        const res = await videoApi.getAll();
        setVideos(Array.isArray(res.data) ? res.data : []);
      } catch (e) {
        setErrorVideos(
          e?.response?.data?.message ||
            e?.message ||
            "Erreur lors du chargement des vidéos"
        );
      } finally {
        setLoadingVideos(false);
      }
    };
    load();
  }, []);

  const onSearchChange = (e) => setTexteRecherche(e.target.value);

  // filtrage recherche
  const videosFiltrees = useMemo(() => {
    const search = texteRecherche.trim().toLowerCase();
    if (!search) return videos;
    return videos.filter((v) =>
      (v.title || "").toLowerCase().startsWith(search)
    );
  }, [videos, texteRecherche]);

  const displayedVideos = useMemo(() => {
    return showAllVideo ? videosFiltrees : videosFiltrees.slice(0, 8);
  }, [showAllVideo, videosFiltrees]);

  // URLs vidéos
  const apiBase = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";
  const buildVideoUrl = (filePath) => {
    if (!filePath) return "";
    if (filePath.startsWith("http://") || filePath.startsWith("https://"))
      return filePath;
    return `${apiBase}${filePath.startsWith("/") ? "" : "/"}${filePath}`;
  };

  return (
    <Card className="aw-page">
      {/* HEADER (dans composant séparé) */}
      <Header
        activeLink={activeLink}
        onLinkClick={handleLinkClick}
        texteRecherche={texteRecherche}
        onSearchChange={onSearchChange}
      />

      {/* MAIN */}
      <div className="aw-main">
        {/* COLONNE GAUCHE */}
        <aside className="aw-left">
          {/* Ma Bibliothèque */}
          <div className="aw-leftBlock">
            <div className="aw-biblioHead">
              <AddToPhotosIcon className="aw-leftIcon" />
              <Typography variant="h5" component="h3" className="aw-leftTitle">
                Ma Bibliothèque
              </Typography>
            </div>

            <ul className="aw-leftMenu">
              <li><a href="#">Mon historique</a></li>
              <li><ThumbUpIcon className="aw-miniIcon" /><a href="#"> Mes favoris</a></li>
              <li>
                <VideoLibraryIcon className="aw-miniIcon" />
                <a href="#" className="aw-pinkLink">Show all videos</a>
              </li>
            </ul>
          </div>

          {/* Channels */}
          <div className="aw-leftBlock">
            <Divider className="aw-divider" />
            <Typography variant="h5" component="h3" className="aw-leftTitle2">
              Channels
            </Typography>

            <ul className="aw-leftMenuSmall">
              <li><a href="#">Web tv</a></li>
              <li><a href="#">Actu debat tv</a></li>
              <li><a href="#">Breaking news tv</a></li>
            </ul>

            <Divider className="aw-divider" />
          </div>

          {/* Web catégories */}
          <div className="aw-leftBlock">
            <Typography
              variant="h6"
              component="h3"
              className="aw-categoryTitle"
            >
              Web catégories
            </Typography>

            <ul className="aw-leftMenuSmall">
              <li><a href="">Web comedie</a></li>
              <li><a href="">Prank</a></li>
              <li><a href="">Web series</a></li>
              <li><a href="">Actualités</a></li>
              <li><a href="">Débats</a></li>
              <li><a href="">Lives</a></li>
            </ul>
          </div>
        </aside>

        {/* GRILLE VIDEOS */}
        <section className="aw-content">
          {loadingVideos ? (
            <div className="aw-empty">Chargement des vidéos...</div>
          ) : errorVideos ? (
            <div className="aw-empty">{errorVideos}</div>
          ) : displayedVideos.length === 0 ? (
            <div className="aw-empty">
              Oups !!! Aucune vidéo ne correspond à la recherche.
            </div>
          ) : (
            <ImageList className="aw-videoGrid" cols={4} gap={22}>
              {displayedVideos.map((v) => (
                <ImageListItem key={v.id} className="aw-videoCard">
                  <video
                    className="aw-videoThumb"
                    controls
                    preload="metadata"
                    src={buildVideoUrl(v.filePath)}
                  />
                  <ImageListItemBar
                    className="aw-videoBar"
                    title={v.title}
                    subtitle={
                      v.mimeType
                        ? `${v.mimeType} • ${((v.sizeBytes || 0) / 1024 / 1024).toFixed(1)} MB`
                        : ""
                    }
                    actionIcon={
                      <IconButton
                        className="aw-infoBtn"
                        aria-label={`info about ${v.title}`}
                      >
                        <InfoIcon />
                      </IconButton>
                    }
                  />
                </ImageListItem>
              ))}
            </ImageList>
          )}
        </section>
      </div>

      {/* BOUTON BAS */}
      <div className="aw-bottom">
        <button onClick={toggleShowAllVideo} className="aw-button">
          {showAllVideo ? "Cacher les autres vidéos" : "Afficher plus de contenus"}
        </button>

        {showAllVideo && <Videos />}
      </div>
    </Card>
  );
};

export default Navbar;
