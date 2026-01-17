import React, { useEffect, useMemo, useState } from "react";
import "./VideoAdmin.css";
import { videoApi } from "../../api/videoApi";
import { categoryApi } from "../../api/categoryApi";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import RefreshIcon from "@mui/icons-material/Refresh";
import SaveIcon from "@mui/icons-material/Save";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

const bytesToMb = (n) => {
  if (!n && n !== 0) return "—";
  return (n / (1024 * 1024)).toFixed(2) + " MB";
};

const VideoAdmin = () => {
  const [rows, setRows] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // form upload
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState(""); // NEW
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  // inline edit
  // { [id]: { title, categoryId, saving } }
  const [editing, setEditing] = useState({});

  const loadCategories = async () => {
    try {
      const res = await categoryApi.getAll();
      const data = Array.isArray(res?.data) ? res.data : [];
      setCategories(data);
    } catch {
      // on ne bloque pas l'admin si categories KO
      setCategories([]);
    }
  };

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await videoApi.getAll();
      const data = Array.isArray(res?.data) ? res.data : [];
      setRows(data);
    } catch (e) {
      const msg =
        e?.response?.data?.message ||
        e?.response?.data?.error ||
        e?.message ||
        "Erreur lors du chargement des vidéos";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    loadCategories();
  }, []);

  const onDelete = async (id) => {
    if (!window.confirm("Supprimer cette vidéo ? (BD + fichier mp4)")) return;

    try {
      await videoApi.remove(id);
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

  const onUpload = async (e) => {
    e.preventDefault();

    if (!title.trim()) return alert("Titre obligatoire");
    if (!file) return alert("Fichier mp4 obligatoire");

    setUploading(true);
    try {
      const res = await videoApi.upload({
        title: title.trim(),
        categoryId: categoryId || null, // NEW
        file,
      });

      if (res?.data?.id) {
        setRows((r) => [res.data, ...r]);
      } else {
        await load();
      }

      setTitle("");
      setCategoryId("");
      setFile(null);
    } catch (e2) {
      const msg =
        e2?.response?.data?.message ||
        e2?.response?.data?.error ||
        e2?.message ||
        "Upload impossible";
      alert(msg);
    } finally {
      setUploading(false);
    }
  };

  const startEdit = (v) => {
    setEditing((prev) => ({
      ...prev,
      [v.id]: {
        title: v.title || "",
        categoryId: v.category?.id ? String(v.category.id) : "",
        saving: false,
      },
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
    const current = editing[id];
    if (!current) return;

    const newTitle = (current.title || "").trim();
    const newCategoryId = current.categoryId === "" ? null : Number(current.categoryId);

    if (!newTitle) return alert("Le titre ne peut pas être vide");

    setEditing((prev) => ({
      ...prev,
      [id]: { ...prev[id], saving: true },
    }));

    try {
      const res = await videoApi.update(id, {
        title: newTitle,
        categoryId: newCategoryId, // NEW
      });

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
      setEditing((prev) => ({
        ...prev,
        [id]: { ...prev[id], saving: false },
      }));
    }
  };

  const fileUrl = useMemo(
    () => (p) => {
      if (!p) return null;
      if (p.startsWith("http")) return p;
      return API_URL + p;
    },
    []
  );

  return (
    <div className="adVideos">
      <div className="adVideosHead">
        <div>
          <h1 className="adVideosTitle">Vidéos</h1>
          <div className="adVideosSub">Admin CRUD (Symfony: /api/videos)</div>
        </div>

        <button className="adVideosRefresh" type="button" onClick={() => { load(); loadCategories(); }}>
          <RefreshIcon />
          RAFRAÎCHIR
        </button>
      </div>

      {/* UPLOAD */}
      <div className="adVideosUploadCard">
        <div className="adVideosUploadTitle">Ajouter une vidéo (MP4)</div>

        <form className="adVideosUploadForm" onSubmit={onUpload}>
          <input
            className="adVideosInput"
            placeholder="Titre"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={uploading}
          />

          {/* SELECT category */}
          <select
            className="adVideosInput"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            disabled={uploading}
          >
            <option value="">— Aucune catégorie —</option>
            {categories.map((c) => (
              <option key={c.id} value={String(c.id)}>
                {c.name}
              </option>
            ))}
          </select>

          <input
            className="adVideosFile"
            type="file"
            accept="video/mp4"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            disabled={uploading}
          />

          <button className="adVideosUploadBtn" type="submit" disabled={uploading}>
            <CloudUploadIcon />
            {uploading ? "UPLOAD..." : "UPLOAD"}
          </button>
        </form>

        {file ? (
          <div className="adVideosHint">
            Fichier sélectionné : <b>{file.name}</b> ({bytesToMb(file.size)})
          </div>
        ) : null}
      </div>

      {/* LIST */}
      {loading ? (
        <div className="adVideosEmpty">Chargement...</div>
      ) : error ? (
        <div className="adVideosEmpty">{error}</div>
      ) : rows.length === 0 ? (
        <div className="adVideosEmpty">Aucune vidéo.</div>
      ) : (
        <div className="adVideosCard">
          <div className="adVideosTableHead">
            <div>ID</div>
            <div>Titre</div>
            <div>Catégorie</div>
            <div>Fichier</div>
            <div>Poids</div>
            <div className="adVideosRight">Actions</div>
          </div>

          {rows.map((v) => {
            const isEdit = !!editing[v.id];
            const editState = editing[v.id];

            return (
              <div className="adVideosRow" key={v.id}>
                <div className="adVideosId">{v.id}</div>

                <div className="adVideosTitleCell">
                  {isEdit ? (
                    <input
                      className="adVideosInlineInput"
                      value={editState.title}
                      onChange={(e) =>
                        setEditing((prev) => ({
                          ...prev,
                          [v.id]: { ...prev[v.id], title: e.target.value },
                        }))
                      }
                      disabled={editState.saving}
                    />
                  ) : (
                    <div className="adVideosName">{v.title || "—"}</div>
                  )}
                </div>

                <div className="adVideosCategoryCell">
                  {isEdit ? (
                    <select
                      className="adVideosInlineInput"
                      value={editState.categoryId}
                      onChange={(e) =>
                        setEditing((prev) => ({
                          ...prev,
                          [v.id]: { ...prev[v.id], categoryId: e.target.value },
                        }))
                      }
                      disabled={editState.saving}
                    >
                      <option value="">— Aucune —</option>
                      {categories.map((c) => (
                        <option key={c.id} value={String(c.id)}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="adVideosCategory">{v.category?.name || "—"}</div>
                  )}
                </div>

                <div className="adVideosFileCell">
                  {v.filePath ? (
                    <a className="adVideosLink" href={fileUrl(v.filePath)} target="_blank" rel="noreferrer">
                      Voir
                    </a>
                  ) : (
                    "—"
                  )}
                </div>

                <div className="adVideosSize">{bytesToMb(v.sizeBytes)}</div>

                <div className="adVideosRight">
                  {!isEdit ? (
                    <>
                      <button type="button" className="adVideosAction" onClick={() => startEdit(v)} title="Modifier">
                        ✎
                      </button>

                      <button
                        type="button"
                        className="adVideosDelete"
                        onClick={() => onDelete(v.id)}
                        aria-label="supprimer"
                        title="Supprimer"
                      >
                        <DeleteOutlineIcon />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        className="adVideosSave"
                        onClick={() => saveEdit(v.id)}
                        disabled={editState.saving}
                        title="Enregistrer"
                      >
                        <SaveIcon />
                      </button>

                      <button
                        type="button"
                        className="adVideosCancel"
                        onClick={() => cancelEdit(v.id)}
                        disabled={editState.saving}
                        title="Annuler"
                      >
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

export default VideoAdmin;
