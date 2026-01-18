// src/pages/Contact.jsx
import React, { useMemo, useState } from "react";
import "./Contact.css";
import { contactApi } from "../api/contactApi";

const Contact = () => {
  const [type, setType] = useState("contact"); // contact | casting
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    consent: false,
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ ok: false, error: "" });

  const isCasting = type === "casting";

  const subjectPlaceholder = useMemo(() => {
    return isCasting ? "Candidature casting (ex: Rôle, Projet, Ville...)" : "Objet du message";
  }, [isCasting]);

  const messagePlaceholder = useMemo(() => {
    return isCasting
      ? "Présente-toi : âge (optionnel), ville, expériences, disponibilités, liens (Instagram/portfolio), et le type de rôle recherché."
      : "Écris ton message ici…";
  }, [isCasting]);

  const onChange = (key) => (e) => {
    const value = key === "consent" ? e.target.checked : e.target.value;
    setForm((s) => ({ ...s, [key]: value }));
    setStatus({ ok: false, error: "" });
  };

  const validate = () => {
    if (!form.name.trim()) return "Nom obligatoire.";
    if (!form.email.trim()) return "Email obligatoire.";
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) return "Email invalide.";
    if (!form.subject.trim()) return "Objet obligatoire.";
    if (!form.message.trim()) return "Message obligatoire.";
    if (!form.consent) return "Tu dois accepter la politique de confidentialité.";
    return "";
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const err = validate();
    if (err) {
      setStatus({ ok: false, error: err });
      return;
    }

    setLoading(true);
    setStatus({ ok: false, error: "" });

    try {
      await contactApi.send({
        type,
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || null,
        subject: form.subject.trim(),
        message: form.message.trim(),
        consent: !!form.consent,
      });

      setStatus({ ok: true, error: "" });
      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        consent: false,
      });
      setType("contact");
    } catch (e2) {
      const msg =
        e2?.response?.data?.message ||
        e2?.response?.data?.error ||
        e2?.message ||
        "Erreur lors de l’envoi du message.";
      setStatus({ ok: false, error: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ct-page">
      <div className="ct-wrap">
        <div className="ct-head">
          <h1 className="ct-title">Contact</h1>
          <p className="ct-subtitle">
            Besoin d’aide, signalement, partenariat… ou candidature pour un casting.
          </p>
        </div>

        <div className="ct-tabs">
          <button
            type="button"
            className={`ct-tab ${type === "contact" ? "isActive" : ""}`}
            onClick={() => setType("contact")}
          >
            Nous contacter
          </button>

          <button
            type="button"
            className={`ct-tab ${type === "casting" ? "isActive" : ""}`}
            onClick={() => setType("casting")}
          >
            Casting / Candidature
          </button>
        </div>

        <form className="ct-card" onSubmit={onSubmit}>
          {status.ok && (
            <div className="ct-alert ct-alert--ok">
              Message envoyé ✅ Nous te répondrons dès que possible.
            </div>
          )}
          {status.error && (
            <div className="ct-alert ct-alert--err">{status.error}</div>
          )}

          <div className="ct-grid">
            <div className="ct-field">
              <label className="ct-label">Nom / Prénom</label>
              <input
                className="ct-input"
                value={form.name}
                onChange={onChange("name")}
                placeholder="Ex: Kuetche Alex"
                autoComplete="name"
              />
            </div>

            <div className="ct-field">
              <label className="ct-label">Email</label>
              <input
                className="ct-input"
                value={form.email}
                onChange={onChange("email")}
                placeholder="ex: alex@email.com"
                autoComplete="email"
              />
            </div>

            <div className="ct-field">
              <label className="ct-label">Téléphone (optionnel)</label>
              <input
                className="ct-input"
                value={form.phone}
                onChange={onChange("phone")}
                placeholder="+33..."
                autoComplete="tel"
              />
            </div>

            <div className="ct-field">
              <label className="ct-label">Objet</label>
              <input
                className="ct-input"
                value={form.subject}
                onChange={onChange("subject")}
                placeholder={subjectPlaceholder}
              />
            </div>
          </div>

          <div className="ct-field">
            <label className="ct-label">Message</label>
            <textarea
              className="ct-textarea"
              value={form.message}
              onChange={onChange("message")}
              placeholder={messagePlaceholder}
              rows={7}
            />
          </div>

          {isCasting && (
            <div className="ct-hint">
              <div className="ct-hintTitle">Astuce casting</div>
              <div className="ct-hintText">
                Ajoute des liens (YouTube/Drive/Instagram/Portfolio). Pour l’upload direct de vidéos,
                on le fera dans une étape suivante (je te propose la meilleure approche plus bas).
              </div>
            </div>
          )}

          <label className="ct-consent">
            <input
              type="checkbox"
              checked={form.consent}
              onChange={onChange("consent")}
            />
            <span>
              J’accepte que mes données soient utilisées pour me recontacter (RGPD).
            </span>
          </label>

          <div className="ct-actions">
            <button className="ct-btn" disabled={loading}>
              {loading ? "Envoi..." : "Envoyer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
