import React from "react";
import { useSelector } from "react-redux";
import VideoCard from "../components/common/VideoCard";

const Favoris = () => {
  const favorites = useSelector((state) => state.favorites.items);

  // adapte cette fonction à ce que tu utilises déjà ailleurs
  const buildVideoUrl = (filePath) => filePath;

  return (
    <div className="pageFavoris">
      <h1>Mes favoris</h1>

      {favorites.length === 0 ? (
        <p>Vous n'avez encore ajouté aucune vidéo en favori.</p>
      ) : (
        <div className="favorisGrid">
          {favorites.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              buildVideoUrl={buildVideoUrl}
              onClick={() => {
                // ici tu peux naviguer vers une page détail si tu veux
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favoris;
