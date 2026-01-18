// src/components/Admins/MessageAdmin.jsx
import React, { useEffect, useMemo, useState } from "react";
import "./MessageAdmin.css";
import { contactApi } from "../../api/contactApi";

import RefreshIcon from "@mui/icons-material/Refresh";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";

const MessageAdmin = () => {
  const [tab, setTab] = useState("messages"); // "messages" | "castings"
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([]);
  const [castings, setCastings] = useState([]);

  const title = useMemo(() => {
    return tab === "messages" ? "Messages" : "Candidatures Casting";
  }, [tab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [mRes, cRes] = await Promise.allSettled([
        contactApi.getAllMessages(),
        contactApi.getAllCastings(),
      ]);

      if (mRes.status === "fulfilled") {
        // Symfony peut renvoyer {items:[...]} ou directement [...]
        const data = mRes.value.data;
        setMessages(Array.isArray(data) ? data : data.items || []);
      }
      if (cRes.status === "fulfilled") {
        const data = cRes.value.data;
        setCastings(Array.isArray(data) ? data : data.items || []);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onDeleteMessage = async (id) => {
    if (!window.confirm("Supprimer ce message ?")) return;
    await contactApi.removeMessage(id);
    setMessages((prev) => prev.filter((x) => x.id !== id));
  };

  const onDeleteCasting = async (id) => {
    if (!window.confirm("Supprimer cette candidature ?")) return;
    await contactApi.removeCasting(id);
    setCastings((prev) => prev.filter((x) => x.id !== id));
  };

  const list = tab === "messages" ? messages : castings;

  return (
    <div className="msgAdmin">
      <div className="msgAdminHeader">
        <div>
          <h1 className="msgAdminTitle">{title}</h1>
          <p className="msgAdminSub">
            Gestion des messages reçus et des candidatures casting (Symfony)
          </p>
        </div>

        <button
          type="button"
          className="msgBtn msgBtnGhost"
          onClick={fetchData}
          disabled={loading}
        >
          <RefreshIcon />
          <span>{loading ? "Chargement..." : "Rafraîchir"}</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="msgTabs">
        <button
          type="button"
          className={`msgTab ${tab === "messages" ? "active" : ""}`}
          onClick={() => setTab("messages")}
        >
          <MailOutlineIcon />
          <span>Messages</span>
          <span className="msgCount">{messages.length}</span>
        </button>

        <button
          type="button"
          className={`msgTab ${tab === "castings" ? "active" : ""}`}
          onClick={() => setTab("castings")}
        >
          <WorkOutlineIcon />
          <span>Castings</span>
          <span className="msgCount">{castings.length}</span>
        </button>
      </div>

      {/* List */}
      <div className="msgGrid">
        {list.length === 0 && !loading ? (
          <div className="msgEmpty">Aucun élément pour le moment.</div>
        ) : (
          list.map((item) => (
            <div key={item.id} className="msgCard">
              <div className="msgCardTop">
                <div className="msgCardTitle">
                  {tab === "messages" ? (
                    <>
                      <span className="msgBadge">CONTACT</span>
                      <span className="msgStrong">{item.subject || "Sans objet"}</span>
                    </>
                  ) : (
                    <>
                      <span className="msgBadge msgBadgeCasting">CASTING</span>
                      <span className="msgStrong">
                        {item.fullName || item.name || "Candidat"}
                      </span>
                    </>
                  )}
                </div>

                <button
                  type="button"
                  className="msgIconDanger"
                  title="Supprimer"
                  onClick={() =>
                    tab === "messages"
                      ? onDeleteMessage(item.id)
                      : onDeleteCasting(item.id)
                  }
                >
                  <DeleteOutlineIcon />
                </button>
              </div>

              <div className="msgMeta">
                {tab === "messages" ? (
                  <>
                    <div>
                      <span className="msgMetaLabel">Nom :</span>{" "}
                      <span>{item.fullName || "-"}</span>
                    </div>
                    <div>
                      <span className="msgMetaLabel">Email :</span>{" "}
                      <span>{item.email || "-"}</span>
                    </div>
                    <div>
                      <span className="msgMetaLabel">Téléphone :</span>{" "}
                      <span>{item.phone || "-"}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <span className="msgMetaLabel">Email :</span>{" "}
                      <span>{item.email || "-"}</span>
                    </div>
                    <div>
                      <span className="msgMetaLabel">Téléphone :</span>{" "}
                      <span>{item.phone || "-"}</span>
                    </div>
                    <div>
                      <span className="msgMetaLabel">Âge :</span>{" "}
                      <span>{item.age ?? "-"}</span>
                    </div>
                  </>
                )}
              </div>

              <div className="msgBody">
                {tab === "messages"
                  ? item.message || ""
                  : item.motivation || item.message || ""}
              </div>

              {item.createdAt && (
                <div className="msgFooter">
                  Reçu le{" "}
                  {new Date(item.createdAt).toLocaleString("fr-FR", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MessageAdmin;
