import React, { useEffect, useState } from "react";
import "./Categories.css";
import { categoryApi } from "../../api/categoryApi";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import RefreshIcon from "@mui/icons-material/Refresh";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";

const Categories = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [newName, setNewName] = useState("");
  const [creating, setCreating] = useState(false);

  const [editing, setEditing] = useState({}); // { [id]: { name, saving } }

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await categoryApi.getAll();
      setRows(Array.isArray(res?.data) ? res.data : []);
    } catch (e) {
      const msg =
        e?.response?.data?.message ||
        e?.response?.data?.error ||
        e?.message ||
        "Erreur lors du chargement des catégories";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onCreate = async (e) => {
    e.preventDefault();
    const name = newName.trim();
    if (!name) return alert("Nom obligatoire");

    setCreating(true);
    try {
      const res = await categoryApi.create({ name: newName });
      if (res?.data?.id) setRows((r) => [res.data, ...r]);
      else await load();
      setNewName("");
    } catch (e2) {
      const msg =
        e2?.response?.data?.message ||
        e2?.response?.data?.error ||
        e2?.message ||
        "Création impossible";
      alert(msg);
    } finally {
      setCreating(false);
    }
  };

  const startEdit = (c) => {
    setEditing((prev) => ({
      ...prev,
      [c.id]: { name: c.name || "", saving: false },
    }));
  };

  const cancelEdit = (id) => {
    setEditing((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  const saveEdit = async (id) => {
    const cur = editing[id];
    if (!cur) return;
    const name = (cur.name || "").trim();
    if (!name) return alert("Le nom ne peut pas être vide");

    setEditing((prev) => ({ ...prev, [id]: { ...prev[id], saving: true } }));

    try {
      const res = await categoryApi.update(id, { name });
      const updated = res?.data;
      setRows((r) => r.map((x) => (x.id === id ? { ...x, ...updated } : x)));
      cancelEdit(id);
    } catch (e) {
      const msg =
        e?.response?.data?.message ||
        e?.response?.data?.error ||
        e?.message ||
        "Modification impossible";
      alert(msg);
      setEditing((prev) => ({ ...prev, [id]: { ...prev[id], saving: false } }));
    }
  };

  const onDelete = async (id) => {
    if (!window.confirm("Supprimer cette catégorie ?")) return;

    try {
      await categoryApi.remove(id);
      setRows((r) => r.filter((x) => x.id !== id));
    } catch (e) {
      const msg =
        e?.response?.data?.message ||
        e?.response?.data?.error ||
        e?.message ||
        "Suppression impossible (peut-être utilisée par des vidéos ?)";
      alert(msg);
    }
  };

  return (
    <div className="adCats">
      <div className="adCatsHead">
        <div>
          <h1 className="adCatsTitle">Catégories</h1>
          <div className="adCatsSub">CRUD catégories (Symfony: /api/categories)</div>
        </div>

        <button className="adCatsRefresh" type="button" onClick={load}>
          <RefreshIcon />
          RAFRAÎCHIR
        </button>
      </div>

      <div className="adCatsCreateCard">
        <form className="adCatsCreateForm" onSubmit={onCreate}>
          <input
            className="adCatsInput"
            placeholder="Nouvelle catégorie (ex: Sport, Tech, Musique...)"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            disabled={creating}
          />
          <button className="adCatsCreateBtn" type="submit" disabled={creating}>
            <AddIcon />
            {creating ? "AJOUT..." : "AJOUTER"}
          </button>
        </form>
      </div>

      {loading ? (
        <div className="adCatsEmpty">Chargement...</div>
      ) : error ? (
        <div className="adCatsEmpty">{error}</div>
      ) : rows.length === 0 ? (
        <div className="adCatsEmpty">Aucune catégorie.</div>
      ) : (
        <div className="adCatsCard">
          <div className="adCatsTableHead">
            <div>ID</div>
            <div>Nom</div>
            <div className="adCatsRight">Actions</div>
          </div>

          {rows.map((c) => {
            const isEdit = !!editing[c.id];
            const cur = editing[c.id];

            return (
              <div className="adCatsRow" key={c.id}>
                <div className="adCatsId">{c.id}</div>

                <div className="adCatsNameCell">
                  {isEdit ? (
                    <input
                      className="adCatsInlineInput"
                      value={cur.name}
                      onChange={(e) =>
                        setEditing((prev) => ({
                          ...prev,
                          [c.id]: { ...prev[c.id], name: e.target.value },
                        }))
                      }
                      disabled={cur.saving}
                    />
                  ) : (
                    <div className="adCatsName">{c.name || "—"}</div>
                  )}
                </div>

                <div className="adCatsRight">
                  {!isEdit ? (
                    <>
                      <button className="adCatsAction" type="button" onClick={() => startEdit(c)} title="Modifier">
                        ✎
                      </button>
                      <button className="adCatsDelete" type="button" onClick={() => onDelete(c.id)} title="Supprimer">
                        <DeleteOutlineIcon />
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="adCatsSave" type="button" onClick={() => saveEdit(c.id)} disabled={cur.saving}>
                        <SaveIcon />
                      </button>
                      <button className="adCatsCancel" type="button" onClick={() => cancelEdit(c.id)} disabled={cur.saving}>
                        ✕
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Categories;
