import React, { useEffect, useRef } from "react";
import { IconButton, ImageListItem, ImageListItemBar } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import "./VideoCard.css";

const VideoCard = ({
  video,
  buildVideoUrl, // ✅ attendue en prop
  onClick,
  previewSeconds = 10,
}) => {
  const videoRef = useRef(null);
  const timerRef = useRef(null);

  const startPreview = () => {
    const el = videoRef.current;
    if (!el) return;

    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = null;

    try {
      el.muted = true;
      el.playsInline = true;
      el.currentTime = 0;
    } catch (_) {}

    const p = el.play();
    if (p?.catch) p.catch(() => {});

    timerRef.current = window.setInterval(() => {
      if (!el) return;
      if (el.currentTime >= previewSeconds) {
        el.pause();
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }, 200);
  };

  const stopPreview = () => {
    const el = videoRef.current;
    if (!el) return;

    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = null;

    el.pause();
    try {
      el.currentTime = 0;
    } catch (_) {}
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, []);

  const sizeMb = ((video?.sizeBytes || 0) / 1024 / 1024).toFixed(1);

  // ✅ sécurité : si buildVideoUrl n’est pas fourni
  const safeBuild = typeof buildVideoUrl === "function" ? buildVideoUrl : () => "";

  return (
    <ImageListItem
      className="awVideoCard"
      onClick={onClick}
      onMouseEnter={startPreview}
      onMouseLeave={stopPreview}
    >
      <div className="awVideoInner">
        <video
          ref={videoRef}
          className="awVideoThumb"
          preload="metadata"
          muted
          playsInline
          src={safeBuild(video?.filePath)}
          controls
        />

        <ImageListItemBar
          className="awVideoBar"
          title={video?.title || ""}
          subtitle={video?.mimeType ? `${video.mimeType} • ${sizeMb} MB` : ""}
          actionIcon={
            <IconButton
              className="awVideoInfoBtn"
              aria-label={`info about ${video?.title || ""}`}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <InfoIcon />
            </IconButton>
          }
        />
      </div>
    </ImageListItem>
  );
};

export default VideoCard;
