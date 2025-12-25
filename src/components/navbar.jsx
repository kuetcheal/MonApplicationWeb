import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Typography,
  Divider,
  IconButton,
  Card,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Avatar,
  Dialog,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./navbar.css";

import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import LanguageIcon from "@mui/icons-material/Language";
import SearchIcon from "@mui/icons-material/Search";
import InfoIcon from "@mui/icons-material/Info";

import Setting from "./settings/setting";
import { videoApi } from "../api";

const PAGE_SIZE = 16; // 4x4

const Navbar = () => {
  const [activeLink, setActiveLink] = useState(0);
  const handleLinkClick = (index) => setActiveLink(index);

  const [openSettings, setOpenSettings] = useState(false);
  const handleOpenSettings = () => setOpenSettings(true);
  const handleCloseSettings = () => setOpenSettings(false);

  const [texteRecherche, setTexteRecherche] = useState("");

  const [videos, setVideos] = useState([]);
  const [loadingVideos, setLoadingVideos] = useState(true);
  const [errorVideos, setErrorVideos] = useState("");

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // refs preview hover
  const videoRefs = useRef(new Map());
  const previewTimers = useRef(new Map());

  useEffect(() => {
    const load = async () => {
      setLoadingVideos(true);
      setErrorVideos("");

      try {
        const res = await videoApi.getAll();
        const payload = Array.isArray(res?.data)
          ? res.data
          : Array.isArray(res?.data?.data)
            ? res.data.data
            : [];

        setVideos(payload);
      } catch (e) {
        const msg =
          e?.response?.data?.message ||
          e?.response?.data?.error ||
          e?.message ||
          "Erreur lors du chargement des vidéos";

        const code = e?.response?.status ? ` (${e.response.status})` : "";
        setErrorVideos(`Erreur API${code} : ${msg}`);
      } finally {
        setLoadingVideos(false);
      }
    };

    load();

    // ✅ cleanup timers si on quitte la page
    return () => {
      previewTimers.current.forEach((t) => window.clearInterval(t));
      previewTimers.current.clear();
      videoRefs.current.clear();
    };
  }, []);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [texteRecherche]);

  const onSearchChange = (e) => setTexteRecherche(e.target.value);

  const videosFiltrees = useMemo(() => {
    const search = texteRecherche.trim().toLowerCase();
    if (!search) return videos;
    return videos.filter((v) =>
      (v.title || "").toLowerCase().startsWith(search)
    );
  }, [videos, texteRecherche]);

  const displayedVideos = useMemo(() => {
    return videosFiltrees.slice(0, visibleCount);
  }, [videosFiltrees, visibleCount]);

  const canLoadMore = visibleCount < videosFiltrees.length;

  const loadMore = () => {
    setVisibleCount((c) => Math.min(c + PAGE_SIZE, videosFiltrees.length));
  };

  // URLs vidéos
  const apiBase = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";
  const buildVideoUrl = (filePath) => {
    if (!filePath) return "";
    if (filePath.startsWith("http://") || filePath.startsWith("https://"))
      return filePath;
    return `${apiBase}${filePath.startsWith("/") ? "" : "/"}${filePath}`;
  };

  // Hover preview 0 -> 10s
  const startPreview = (id) => {
    // ✅ éviter doublons
    const old = previewTimers.current.get(id);
    if (old) window.clearInterval(old);
    previewTimers.current.delete(id);

    const videoEl = videoRefs.current.get(id);
    if (!videoEl) return;

    try {
      videoEl.muted = true;
      videoEl.playsInline = true;
      videoEl.currentTime = 0;
    } catch (_) { }

    const p = videoEl.play();
    if (p?.catch) p.catch(() => { });

    const t = window.setInterval(() => {
      if (!videoEl) return;
      if (videoEl.currentTime >= 10) {
        videoEl.pause();
        window.clearInterval(t);
        previewTimers.current.delete(id);
      }
    }, 200);

    previewTimers.current.set(id, t);
  };

  const stopPreview = (id) => {
    const t = previewTimers.current.get(id);
    if (t) window.clearInterval(t);
    previewTimers.current.delete(id);

    const videoEl = videoRefs.current.get(id);
    if (!videoEl) return;

    videoEl.pause();
    try {
      videoEl.currentTime = 0;
    } catch (_) { }
  };

  const navigate = useNavigate();

  return (
    <Card className="awNav-page">
      {/* SUB HEADER */}
      <div className="awNav-subHeader">
        <div className="awNav-subLeft">
          <h2 className="awNav-subTitle">Mes Events</h2>
          <ul className="awNav-subMenu">
            <li><button type="button" className="awNav-subLink">Nouveautés</button></li>
            <li><button type="button" className="awNav-subLink">Tendances</button></li>
            <li><button type="button" className="awNav-subLink">Les plus regardés</button></li>
          </ul>
        </div>

        <div className="awNav-searchWrap">
          <input
            className="awNav-searchInput"
            placeholder="Rechercher..."
            type="text"
            value={texteRecherche}
            onChange={onSearchChange}
          />
          <div className="awNav-searchDivider" />
          <SearchIcon className="awNav-searchIcon" />
        </div>
      </div>

      {/* MAIN */}
      <div className="awNav-main">
        {/* LEFT SIDEBAR sticky */}
        <aside className="awNav-left">
          <div className="awNav-leftSticky">
            <div className="awNav-leftBlock">
              <div className="awNav-leftHead">
                <AddToPhotosIcon className="awNav-leftIcon" />
                <Typography variant="h5" component="h3" className="awNav-leftTitle">
                  Ma Bibliothèque
                </Typography>
              </div>

              <ul className="awNav-leftMenu">
                <li><button type="button" className="awNav-leftLink">Mon historique</button></li>
                <li>
                  <ThumbUpIcon className="awNav-miniIcon" />
                  <button type="button" className="awNav-leftLink">Mes favoris</button>
                </li>
                <li>
                  <VideoLibraryIcon className="awNav-miniIcon" />
                  <button type="button" className="awNav-leftLink awNav-leftPink">
                    Show all videos
                  </button>
                </li>
              </ul>
            </div>

            <Divider className="awNav-divider" />

            <div className="awNav-leftBlock">
              <Typography variant="h5" component="h3" className="awNav-leftTitle2">
                Channels
              </Typography>

              <ul className="awNav-leftMenuSmall">
                <li><button type="button" className="awNav-leftLink">Web tv</button></li>
                <li><button type="button" className="awNav-leftLink">Actu debat tv</button></li>
                <li><button type="button" className="awNav-leftLink">Breaking news tv</button></li>
              </ul>
            </div>

            <Divider className="awNav-divider" />

            <div className="awNav-leftBlock">
              <Typography variant="h6" component="h3" className="awNav-categoryTitle">
                Web catégories
              </Typography>

              <ul className="awNav-leftMenuSmall">
                {["Web comedie", "Actualités", "Prank", "Web series", "Débats", "Lives"].map((x) => (
                  <li key={x}>
                    <button type="button" className="awNav-leftLink">{x}</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>

        {/* CONTENT */}
        <section className="awNav-content">
          {loadingVideos ? (
            <div className="awNav-empty">Chargement des vidéos...</div>
          ) : errorVideos ? (
            <div className="awNav-empty">{errorVideos}</div>
          ) : displayedVideos.length === 0 ? (
            <div className="awNav-empty">
              Oups !!! Aucune vidéo ne correspond à la recherche.
            </div>
          ) : (
            <ImageList className="awNav-videoGrid" cols={4} gap={24}>
              {displayedVideos.map((v) => (
                <ImageListItem
                  key={v.id}
                  className="awNav-videoCard"
                  onClick={() => navigate(`/video/${v.id}`)}
                  onMouseEnter={() => startPreview(v.id)}
                  onMouseLeave={() => stopPreview(v.id)}
                >
                  <div className="awNav-videoInner">
                    <video
                      ref={(el) => {
                        if (el) videoRefs.current.set(v.id, el);
                        else videoRefs.current.delete(v.id);
                      }}
                      className="awNav-videoThumb"
                      preload="metadata"
                      muted
                      playsInline
                      src={buildVideoUrl(v.filePath)}
                      controls
                    />

                    <ImageListItemBar
                      className="awNav-videoBar"
                      title={v.title}
                      subtitle={
                        v.mimeType
                          ? `${v.mimeType} • ${((v.sizeBytes || 0) / 1024 / 1024).toFixed(1)} MB`
                          : ""
                      }
                      actionIcon={
                        <IconButton className="awNav-infoBtn" aria-label={`info about ${v.title}`}>
                          <InfoIcon />
                        </IconButton>
                      }
                    />
                  </div>
                </ImageListItem>
              ))}
            </ImageList>
          )}

          {!loadingVideos && !errorVideos && displayedVideos.length > 0 && (
            <div className="awNav-bottom">
              {canLoadMore ? (
                <button type="button" onClick={loadMore} className="awNav-button">
                  Plus de vidéos
                </button>
              ) : (
                <div className="awNav-end">Toutes les vidéos sont affichées.</div>
              )}
            </div>
          )}
        </section>
      </div>
    </Card>
  );
};

export default Navbar;
