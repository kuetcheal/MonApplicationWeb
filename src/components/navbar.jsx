import React, { useEffect, useMemo, useState } from "react";
import { Card, ImageList } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import "./navbar.css";
import { videoApi } from "../api";
import VideoCard from "./common/VideoCard";
import SidebarLayout from "./sidebarLayout";

const PAGE_SIZE = 16; 

const Navbar = () => {
  const [texteRecherche, setTexteRecherche] = useState("");

  const [videos, setVideos] = useState([]);
  const [loadingVideos, setLoadingVideos] = useState(true);
  const [errorVideos, setErrorVideos] = useState("");

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const navigate = useNavigate();

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

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [texteRecherche]);

  const onSearchChange = (e) => setTexteRecherche(e.target.value);

  const videosFiltrees = useMemo(() => {
    const search = texteRecherche.trim().toLowerCase();
    if (!search) return videos;
    return videos.filter((v) =>
      (v.title || "").toLowerCase().startsWith(search)
    );
  }, [videos, texteRecherche]);

  const displayedVideos = useMemo(() => {
    return videosFiltrees.slice(0, visibleCount);
  }, [videosFiltrees, visibleCount]);

  const canLoadMore = visibleCount < videosFiltrees.length;

  const loadMore = () => {
    setVisibleCount((c) => Math.min(c + PAGE_SIZE, videosFiltrees.length));
  };

  // URLs vidéos
  const apiBase = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";
  const buildVideoUrl = (filePath) => {
    if (!filePath) return "";
    if (
      filePath.startsWith("http://") ||
      filePath.startsWith("https://")
    )
      return filePath;
    return `${apiBase}${filePath.startsWith("/") ? "" : "/"}${filePath}`;
  };

  return (
    <Card className="awNav-page">
      {/* SUB HEADER */}
      <div className="awNav-subHeader">
        <div className="awNav-subLeft">
          <h2 className="awNav-subTitle">Mes Events</h2>
        </div>

        <div className="mileieu">
          <ul className="awNav-subMenu">
            <li>
              <button type="button" className="awNav-subLink">
                Nouveautés
              </button>
            </li>
            <li>
              <button type="button" className="awNav-subLink">
                Tendances
              </button>
            </li>
            <li>
              <button type="button" className="awNav-subLink">
                Les plus regardés
              </button>
            </li>
            <li>
              <button type="button" className="awNav-subLink">
                Les plus longues
              </button>
            </li>
          </ul>
        </div>

        <div className="awNav-searchWrap">
          <input
            className="awNav-searchInput"
            placeholder="Rechercher..."
            type="text"
            value={texteRecherche}
            onChange={onSearchChange}
          />
          <div className="awNav-searchDivider" />
          <SearchIcon className="awNav-searchIcon" />
        </div>
      </div>

      {/* MAIN : désormais via SidebarLayout */}
      <SidebarLayout>
        {loadingVideos ? (
          <div className="awNav-empty">Chargement des vidéos...</div>
        ) : errorVideos ? (
          <div className="awNav-empty">{errorVideos}</div>
        ) : displayedVideos.length === 0 ? (
          <div className="awNav-empty">
            Oups !!! Aucune vidéo ne correspond à la recherche.
          </div>
        ) : (
          <ImageList className="awNav-videoGrid" cols={4} gap={11}>
            {displayedVideos.map((v) => (
              <VideoCard
                key={v.id}
                video={v}
                buildVideoUrl={buildVideoUrl}
                onClick={() => navigate(`/video/${v.id}`)}
                previewSeconds={10}
              />
            ))}
          </ImageList>
        )}

        {!loadingVideos && !errorVideos && displayedVideos.length > 0 && (
          <div className="awNav-bottom">
            {canLoadMore ? (
              <button
                type="button"
                onClick={loadMore}
                className="awNav-button"
              >
                Plus de vidéos
              </button>
            ) : (
              <div className="awNav-end">
                Toutes les vidéos sont affichées.
              </div>
            )}
          </div>
        )}
      </SidebarLayout>
    </Card>
  );
};

export default Navbar;
