import React, { useEffect, useState } from "react";
import { fetchServicesChoirs } from "../../api/website";
import LoadingState from "../common/LoadingState";
import ErrorState from "../common/ErrorState";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const ChoralDisplay = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || "rw";

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [choirData, setChoirData] = useState([]);

  const navigate = useNavigate();

  const handleExplore = (id) => navigate(`/chorals/${id}`);

  const fetchChoirData = async () => {
      try {
        const response = await fetchServicesChoirs();
        console.log("Fetched Data:", response);

        const list = response?.Choir || response?.choirs || response?.data || [];
        if (!Array.isArray(list)) {
          throw new Error("Invalid choir data structure.");
        }

        const formatted = list.map((choir, idx) => {
          const { id, name, description, backgroundImage } = choir;
          const descriptionKey = `description_${currentLang}`;
          return {
            id: id ?? idx,
            title: name,
            description:
              description?.[descriptionKey] || description?.description_en || "No description available.",
            image: backgroundImage || "https://via.placeholder.com/600x400?text=No+Image",
          };
        });

        setChoirData(formatted);
      } catch (err) {
        console.error("Error fetching choir data:", err);
        setError(err?.message || "Failed to load data.");
      } finally {
        setLoading(false);
      }
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchChoirData();
  }, [currentLang]);

  if (loading) return <LoadingState message={t("loading") || 'Loading...'} />;
  if (error) return <ErrorState title={t("error") || 'Error'} message={error} onRetry={() => { setLoading(true); setError(null); fetchChoirData(); }} />;

  return (
    <div className="container py-5">
      {/* <h1 className="text-center mb-5 text-primary fw-bold">
        {t("Chorals Page")}
      </h1> */}

      <div className="row g-4">
        {choirData.map(({ id, title, description, image }) => (
          <div key={id} className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm">
              <img
                src={image}
                alt={title || "Choir Image"}
                className="card-img-top"
                style={{ height: "250px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <div className="mt-auto">
                <button
                  onClick={() => handleExplore(id)}
                  className="btn w-100"
                  style={{
                    backgroundColor: "#223B7D",
                    borderColor: "#223B7D",
                    color: "#fff"
                  }}
                >
                  {t("Explore")}
                </button>

                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
