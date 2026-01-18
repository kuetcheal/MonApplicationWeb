import React, { useEffect, useMemo, useState } from "react";
import { Box, Typography, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Virtual, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import "./Allcategories.css";

import { videoApi } from "../api";
import { categoryApi } from "../api/categoryApi";
import VideoTittle from "../components/common/VideoTittle";
import VideoCard1 from "../components/common/VideoCard1";

const Allcategories = () => {
  const navigate = useNavigate();

  const [videos, setVideos] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isFav, setIsFav] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const apiBase = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";
  const buildVideoUrl = (filePath) => {
    if (!filePath) return "";
    if (filePath.startsWith("http://") || filePath.startsWith("https://"))
      return filePath;
    return `${apiBase}${filePath.startsWith("/") ? "" : "/"}${filePath}`;
  };

  useEffect(() => {
    const loadAll = async () => {
      setLoading(true);
      setError("");

      try {
        const [catsRes, vidsRes] = await Promise.all([
          categoryApi.getAll(),
          videoApi.getAll(),
        ]);

        const catsPayload = Array.isArray(catsRes?.data)
          ? catsRes.data
          : Array.isArray(catsRes?.data?.data)
          ? catsRes.data.data
          : [];

        const vidsPayload = Array.isArray(vidsRes?.data)
          ? vidsRes.data
          : Array.isArray(vidsRes?.data?.data)
          ? vidsRes.data.data
          : [];

        setCategories(catsPayload);
        setVideos(vidsPayload);
      } catch (e) {
        const msg =
          e?.response?.data?.message ||
          e?.response?.data?.error ||
          e?.message ||
          "Erreur lors du chargement (catégories/vidéos)";
        setError(msg);
      } finally {
        setLoading(false);
      }
    };

    loadAll();
  }, []);

  const heroVideo = useMemo(() => (videos.length ? videos[0] : null), [videos]);

  const getVideoCategoryName = (v) => {
    if (!v) return "";
    if (typeof v.category === "string") return v.category.trim();
    if (v.category && typeof v.category === "object" && v.category.name)
      return String(v.category.name).trim();
    if (v.categoryName) return String(v.categoryName).trim();
    return "";
  };

  const videosByCategory = useMemo(() => {
    const map = new Map();
    for (const c of categories) map.set(c.name, []);

    for (const v of videos) {
      const name = getVideoCategoryName(v);
      if (!name) continue;
      if (!map.has(name)) map.set(name, []);
      map.get(name).push(v);
    }

    for (const [k, list] of map.entries()) {
      list.sort((a, b) => (b?.id || 0) - (a?.id || 0));
      map.set(k, list);
    }
    return map;
  }, [videos, categories]);

  const onOpenVideo = (id) => {
    navigate(`/video/${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDownload = () => {
    if (!heroVideo) return;
    window.open(
      buildVideoUrl(heroVideo.filePath),
      "_blank",
      "noopener,noreferrer"
    );
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
      <Box className="ac-page">
        <Box className="ac-center">
          <Typography className="ac-status">Chargement…</Typography>
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="ac-page">
        <Box className="ac-center">
          <Typography className="ac-error">{error}</Typography>
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
      {/* HERO */}
      <Box className="ac-hero">
        <Card className="sv-playerCard">
          <div className="sv-playerWrap">
            <video
              className="sv-player"
              src={buildVideoUrl(heroVideo.filePath)}
              controls
              preload="metadata"
            />
          </div>
        </Card>

        <VideoTittle
          title={heroVideo.title}
          isFav={isFav}
          liked={liked}
          disliked={disliked}
          onToggleFav={() => setIsFav((s) => !s)}
          onToggleLike={toggleLike}
          onToggleDislike={toggleDislike}
          onDownload={handleDownload}
          onShare={handleShare}
          onComments={() => alert("Zone commentaires à venir")}
        />
      </Box>

      {/* SECTIONS */}
      <Box className="ac-sections">
        {categories.map((cat) => {
          const list = videosByCategory.get(cat.name) || [];
          if (list.length === 0) return null;

          const prevClass = `ac-prev-${cat.id}`;
          const nextClass = `ac-next-${cat.id}`;

          return (
            <Box key={cat.id} className="ac-section">
              <Typography className="ac-sectionTitle">{cat.name}</Typography>

              <div className="ac-carousel-wrap">
                <button
                  className={`ac-swiper-btn ${prevClass}`}
                  aria-label="Previous"
                >
                  ‹
                </button>

                <Swiper
                  modules={[Virtual, Navigation]}
                  navigation={{
                    prevEl: `.${prevClass}`,
                    nextEl: `.${nextClass}`,
                    disabledClass: "ac-nav-disabled",
                  }}
                  onInit={(swiper) => {
                    swiper.navigation.init();
                    swiper.navigation.update();
                  }}
                  slidesPerView="auto"
                  centeredSlides={false}
                  spaceBetween={16}
                  virtual
                  className="ac-my-swiper"
                >
                  {list.map((v, index) => (
                    <SwiperSlide
                      key={v.id}
                      virtualIndex={index}
                      className="ac-slide"
                    >
                      <VideoCard1
                        video={v}
                        buildVideoUrl={buildVideoUrl}
                        onClick={() => onOpenVideo(v.id)}
                        previewSeconds={10}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>

                <button
                  className={`ac-swiper-btn ${nextClass}`}
                  aria-label="Next"
                >
                  ›
                </button>
              </div>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Allcategories;
