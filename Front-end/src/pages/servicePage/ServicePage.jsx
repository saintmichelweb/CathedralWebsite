// src/pages/ServicesOverview.js
import React from 'react';
import { useTranslation } from 'react-i18next';
import { HeroSection, ServiceCard, QuickLinks, AboutBanner } from '../../components';
import image from '../../assets/images/_K4C9558.jpg';
import { useEffect, useState } from 'react';
import { fetchServicesList } from '../../api/website';

export const ServicePage = () => {
  const { t } = useTranslation();
  const [servicesData, setServicesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchServicesList();
        const items = (res?.services || []).map((s, idx) => ({
          Id: String(idx),
          Title: {
            en: s?.name?.name_en,
            fr: s?.name?.name_fr,
            rw: s?.name?.name_rw,
          },
          Description: {
            en: s?.description?.description_en,
            fr: s?.description?.description_fr,
            rw: s?.description?.description_rw,
          },
          BackgroundImage: s?.backgroundImage || '',
          ContactPerson: s?.contact_person_name,
          TelephoneNumber: s?.contact_person_phone_number,
          WorkDays: s?.work_days,
          WorkHours: s?.work_hours,
          Action: {
            en: 'View',
            fr: 'Voir',
            rw: 'Reba',
          },
        }));
        setServicesData(items);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <div className="text-center py-5">{t('loading') || 'Loading...'}</div>;
  if (error) return <div className="text-center py-5 text-danger">{t('error') || 'Failed to load services'}</div>;

  return (
    <div className="d-flex flex-column min-vh-100">
      <AboutBanner
        titleKey="ourServices"
        descriptionKey="ServiceDescription"
        backgroundImage={image}
      />

      <section className="py-5 bg-white">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold" style={{ color: '#223B7D' }}>
              {t('ourServices')}
            </h2>
            <div className="mx-auto bg-warning" style={{ width: '80px', height: '4px' }}></div>
            <p className="text-muted mt-3">
              {t('ServiceDescription')}
            </p>
          </div>

          <div className="row g-4">
            {servicesData.map((service) => (
              <div key={service.Id} className="col-md-4">
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <QuickLinks />
    </div>
  );
};
