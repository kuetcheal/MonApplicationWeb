import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Card,
  Typography,
  IconButton,
  Button,
  Divider,
  CircularProgress,
  Tooltip,
} from "@mui/material";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

import "./SingleVideo.css";
import { videoApi } from "../api";

const SIDE_LIMIT = 10;      // colonne droite
const SIMILAR_LIMIT = 12;   // grille bas (tu peux augmenter)

const SingleVideo = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // actions
  const [isFav, setIsFav] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  // preview hover refs
  const videoRefs = useRef(new Map());
  const previewTimers = useRef(new Map());

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
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
        setError(`Erreur API${code} : ${msg}`);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const apiBase = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";
  const buildVideoUrl = (filePath) => {
    if (!filePath) return "";
    if (filePath.startsWith("http://") || filePath.startsWith("https://")) return filePath;
    return `${apiBase}${filePath.startsWith("/") ? "" : "/"}${filePath}`;
  };

  const currentVideo = useMemo(() => {
    const vid = Number(id);
    return videos.find((v) => Number(v.id) === vid) || null;
  }, [videos, id]);

  const others = useMemo(() => {
    const vid = Number(id);
    return videos.filter((v) => Number(v.id) !== vid);
  }, [videos, id]);

  const sideList = useMemo(() => others.slice(0, SIDE_LIMIT), [others]);
  const similarList = useMemo(() => others.slice(0, SIMILAR_LIMIT), [others]);

  // hover preview 0 -> 10s
  const startPreview = (vid) => {
    const el = videoRefs.current.get(vid);
    if (!el) return;

    try {
      el.muted = true;
      el.playsInline = true;
      el.currentTime = 0;
    } catch (_) {}

    const p = el.play();
    if (p?.catch) p.catch(() => {});

    if (previewTimers.current.has(vid)) {
      window.clearInterval(previewTimers.current.get(vid));
    }

    const t = window.setInterval(() => {
      if (!el) return;
      if (el.currentTime >= 10) {
        el.pause();
        window.clearInterval(t);
        previewTimers.current.delete(vid);
      }
    }, 200);

    previewTimers.current.set(vid, t);
  };

  const stopPreview = (vid) => {
    const el = videoRefs.current.get(vid);
    const t = previewTimers.current.get(vid);
    if (t) window.clearInterval(t);
    previewTimers.current.delete(vid);

    if (!el) return;
    el.pause();
    try {
      el.currentTime = 0;
    } catch (_) {}
  };

  const onOpenVideo = (vid) => {
    stopPreview(vid);
    navigate(`/video/${vid}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ✅ Télécharger (simple) : ouvre le fichier dans un nouvel onglet
  // Si ton serveur force le download via Content-Disposition, ça téléchargera.
  const handleDownload = () => {
    if (!currentVideo) return;
    const url = buildVideoUrl(currentVideo.filePath);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // ✅ Partager (copie le lien)
  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      // tu peux remplacer par un Snackbar si tu veux
      alert("Lien copié ✅");
    } catch {
      alert(url);
    }
  };

  const toggleLike = () => {
    setLiked((s) => !s);
    if (!liked) setDisliked(false);
  };

  const toggleDislike = () => {
    setDisliked((s) => !s);
    if (!disliked) setLiked(false);
  };

  if (loading) {
    return (
      <Box className="sv-page">
        <Box className="sv-center">
          <CircularProgress />
          <Typography className="sv-loadingText">Chargement…</Typography>
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="sv-page">
        <Box className="sv-center">
          <Typography className="sv-error">{error}</Typography>
          <Button onClick={() => navigate("/navbar")} variant="outlined" className="sv-outlineBtn">
            Revenir
          </Button>
        </Box>
      </Box>
    );
  }

  if (!currentVideo) {
    return (
      <Box className="sv-page">
        <Box className="sv-center">
          <Typography className="sv-error">Vidéo introuvable.</Typography>
          <Button onClick={() => navigate("/navbar")} variant="outlined" className="sv-outlineBtn">
            Revenir
          </Button>
        </Box>
      </Box>
    );
  }

  const src = buildVideoUrl(currentVideo.filePath);

  return (
    <Box className="sv-page">
      {/* MAIN GRID */}
      <Box className="sv-layout">
        {/* LEFT */}
        <Box className="sv-main">
          <Card className="sv-playerCard">
            <div className="sv-playerWrap">
              <video className="sv-player" controls preload="metadata" src={src} />
            </div>
          </Card>

          {/* ✅ TITRE + LIGNE D’ACTIONS (tout sur la même ligne) */}
          <Box className="sv-meta">
            <Typography className="sv-title">{currentVideo.title}</Typography>

            <Box className="sv-actionRow">
              <Tooltip title="Télécharger">
                <Button
                  onClick={handleDownload}
                  className="sv-actionBtn sv-actionPrimary"
                  startIcon={<DownloadOutlinedIcon />}
                  variant="contained"
                >
                  Télécharger
                </Button>
              </Tooltip>

              <Tooltip title="Ajouter aux favoris">
                <IconButton className="sv-iconBtn sv-favIcon" onClick={() => setIsFav((s) => !s)}>
                  {isFav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
              </Tooltip>

              <Divider className="sv-vDivider" orientation="vertical" flexItem />

              <Tooltip title="Like">
                <IconButton className={`sv-iconBtn ${liked ? "isActive" : ""}`} onClick={toggleLike}>
                  <ThumbUpAltOutlinedIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Dislike">
                <IconButton
                  className={`sv-iconBtn ${disliked ? "isActive" : ""}`}
                  onClick={toggleDislike}
                >
                  <ThumbDownAltOutlinedIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Commentaires">
                <Button
                  className="sv-actionBtn"
                  variant="outlined"
                  startIcon={<ChatBubbleOutlineIcon />}
                  onClick={() => {
                    // tu peux scroller vers un bloc commentaires plus bas si tu l’ajoutes
                    alert("Zone commentaires à venir ✅");
                  }}
                >
                  Commentaires
                </Button>
              </Tooltip>

              <Tooltip title="Partager">
                <Button
                  className="sv-actionBtn"
                  variant="outlined"
                  startIcon={<ShareOutlinedIcon />}
                  onClick={handleShare}
                >
                  Partager
                </Button>
              </Tooltip>
            </Box>
          </Box>

          {/* ✅ VIDEOS SIMILAIRES (grille sans scroll, pleine largeur) */}
          <Box className="sv-similar">
            <Typography className="sv-sectionTitle">Vidéos similaires</Typography>

            <Box className="sv-similarGrid">
              {similarList.map((v) => (
                <Box
                  key={v.id}
                  className="sv-gridItem"
                  onMouseEnter={() => startPreview(v.id)}
                  onMouseLeave={() => stopPreview(v.id)}
                  onClick={() => onOpenVideo(v.id)}
                  role="button"
                  tabIndex={0}
                >
                  {/* ✅ card identique à navbar */}
                  <div className="awNav-videoCard sv-cardFix">
                    <div className="awNav-videoInner">
                      <video
                        ref={(el) => {
                          if (el) videoRefs.current.set(v.id, el);
                          else videoRefs.current.delete(v.id);
                        }}
                        className="awNav-videoThumb sv-thumbGrid"
                        preload="metadata"
                        muted
                        playsInline
                        src={buildVideoUrl(v.filePath)}
                      />
                      <div className="sv-miniBar">
                        <div className="sv-miniTitle">{v.title}</div>
                      </div>
                    </div>
                  </div>
                </Box>
              ))}
            </Box>

            <Box className="sv-similarBottom">
              <Button className="sv-moreBtn" variant="contained" onClick={() => navigate("/navbar")}>
                AFFICHER TOUTES LES VIDÉOS
              </Button>
            </Box>
          </Box>
        </Box>

        {/* RIGHT */}
        <Box className="sv-side">
          <Typography className="sv-sideTitle">À regarder ensuite</Typography>

          <Box className="sv-sideScroll">
            {sideList.map((v) => (
              <Box
                key={v.id}
                className="sv-sideItem"
                onClick={() => onOpenVideo(v.id)}
                onMouseEnter={() => startPreview(v.id)}
                onMouseLeave={() => stopPreview(v.id)}
                role="button"
                tabIndex={0}
              >
                <div className="awNav-videoCard sv-sideCardFix">
                  <div className="awNav-videoInner sv-sideInner">
                    <video
                      ref={(el) => {
                        if (el) videoRefs.current.set(v.id, el);
                        else videoRefs.current.delete(v.id);
                      }}
                      className="awNav-videoThumb sv-sideThumb"
                      preload="metadata"
                      muted
                      playsInline
                      src={buildVideoUrl(v.filePath)}
                    />
                    <div className="sv-sideText">
                      <div className="sv-sideName">{v.title}</div>
                      <div className="sv-sideSub">{v.mimeType || "video/mp4"}</div>
                    </div>
                  </div>
                </div>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SingleVideo;
