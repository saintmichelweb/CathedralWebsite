import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchServicesChoirs } from "../../api/website";
import LoadingState from "../common/LoadingState";
import ErrorState from "../common/ErrorState";
import { useTranslation } from "react-i18next";

export const ChoralDetailsDisplay = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || "rw";

  const [choral, setChoral] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchChoralDetails = async () => {
      try {
        const data = await fetchServicesChoirs();
        const list = data?.Choir || data?.choirs || data?.data || [];
        if (!Array.isArray(list)) {
          throw new Error("Invalid choir data structure.");
        }

        const found = list.find((c, idx) => (c.id ?? idx) === Number(id));
        if (!found) throw new Error("Choral not found.");

        const descKey = `description_${currentLang}`;
        setChoral({
          title: found.name,
          description:
            found.description?.[descKey] ||
            found.description?.description_en ||
            "No description available.",
          image:
            found.backgroundImage ||
            "https://via.placeholder.com/1600x900?text=No+Image+Available",
          leader: found.leader,
          telephone: found.telephone,
          status: found.status,
        });
      } catch (err) {
        console.error("Error fetching choral details:", err);
        setError(err.message || "Failed to load choral details.");
      } finally {
        setLoading(false);
      }
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchChoralDetails();
  }, [id, currentLang]);

  if (loading) return <LoadingState message={t("loading") || 'Loading...'} />;
  if (error) return <ErrorState title={t("error") || 'Error'} message={error} onRetry={() => { setLoading(true); setError(null); fetchChoralDetails(); }} />;

  return (
    <div className="container-fluid px-0">
      {/* Header Image */}
      <div
        className="w-100"
        style={{
          height: "85vh",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <img
          src={choral.image}
          alt={choral.title || "Choir Image"}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            display: "block",
            filter: "brightness(75%)",
          }}
        />
        <div
          className="position-absolute top-50 start-50 translate-middle text-white text-center"
          style={{ padding: "0 1.5rem" }}
        >
          <h1
            className="fw-bold"
            style={{
              fontSize: "3.5rem",
              textShadow: "3px 3px 10px rgba(0,0,0,0.7)",
            }}
          >
            {choral.title}
          </h1>
          <p
            className="mt-3 fw-light"
            style={{ fontSize: "1.2rem", textShadow: "1px 1px 5px rgba(0,0,0,0.6)" }}
          >
            {choral.status === "active" ? t("Active") : t("Inactive")}
          </p>
        </div>
      </div>

      {/* Info Section */}
      <div className="py-5 px-4 px-md-5 bg-light">
        <div className="mx-auto" style={{ maxWidth: "960px" }}>
          <p className="fs-5 text-dark" style={{ lineHeight: "1.8" }}>
            {choral.description}
          </p>

          <div className="mt-4">
            <h5 className="fw-bold">{t("choirLeader") || "Choir Leader"}:</h5>
            <p>{choral.leader}</p>

            <h5 className="fw-bold">{t("contact") || "Contact"}:</h5>
            <p>
            <a href={`tel:${choral.telephone}`} className="text-decoration-none" style={{ color: "#223B7D" }}>
              {choral.telephone}
            </a>

            </p>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="py-4 px-4">
      <button
        className="btn rounded-pill shadow-sm"
        onClick={() => navigate(-1)}
        style={{
          color: "#223B7D",
          border: "1px solid #223B7D",
          backgroundColor: "transparent"
        }}
      >
        ← {t("Back") || "Back"}
      </button>

      </div>
    </div>
  );
};
