import React, { useEffect, useRef, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite, selectIsFavorite } from "../../store/favoritesSlice";

import "./VideoCard1.css";

const VideoCard1 = ({ video, buildVideoUrl, onClick, previewSeconds = 10 }) => {
  const videoRef = useRef(null);
  const timerRef = useRef(null);
  const [duration, setDuration] = useState(null);

  const dispatch = useDispatch();
  const isFavorite = useSelector((state) => selectIsFavorite(state, video));

  const safeBuild = typeof buildVideoUrl === "function" ? buildVideoUrl : () => "";
  const viewCount = video?.views ?? 0;

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

  const formatDuration = (sec) => {
    if (!sec && sec !== 0) return "";
    const total = Math.floor(sec);
    const minutes = Math.floor(total / 60);
    const seconds = total % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const formatViews = (n) => {
    if (n === 0) return "0 vues";
    if (n === 1) return "1 vue";
    return `${n} vues`;
  };

  return (
    <div
      className="acCard"
      onClick={onClick}
      onMouseEnter={startPreview}
      onMouseLeave={stopPreview}
      role="button"
      tabIndex={0}
    >
      <div className="acCardInner">
        <video
          ref={videoRef}
          className="acCardThumb"
          preload="metadata"
          muted
          playsInline
          src={safeBuild(video?.filePath)}
          onLoadedMetadata={(e) => setDuration(e.target.duration)}
        />

        <div className="acCardOverlay">
          <div className="acCardBottomBar">
            <div className="acCardBottomLeft">
              <div className="acCardTitle" title={video?.title || ""}>
                {video?.title || ""}
              </div>
            </div>

            <div className="acCardBottomRight">
              {duration !== null && (
                <span className="acCardDuration">{formatDuration(duration)}</span>
              )}

              <div className="acCardViews">
                <VisibilityIcon fontSize="small" />
                <span>{formatViews(viewCount)}</span>
              </div>

              <button
                className="acCardFavBtn"
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(toggleFavorite(video));
                }}
              >
                {isFavorite ? (
                  <FavoriteIcon fontSize="small" />
                ) : (
                  <FavoriteBorderIcon fontSize="small" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard1;
