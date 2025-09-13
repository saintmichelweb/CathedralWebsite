import React, { useEffect, useState } from 'react';
import { AboutBanner, AboutParishSection, OurPriestsSection, AboutMoreSection } from '../../components';
import { fetchAboutPriests } from '../../api/website';
import LoadingState from '../../components/common/LoadingState';
import ErrorState from '../../components/common/ErrorState';

export const AboutPage = () => {
  const [priests, setPriests] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchAboutPriests();
        // API returns { message, priests: [...] }
        const items = (res?.priests || []).map((p, idx) => ({
          id: idx,
          name: p.name,
          title: p.title,
          image: p.backgroundImage || '',
          description: {
            en: p?.description?.description_en,
            fr: p?.description?.description_fr,
            rw: p?.description?.description_rw,
          },
        }));
        setPriests(items);
      } catch (err) {
        console.error('Error loading priests:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <LoadingState message="Loading priests..." />;
  if (!priests) return <ErrorState title="Failed to load priests" onRetry={() => window.location.reload()} />;

  return (
    <>
      <AboutBanner />
      <AboutParishSection />
      <OurPriestsSection priests={priests} />
      <AboutMoreSection />
    </>
  );
};
