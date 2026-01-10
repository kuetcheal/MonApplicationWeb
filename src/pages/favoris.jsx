import React from "react";
import { useSelector } from "react-redux";
import VideoCard from "../components/common/VideoCard";
import { buildVideoUrl } from "../utils/media"; 
import "./favoris.css"; 

const Favoris = () => {
  const favorites = useSelector((state) => state.favorites.items);

  return (
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
              onClick={() => {      
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favoris;
