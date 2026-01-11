// src/pages/favoris.jsx
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import VideoCard from "../components/common/VideoCard";
import SidebarLayout from "../components/sidebarLayout";
import { buildVideoUrl } from "../utils/media";

import "../components/navbar.css"; // pour awNav-page, awNav-main, etc.
import "./favoris.css";           // ton style spécifique à la page favoris

const Favoris = () => {
  const favorites = useSelector((state) => state.favorites.items) || [];
  const navigate = useNavigate();

  return (
    <div className="awNav-page">
      <SidebarLayout>
        <div className="pageFavoris">
          <h1 className="pageFavorisTitle">Mes favoris</h1>

          {favorites.length === 0 ? (
            <p className="pageFavorisEmpty">
              Vous n'avez encore ajouté aucune vidéo en favori.
            </p>
          ) : (
            <div className="favorisGrid">
              {favorites.map((video) => (
                <VideoCard
                  key={video._favKey || video.id || video.filePath || video.title}
                  video={video}
                  buildVideoUrl={buildVideoUrl}
                  onClick={() => navigate(`/video/${video.id}`)}
                  previewSeconds={10}
                />
              ))}
            </div>
          )}
        </div>
      </SidebarLayout>
    </div>
  );
};

export default Favoris;
