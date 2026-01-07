import React, { useEffect, useMemo, useState } from "react";
import { Box, Button, Typography, IconButton, Divider, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

import "./Allcategories.css";

import { videoApi } from "../api";
import VideoCard from "../components/common/VideoCard"; // ✅ adapte si ton chemin diffère

const CHUNK_SIZE = 5;

const chunk = (arr, size) => {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
};

const Allcategories = () => {
  const navigate = useNavigate();

  const [videos, setVideos] = useState([]);
  const [loadingVideos, setLoadingVideos] = useState(true);
  const [errorVideos, setErrorVideos] = useState("");

  // ✅ Actions (comme SingleVideo)
  const [isFav, setIsFav] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

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
  }, []);

  // ✅ helper URL vidéo (IMPORTANT : on le passe à VideoCard)
  const apiBase = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";
  const buildVideoUrl = (filePath) => {
    if (!filePath) return "";
    if (filePath.startsWith("http://") || filePath.startsWith("https://")) return filePath;
    return `${apiBase}${filePath.startsWith("/") ? "" : "/"}${filePath}`;
  };

  const heroVideo = useMemo(() => (videos.length ? videos[0] : null), [videos]);

  // ✅ catégories temporaires : paquets de 5
  const categoryChunks = useMemo(() => chunk(videos, CHUNK_SIZE), [videos]);

  const onOpenVideo = (id) => {
    navigate(`/video/${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ✅ Télécharger (comme SingleVideo)
  const handleDownload = () => {
    if (!heroVideo) return;
    const url = buildVideoUrl(heroVideo.filePath);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // ✅ Partager (copie le lien)
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

  if (loadingVideos) {
    return (
      <Box className="ac-page">
        <Box className="ac-center">
          <Typography className="ac-status">Chargement…</Typography>
        </Box>
      </Box>
    );
  }

  if (errorVideos) {
    return (
      <Box className="ac-page">
        <Box className="ac-center">
          <Typography className="ac-error">{errorVideos}</Typography>
          <Button onClick={() => navigate("/navbar")} variant="outlined" className="ac-outlineBtn">
            Revenir
          </Button>
        </Box>
      </Box>
    );
  }

  if (!heroVideo) {
    return (
      <Box className="ac-page">
        <Box className="ac-center">
          <Typography className="ac-status">Aucune vidéo disponible.</Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box className="ac-page">
      {/* ✅ HERO VIDEO (overlay UNIQUEMENT EN BAS, pas sur les controls) */}
      <Box className="ac-hero">
        <div className="ac-heroWrap">
          <video
            className="ac-heroVideo"
            src={buildVideoUrl(heroVideo.filePath)}
            controls
            preload="metadata"
          />

          {/* ✅ overlay uniquement en bas */}
          <div className="ac-heroBottomShade" />

          {/* ✅ contenu en bas (titre + boutons comme SingleVideo) */}
          <div className="ac-heroContent">
            <Typography className="ac-heroTitle">{heroVideo.title}</Typography>

            <div className="ac-actionRow">
              <Tooltip title="Télécharger">
                <Button
                  onClick={handleDownload}
                  className="ac-actionBtn ac-actionPrimary"
                  startIcon={<DownloadOutlinedIcon />}
                  variant="contained"
                >
                  Télécharger
                </Button>
              </Tooltip>

              <Tooltip title="Ajouter aux favoris">
                <IconButton className="ac-iconBtn ac-favIcon" onClick={() => setIsFav((s) => !s)}>
                  {isFav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
              </Tooltip>

              <Divider className="ac-vDivider" orientation="vertical" flexItem />

              <Tooltip title="Like">
                <IconButton className={`ac-iconBtn ${liked ? "isActive" : ""}`} onClick={toggleLike}>
                  <ThumbUpAltOutlinedIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Dislike">
                <IconButton
                  className={`ac-iconBtn ${disliked ? "isActive" : ""}`}
                  onClick={toggleDislike}
                >
                  <ThumbDownAltOutlinedIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Commentaires">
                <Button
                  className="ac-actionBtn"
                  variant="outlined"
                  startIcon={<ChatBubbleOutlineIcon />}
                  onClick={() => alert("Zone commentaires à venir ✅")}
                >
                  Commentaires
                </Button>
              </Tooltip>

              <Tooltip title="Partager">
                <Button
                  className="ac-actionBtn"
                  variant="outlined"
                  startIcon={<ShareOutlinedIcon />}
                  onClick={handleShare}
                >
                  Partager
                </Button>
              </Tooltip>

              <Button
                className="ac-actionBtn ac-infoBtn"
                variant="outlined"
                onClick={() => onOpenVideo(heroVideo.id)}
              >
                Plus d’infos
              </Button>

              <Button
                className="ac-actionBtn ac-playBtn"
                variant="contained"
                onClick={() => onOpenVideo(heroVideo.id)}
              >
                Lecture
              </Button>
            </div>
          </div>
        </div>
      </Box>

      {/* ✅ “Catégories” temporaires = groupes de 5 */}
      <Box className="ac-sections">
        {categoryChunks.map((list, idx) => (
          <Box key={idx} className="ac-section">
            <Typography className="ac-sectionTitle">{`Catégorie ${idx + 1}`}</Typography>

            <Swiper
              className="ac-swiper"
              modules={[Navigation]}
              navigation
              spaceBetween={14}
              slidesPerView={5}
              breakpoints={{
                0: { slidesPerView: 1.2 },
                520: { slidesPerView: 2.2 },
                800: { slidesPerView: 3.2 },
                1100: { slidesPerView: 4.2 },
                1400: { slidesPerView: 5.2 },
              }}
            >
              {list.map((v) => (
                <SwiperSlide key={v.id} className="ac-slide">
                  <VideoCard
                    video={v}
                    buildVideoUrl={buildVideoUrl}   // ✅ IMPORTANT (sinon erreur)
                    onClick={() => onOpenVideo(v.id)}
                    previewSeconds={10}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Allcategories;
