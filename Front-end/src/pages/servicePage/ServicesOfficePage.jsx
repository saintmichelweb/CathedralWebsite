// src/pages/ServicesOfficePage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { OfficeServicePage, AboutBanner } from '../../components';
import { fetchServicesList } from '../../api/website';
import LoadingState from '../../components/common/LoadingState';
import ErrorState from '../../components/common/ErrorState';
import image from '../../assets/images/_K4C9558.jpg';


export const ServicesOfficePage = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

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
        const found = items.find((s) => String(s.Id) === id);
        setService(found);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return <LoadingState message={"Loading service..."} />;
  if (!service) return <ErrorState title="Service not found" onRetry={() => window.location.reload()} />;

  return (
    <>
        <AboutBanner
        titleKey="ourServices"
        descriptionKey="officeServiceDescription"
        backgroundImage={image}
      />
        <OfficeServicePage service={service} />
    </>
  
)
};
