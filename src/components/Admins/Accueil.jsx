import React, { useEffect, useMemo, useState } from "react";
import "./accueil.css";
import { Link } from "react-router-dom";
import { clientApi, videoApi } from "../../api";

import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

const Accueil = () => {
  const [clientsCount, setClientsCount] = useState(null);
  const [videosCount, setVideosCount] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const clientsRes = await clientApi.getAll();
        const clients = Array.isArray(clientsRes?.data) ? clientsRes.data : [];
        setClientsCount(clients.length);
      } catch {
        setClientsCount(null);
      }

      try {
        const videosRes = await videoApi.getAll();
        const videos = Array.isArray(videosRes?.data)
          ? videosRes.data
          : Array.isArray(videosRes?.data?.data)
          ? videosRes.data.data
          : [];
        setVideosCount(videos.length);
      } catch {
        setVideosCount(null);
      }
    };

    load();
  }, []);

  const stats = useMemo(
    () => [
      {
        label: "Utilisateurs",
        value: clientsCount ?? "—",
        icon: <PeopleAltIcon />,
      },
      {
        label: "Vidéos",
        value: videosCount ?? "—",
        icon: <PlayCircleOutlineIcon />,
      },
      {
        label: "Croissance",
        value: "+18%",
        icon: <TrendingUpIcon />,
      },
      {
        label: "Notifications",
        value: "7",
        icon: <NotificationsActiveIcon />,
      },
    ],
    [clientsCount, videosCount]
  );

  return (
    <div className="adHome">
      {/* Cards stats */}
      <div className="adStats">
        {stats.map((s) => (
          <div className="adStatCard" key={s.label}>
            <div>
              <div className="adStatLabel">{s.label}</div>
              <div className="adStatValue">{s.value}</div>
            </div>

            <div className="adStatIcon">{s.icon}</div>
          </div>
        ))}
      </div>

      {/* main blocks */}
      <div className="adHomeGrid">
        <section className="adPanel">
          <div className="adPanelHead">
            <h3>Derniers utilisateurs</h3>
            <Link to="/clients" className="adBtnPrimary">
              VOIR TOUT
            </Link>
          </div>

          {/* là tu remplaceras plus tard par “les 5 derniers” depuis API */}
          <div className="adFakeTable">
            <div className="adFakeRow adFakeHeader">
              <span>Nom</span>
              <span>Email</span>
              <span>Rôle</span>
            </div>

            {[
              { name: "Frank", email: "elockfrank4@gmail.com", role: "User" },
              { name: "Maya", email: "maya@gmail.com", role: "User" },
              { name: "Koffi", email: "koffi@gmail.com", role: "Creator" },
              { name: "Aline", email: "aline@gmail.com", role: "User" },
            ].map((u) => (
              <div className="adFakeRow" key={u.email}>
                <span className="adNameCell">
                  <span className="adMiniAvatar">{u.name[0]}</span>
                  <span className="adName">{u.name}</span>
                </span>
                <span className="adEmail">{u.email}</span>
                <span className="adRolePill">{u.role}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="adPanel">
          <div className="adPanelHead">
            <h3>Activité récente</h3>
          </div>

          <div className="adActivity">
            <div className="adActivityItem">
              <span className="adDot" />
              <div>
                <div className="adActivityTitle">Nouvelle vidéo ajoutée</div>
                <div className="adActivityMeta">il y a 12 min</div>
              </div>
            </div>

            <div className="adActivityItem">
              <span className="adDot" />
              <div>
                <div className="adActivityTitle">3 nouveaux utilisateurs inscrits</div>
                <div className="adActivityMeta">il y a 1 h</div>
              </div>
            </div>

            <div className="adActivityItem">
              <span className="adDot" />
              <div>
                <div className="adActivityTitle">Mise à jour des catégories</div>
                <div className="adActivityMeta">hier</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Accueil;
