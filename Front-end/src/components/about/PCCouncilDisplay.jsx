import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { fetchAboutCommitteeCouncil } from "../../api/website"; 
import LoadingState from "../common/LoadingState";
import ErrorState from "../common/ErrorState";

export const PCCouncilDisplay = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || "rw";

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [councilData, setCouncilData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchAboutCommitteeCouncil();
        const list = res?.parishCommitteeCouncils || res?.data || [];
        const mapped = list.map((m, idx) => ({
          id: idx,
          name: m.names,
          position: m?.position?.[`position_${currentLang}`] || m?.position?.position_en || 'N/A',
          description: m?.description?.[`description_${currentLang}`] || m?.description?.description_en || t('No description available.'),
          telephone: m.telephone || 'N/A',
          email: m.email || 'N/A',
          image: m.backgroundImage || 'https://via.placeholder.com/600x400?text=No+Image',
          action: { en: 'Read More', fr: 'En savoir plus', rw: 'Soma byinshi' }[currentLang]
        }))
        setCouncilData(mapped);
      } catch (err) {
        console.error("Error loading PCC members:", err);
        setError(err.message || t("Failed to load data."));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentLang, t]);

  if (loading) return <LoadingState message={t('loading') || 'Loading...'} />;
  if (error) return <ErrorState title={t('error') || 'Error'} message={error} onRetry={() => { setLoading(true); setError(null); }} />;

  return (
    <div className="container py-5">
      <div className="row g-4">
        {councilData.map(({ id, name, position, description, image, telephone, email, action }) => (
          <div key={id} className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm">
              <img
                src={image}
                alt={name}
                className="card-img-top"
                style={{ height: "250px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{position}</h6>
                <p className="card-text flex-grow-1">{description}</p>
                <p className="mb-1"><strong>{t("Phone")}:</strong> {telephone}</p>
                <p className="mb-3"><strong>{t("Email")}:</strong> {email}</p>
                <div className="mt-auto">
                  {/* <button
                    className="btn w-100"
                    style={{
                      backgroundColor: "#223B7D",
                      borderColor: "#223B7D",
                      color: "#fff"
                    }}
                  >
                    {action}
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

