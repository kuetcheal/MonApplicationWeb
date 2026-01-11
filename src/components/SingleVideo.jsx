// src/components/SingleVideo.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Card,
  Typography,
  Button,
  CircularProgress,
  TextField,
} from "@mui/material";

import "./SingleVideo.css";
import { videoApi } from "../api";
import { selectIsFavorite, toggleFavorite } from "../store/favoritesSlice";

import VideoCard from "./common/VideoCard";
import VideoTittle from "./common/VideoTittle";

const SIDE_LIMIT = 10;
const SIMILAR_LIMIT = 12;

const SingleVideo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const numericId = Number(id);

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Etat visuel like/dislike
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  // Etat du formulaire de commentaires
  const [showCommentsBox, setShowCommentsBox] = useState(false);
  const [commentAuthor, setCommentAuthor] = useState("");
  const [commentContent, setCommentContent] = useState("");
  const [commentError, setCommentError] = useState("");
  const [isSendingComment, setIsSendingComment] = useState(false);

  const isFav = useSelector((state) =>
    selectIsFavorite(state, { id: numericId })
  );

  // Charger toutes les vidéos
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
    if (filePath.startsWith("http://") || filePath.startsWith("https://"))
      return filePath;
    return `${apiBase}${filePath.startsWith("/") ? "" : "/"}${filePath}`;
  };

  const currentVideo = useMemo(
    () => videos.find((v) => Number(v.id) === numericId) || null,
    [videos, numericId]
  );

  const others = useMemo(
    () => videos.filter((v) => Number(v.id) !== numericId),
    [videos, numericId]
  );

  const sideList = useMemo(() => others.slice(0, SIDE_LIMIT), [others]);
  const similarList = useMemo(() => others.slice(0, SIMILAR_LIMIT), [others]);

  // +1 vue à chaque ouverture de vidéo
  useEffect(() => {
    if (!currentVideo) return;

    videoApi
      .addView(currentVideo.id)
      .then((res) => {
        const newViews = res?.data?.viewsCount;
        if (typeof newViews === "number") {
          setVideos((prev) =>
            prev.map((v) =>
              v.id === currentVideo.id ? { ...v, viewsCount: newViews } : v
            )
          );
        }
      })
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentVideo?.id]);

  const onOpenVideo = (vid) => {
    navigate(`/video/${vid}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setLiked(false);
    setDisliked(false);
    setShowCommentsBox(false);
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

  // Like : on met à jour l'état visuel + les compteurs locaux, et on notifie l'API
  const handleToggleLike = async () => {
    if (!currentVideo) return;

    const prevLiked = liked;
    const prevDisliked = disliked;

    const newLiked = !prevLiked;
    const newDisliked = newLiked ? false : prevDisliked;

    setLiked(newLiked);
    setDisliked(newDisliked);

    // maj des compteurs en front (simple) pour que ça réagisse tout de suite
    setVideos((prev) =>
      prev.map((v) => {
        if (v.id !== currentVideo.id) return v;

        let likes = v.likesCount ?? 0;
        let dislikes = v.dislikesCount ?? 0;

        // like
        if (!prevLiked && newLiked) likes += 1;
        if (prevLiked && !newLiked) likes = Math.max(0, likes - 1);

        // dislike (si on enlève le dislike en passant au like)
        if (!prevDisliked && newDisliked) dislikes += 1;
        if (prevDisliked && !newDisliked) dislikes = Math.max(0, dislikes - 1);

        return { ...v, likesCount: likes, dislikesCount: dislikes };
      })
    );

    // appels API (on ne dépend pas de la réponse pour l'affichage)
    try {
      await videoApi.setLike(currentVideo.id, newLiked);
      if (prevDisliked !== newDisliked) {
        await videoApi.setDislike(currentVideo.id, newDisliked);
      }
    } catch (e) {
      console.error("Erreur like/dislike:", e);
    }
  };

  // Dislike : même principe
  const handleToggleDislike = async () => {
    if (!currentVideo) return;

    const prevLiked = liked;
    const prevDisliked = disliked;

    const newDisliked = !prevDisliked;
    const newLiked = newDisliked ? false : prevLiked;

    setDisliked(newDisliked);
    setLiked(newLiked);

    setVideos((prev) =>
      prev.map((v) => {
        if (v.id !== currentVideo.id) return v;

        let likes = v.likesCount ?? 0;
        let dislikes = v.dislikesCount ?? 0;

        // dislike
        if (!prevDisliked && newDisliked) dislikes += 1;
        if (prevDisliked && !newDisliked)
          dislikes = Math.max(0, dislikes - 1);

        // like (si on enlève le like en passant au dislike)
        if (!prevLiked && newLiked) likes += 1;
        if (prevLiked && !newLiked) likes = Math.max(0, likes - 1);

        return { ...v, likesCount: likes, dislikesCount: dislikes };
      })
    );

    try {
      await videoApi.setDislike(currentVideo.id, newDisliked);
      if (prevLiked !== newLiked) {
        await videoApi.setLike(currentVideo.id, newLiked);
      }
    } catch (e) {
      console.error("Erreur like/dislike:", e);
    }
  };

  // Ouverture / fermeture du bloc commentaires
  const handleCommentsToggle = () => {
    setShowCommentsBox((prev) => !prev);
  };

  const handleCancelComment = () => {
    setShowCommentsBox(false);
    setCommentAuthor("");
    setCommentContent("");
    setCommentError("");
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!currentVideo) return;

    const content = commentContent.trim();
    const author = commentAuthor.trim() || null;

    if (!content) {
      setCommentError("Le commentaire ne peut pas être vide.");
      return;
    }

    setCommentError("");
    setIsSendingComment(true);

    try {
      const res = await videoApi.addComment(currentVideo.id, content, author);
      const newCount =
        res?.data?.commentsCount ??
        (currentVideo.commentsCount ?? 0) + 1; // fallback si jamais

      setVideos((prev) =>
        prev.map((v) =>
          v.id === currentVideo.id ? { ...v, commentsCount: newCount } : v
        )
      );

      setCommentContent("");
      // tu peux garder ou non le nom
      // setCommentAuthor("");
    } catch (e) {
      const msg =
        e?.response?.data?.message ||
        e?.response?.data?.error ||
        e?.message ||
        "Erreur lors de l'envoi du commentaire.";
      setCommentError(msg);
    } finally {
      setIsSendingComment(false);
    }
  };

  // ------------------ rendu ------------------

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
              <video
                className="sv-player"
                controls
                preload="metadata"
                src={src}
              />
            </div>
          </Card>

          <VideoTittle
            title={currentVideo.title}
            isFav={isFav}
            liked={liked}
            disliked={disliked}
            likesCount={currentVideo.likesCount ?? 0}
            dislikesCount={currentVideo.dislikesCount ?? 0}
            commentsCount={currentVideo.commentsCount ?? 0}
            onToggleFav={() =>
              dispatch(
                toggleFavorite({
                  id: currentVideo.id,
                  ...currentVideo,
                })
              )
            }
            onToggleLike={handleToggleLike}
            onToggleDislike={handleToggleDislike}
            onDownload={handleDownload}
            onShare={handleShare}
            onComments={handleCommentsToggle}
          />

          {/* Bloc formulaire de commentaires */}
          {showCommentsBox && (
            <Box className="sv-commentsBox">
              <form className="sv-commentsForm" onSubmit={handleSubmitComment}>
                <Box className="sv-commentFields">
                  <TextField
                    label="Nom (facultatif)"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={commentAuthor}
                    onChange={(e) => setCommentAuthor(e.target.value)}
                    className="sv-commentField"
                  />
                  <TextField
                    label="Saisissez votre commentaire"
                    variant="outlined"
                    fullWidth
                    multiline
                    minRows={3}
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                    className="sv-commentField"
                  />
                </Box>

                {commentError && (
                  <Typography className="sv-commentError">
                    {commentError}
                  </Typography>
                )}

                <Box className="sv-commentActions">
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isSendingComment}
                  >
                    {isSendingComment ? "Envoi..." : "Envoyer"}
                  </Button>
                  <Button
                    type="button"
                    variant="text"
                    onClick={handleCancelComment}
                  >
                    Annuler
                  </Button>
                </Box>
              </form>
            </Box>
          )}

          {/* SIMILAIRES */}
          <Box className="sv-similar">
            <Typography className="sv-sectionTitle">
              Vidéos similaires
            </Typography>

            <Box className="sv-similarGrid">
              {similarList.map((v) => (
                <Box key={v.id} className="sv-gridItem">
                  <VideoCard
                    video={v}
                    buildVideoUrl={buildVideoUrl}
                    onClick={() => onOpenVideo(v.id)}
                    previewSeconds={10}
                    showControls={false}
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
                <div className="sv-sideCardWrap">
                  <VideoCard
                    video={v}
                    buildVideoUrl={buildVideoUrl}
                    onClick={() => onOpenVideo(v.id)}
                    previewSeconds={10}
                    showControls={false}
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
