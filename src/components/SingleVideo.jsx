import React, { useEffect, useMemo, useState } from "react";
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

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

import "./SingleVideo.css";
import { videoApi } from "../api";

// ✅ IMPORTANT : adapte le chemin si besoin
import VideoCard from "./common/VideoCard";

const SIDE_LIMIT = 10;
const SIMILAR_LIMIT = 12;

const SingleVideo = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // actions (UI only)
  const [isFav, setIsFav] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

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

  // ✅ même helper que Navbar / Allcategories
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

  const onOpenVideo = (vid) => {
    navigate(`/video/${vid}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDownload = () => {
    if (!currentVideo) return;
    const url = buildVideoUrl(currentVideo.filePath);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
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
          <Button
            onClick={() => navigate("/navbar")}
            variant="outlined"
            className="sv-outlineBtn"
          >
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
          <Button
            onClick={() => navigate("/navbar")}
            variant="outlined"
            className="sv-outlineBtn"
          >
            Revenir
          </Button>
        </Box>
      </Box>
    );
  }

  const src = buildVideoUrl(currentVideo.filePath);

  return (
    <Box className="sv-page">
      <Box className="sv-layout">
        {/* LEFT */}
        <Box className="sv-main">
          <Card className="sv-playerCard">
            <div className="sv-playerWrap">
              <video className="sv-player" controls preload="metadata" src={src} />
            </div>
          </Card>

          {/* TITLE + ACTIONS */}
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
                <IconButton
                  className="sv-iconBtn sv-favIcon"
                  onClick={() => setIsFav((s) => !s)}
                >
                  {isFav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
              </Tooltip>

              <Divider className="sv-vDivider" orientation="vertical" flexItem />

              <Tooltip title="Like">
                <IconButton
                  className={`sv-iconBtn ${liked ? "isActive" : ""}`}
                  onClick={toggleLike}
                >
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
                  onClick={() => alert("Zone commentaires à venir ✅")}
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

          {/* SIMILAR */}
          <Box className="sv-similar">
            <Typography className="sv-sectionTitle">Vidéos similaires</Typography>

            <Box className="sv-similarGrid">
              {similarList.map((v) => (
                <Box key={v.id} className="sv-gridItem">
                  <VideoCard
                    video={v}
                    buildVideoUrl={buildVideoUrl}
                    onClick={() => onOpenVideo(v.id)}
                    previewSeconds={10}
                    showControls={false}   // ✅ Option A
                  />
                </Box>
              ))}
            </Box>

            <Box className="sv-similarBottom">
              <Button
                className="sv-moreBtn"
                variant="contained"
                onClick={() => navigate("/navbar")}
              >
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
              <Box key={v.id} className="sv-sideItem">
                {/* ✅ wrapper pour garder ton style “liste” */}
                <div className="sv-sideCardWrap">
                  <VideoCard
                    video={v}
                    buildVideoUrl={buildVideoUrl}
                    onClick={() => onOpenVideo(v.id)}
                    previewSeconds={10}
                    showControls={false} // ✅ Option A
                  />
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
