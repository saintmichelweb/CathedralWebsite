import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "react-bootstrap";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import image from '../../assets/images/_K4C9517.jpg'

// Components
import { CommunityCard, BccLeadersSection, AboutBanner } from "../../components";
import { BccOverviewSection } from "../../components/about/BccOverviewSection";
import { DataDebugger } from "../../components/about/DataDebugger";
import { fetchAboutCommunities } from "../../api/website";
import LoadingState from "../../components/common/LoadingState";
import ErrorState from "../../components/common/ErrorState";

// Data
import { bccTranslations, communities as staticCommunities, bccs as staticBccs } from "../../data/communityData";

export const CommunityPage = () => {
  const { t, i18n } = useTranslation(); 
  const language = i18n.language;
  const [activeTab, setActiveTab] = useState("communities");
  const [communities, setCommunities] = useState([]);
  const [bccs, setBccs] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const bccName = bccTranslations[language];
  const navigate = useNavigate();
  const titleColor = "#223B7D";

  const loadCommunities = async () => {
    try {
      const res = await fetchAboutCommunities();
      console.log('API Response:', res); // Debug log
      
      const list = res?.community || res?.data || [];
      console.log('Communities list:', list); // Debug log
      
      if (list && list.length > 0) {
        // Use API data
        const mappedCommunities = list.map((c) => {
          const descriptions = (c.mpuzas || []).map((m) => {
            const key = `description_${language}`;
            return m?.description?.[key] || m?.description?.description_en || '';
          }).filter(Boolean);
          const families = (c.mpuzas || []).reduce((sum, m) => sum + ((m.cebs || []).length || 0), 0);
          return {
            name: c.name,
            description: descriptions[0] || '',
            families,
          };
        });

        const mappedBccs = {};
        for (const c of list) {
          // Extract individual BCCs from CEBs within each mpuza
          const communityBccs = [];
          for (const mpuza of c.mpuzas || []) {
            // Add the mpuza itself as a BCC if it has CEBs
            if (mpuza.cebs && mpuza.cebs.length > 0) {
              // Add each CEB as an individual BCC
              for (const ceb of mpuza.cebs) {
                communityBccs.push({
                  name: ceb.title,
                  leader: ceb.header,
                  phone: ceb.phone,
                  location: '',
                  families: 1, // Each CEB represents a family group
                  description: mpuza.description?.description_en || '',
                  picture: mpuza.picture || null,
                  mpuzaName: mpuza.title, // Keep track of which mpuza this CEB belongs to
                });
              }
            } else {
              // If no CEBs, treat the mpuza itself as a BCC
              communityBccs.push({
                name: mpuza.title,
                leader: mpuza.leader,
                phone: mpuza.phone,
                location: '',
                families: 1,
                description: mpuza.description?.description_en || '',
                picture: mpuza.picture || null,
                mpuzaName: mpuza.title,
              });
            }
          }
          mappedBccs[c.name] = communityBccs;
        }

        console.log('Using API data - Mapped communities:', mappedCommunities);
        console.log('Using API data - Mapped BCCs:', mappedBccs);

        setCommunities(mappedCommunities);
        setBccs(mappedBccs);
      } else {
        // Fallback to static data
        console.log('API returned empty data, using static data');
        const mappedCommunities = staticCommunities.map((c) => ({
          name: c.name,
          description: c.description,
          families: c.families,
        }));

        console.log('Using static data - Communities:', mappedCommunities);
        console.log('Using static data - BCCs:', staticBccs);

        setCommunities(mappedCommunities);
        setBccs(staticBccs);
      }
    } catch (e) {
      console.error('Error loading communities from API, using static data:', e);
      // Fallback to static data on error
      const mappedCommunities = staticCommunities.map((c) => ({
        name: c.name,
        description: c.description,
        families: c.families,
      }));

      setCommunities(mappedCommunities);
      setBccs(staticBccs);
      setError(null); // Clear error since we have fallback data
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    loadCommunities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  return (
    <main className="d-flex flex-column min-vh-100">
      <AboutBanner
      titleKey="community"
      descriptionKey="communityDesc"
      backgroundImage={image} />
      {/* <HeroSection t={t} titleColor={titleColor} /> */}
      <AboutNavigation t={t} />
      <IntroductionSection t={t} titleColor={titleColor} />
      
      {/* Communities Section */}
      <section className="py-5 bg-light">
        <div className="container px-4 px-sm-5">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold font-serif mb-4" style={{ color: titleColor }}>
              {t("community")} (Impuza Miryango Remezo)
            </h2>
            <div className="w-20 h-1 bg-warning mx-auto mb-4"></div>
            <p className="text-muted mx-auto" style={{ maxWidth: "800px" }}>
              {t("communityDesc")}
            </p>
          </div>

          {loading ? (
            <LoadingState message={t('loading') || 'Loading...'} />
          ) : error ? (
            <ErrorState title={t('error') || 'Error'} message={error} onRetry={() => { setLoading(true); setError(null); loadCommunities(); }} />
          ) : (
            <div className="row g-4">
              {communities.map((community, index) => (
                <div key={index} className="col-md-6">
                  <CommunityCard community={community} bccs={bccs} bccName={bccName} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {!loading && !error && (
        <>
          <DataDebugger communities={communities} bccs={bccs} />
          <BccLeadersSection communities={communities} bccs={bccs} bccName={bccName} />
          {/* <BccOverviewSection communities={communities} bccs={bccs} bccName={bccName} /> */}
        </>
      )}
      {/* <VolunteerSection initiatives={initiatives} /> */}
      <BackToAboutSection navigate={navigate} />
    </main>
  );
};

// ---------- Sub-components ----------

const HeroSection = ({ t }) => (
  <section
    className="position-relative w-100 text-white"
    style={{
      height: "600px",
      backgroundImage: `url(${image})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
  >
    {/* Overlay for darkening the background image */}
    <div
      className="position-absolute top-0 start-0 w-100 h-100"
      style={{ backgroundColor: "rgba(34, 59, 125, 0.5)", zIndex: 1 }}
    ></div>

<div className="position-relative z-10 text-center px-4 px-sm-5 h-100 d-flex flex-column justify-content-center">
      <div
        className="py-4 px-3 mx-auto"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          borderRadius: "0.5rem",
          maxWidth: "700px",
        }}
      >
        <h1 className="display-4 fw-bold text-white mb-4 font-serif">
          {t("community")}
        </h1>
        <div className="w-20 h-1 bg-warning mx-auto"></div>
      </div>
    </div>
  </section>
);


const AboutNavigation = ({ t }) => (
  <section className="bg-light py-5">
    <div className="container px-4 px-sm-5">
      <div className="d-flex flex-wrap justify-content-center gap-3">
        {/* Add navigation tabs/links here if needed */}
      </div>
    </div>
  </section>
);

const IntroductionSection = ({ t, titleColor }) => (
  <section className="py-5 bg-white">
    <div className="container px-4 px-sm-5">
      <div className="mx-auto text-center" style={{ maxWidth: "800px" }}>
        <h2 className="display-5 fw-bold font-serif mb-4" style={{ color: titleColor }}>
          {t("community")}
        </h2>
        <div className="w-20 h-1 bg-warning mx-auto mb-4"></div>
        <p className="text-muted mb-4">{t("communityDesc1")}</p>
        <p className="text-muted mb-4">{t("communityDesc2")}</p>
        <Button variant="warning" className="text-white px-4 py-2">
          {t("getInvolved")}
        </Button>
      </div>
    </div>
  </section>
);

const VolunteerSection = ({ initiatives }) => (
  <section className="py-5 bg-primary text-white">
    <div className="container px-4 px-sm-5 text-center">
      {/* Render volunteer info or call to action */}
      <h3 className="mb-3 font-serif">{/* t("volunteerTitle") */}Get Involved</h3>
      <p className="mb-4">{/* t("volunteerDesc") */}Join our initiatives and make a difference in your community.</p>
      {/* You can map initiatives here if needed */}
    </div>
  </section>
);

const BackToAboutSection = ({ navigate }) => (
  <section className="py-4 bg-white">
    <div className="container px-4 px-sm-5">
      <div className="d-flex justify-content-center">
        <Button
          style={{
            color: "#223B7D",           
            borderColor: "#223B7D",
            fontWeight: 500,
          }}
          variant="outline"
          className="d-flex align-items-center rounded-pill px-4 py-2 shadow-sm"
          onClick={() => navigate("/about")}
          aria-label="Back to About"
        >
          <FaChevronLeft className="me-2" />
          Back to About
        </Button>
      </div>
    </div>
  </section>
);

