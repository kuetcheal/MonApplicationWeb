// src/components/common/VideoTittle.jsx
import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Button,
  Divider,
  Tooltip,
} from "@mui/material";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

import "./VideoTittle.css";

const VideoTittle = ({
  title,
  isFav,
  liked,
  disliked,
  likesCount = 0,
  dislikesCount = 0,
  commentsCount = 0, // optionnel
  onToggleFav,
  onToggleLike,
  onToggleDislike,
  onDownload,
  onShare,
  onComments,
}) => {
  return (
    <Box className="sv-meta">
      <Box className="sv-headerRow">
        <Typography className="sv-title">{title}</Typography>

        <Box className="sv-actionRow">
          <Tooltip title="Télécharger">
            <Button
              onClick={onDownload}
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
              onClick={onToggleFav}
            >
              {isFav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
          </Tooltip>

          <Divider className="sv-vDivider" orientation="vertical" flexItem />

          {/* Like + compteur */}
          <Tooltip title="Like">
            <Box className="sv-iconWithCount">
              <IconButton
                className={`sv-iconBtn ${liked ? "isActive" : ""}`}
                onClick={onToggleLike}
              >
                <ThumbUpAltOutlinedIcon />
              </IconButton>
              <span className="sv-count">{likesCount}</span>
            </Box>
          </Tooltip>

          {/* Dislike + compteur */}
          <Tooltip title="Dislike">
            <Box className="sv-iconWithCount">
              <IconButton
                className={`sv-iconBtn ${disliked ? "isActive" : ""}`}
                onClick={onToggleDislike}
              >
                <ThumbDownAltOutlinedIcon />
              </IconButton>
              <span className="sv-count">{dislikesCount}</span>
            </Box>
          </Tooltip>

          {/* Bouton commentaires */}
          <Tooltip title="Commentaires">
            <Button
              className="sv-actionBtn sv-commentBtn"
              variant="outlined"
              startIcon={<ChatBubbleOutlineIcon />}
              onClick={onComments}
            >
              Commentaires
              <span className="sv-commentBadge">{commentsCount}</span>
            </Button>
          </Tooltip>

          <Tooltip title="Partager">
            <Button
              className="sv-actionBtn"
              variant="outlined"
              startIcon={<ShareOutlinedIcon />}
              onClick={onShare}
            >
              Partager
            </Button>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
};

export default VideoTittle;
