import React, { useEffect, useState } from "react";
import "./clients.css";
import { clientApi } from "../../api";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import RefreshIcon from "@mui/icons-material/Refresh";

const Clients = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await clientApi.getAll();
      const data = Array.isArray(res?.data) ? res.data : [];
      setRows(data);
    } catch (e) {
      const msg =
        e?.response?.data?.message ||
        e?.response?.data?.error ||
        e?.message ||
        "Erreur lors du chargement des utilisateurs";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onDelete = async (id) => {
    if (!window.confirm("Supprimer cet utilisateur ?")) return;

    try {
      await clientApi.remove(id);
      // refresh local rapide
      setRows((r) => r.filter((x) => x.id !== id));
    } catch (e) {
      const msg =
        e?.response?.data?.message ||
        e?.response?.data?.error ||
        e?.message ||
        "Suppression impossible";
      alert(msg);
    }
  };

  return (
    <div className="adClients">
      <div className="adClientsHead">
        <div>
          <h1 className="adClientsTitle">Utilisateurs</h1>
          <div className="adClientsSub">Liste des clients (Symfony: /api/clients)</div>
        </div>

        <button className="adClientsRefresh" type="button" onClick={load}>
          <RefreshIcon />
          RAFRAÎCHIR
        </button>
      </div>

      {loading ? (
        <div className="adClientsEmpty">Chargement...</div>
      ) : error ? (
        <div className="adClientsEmpty">{error}</div>
      ) : rows.length === 0 ? (
        <div className="adClientsEmpty">Aucun utilisateur.</div>
      ) : (
        <div className="adClientsCard">
          <div className="adClientsTableHead">
            <div>ID</div>
            <div>Nom</div>
            <div>Email</div>
            <div>UserId</div>
            <div className="adClientsRight">Actions</div>
          </div>

          {rows.map((c) => (
            <div className="adClientsRow" key={c.id}>
              <div className="adClientsId">{c.id}</div>
              <div className="adClientsName">{c.nom || c.name || "—"}</div>
              <div className="adClientsEmail">{c.email || "—"}</div>
              <div className="adClientsUserId">{c.userId ?? "—"}</div>
              <div className="adClientsRight">
                <button
                  type="button"
                  className="adClientsDelete"
                  onClick={() => onDelete(c.id)}
                  aria-label="supprimer"
                >
                  <DeleteOutlineIcon />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Clients;
