import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { ServiceOfficeCard, AboutBanner } from '../../components';
import image from '../../assets/images/_K4C9496.jpg';
import { fetchServicesList } from '../../api/website';
import LoadingState from '../../components/common/LoadingState';
import ErrorState from '../../components/common/ErrorState';


export const ServicesListPage = () => {
  const { t } = useTranslation();
  const [services, setServices] = useState([]);
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
        setServices(items);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <section className="bg-light"><LoadingState message={t('loading') || 'Loading...'} /></section>;
  if (error) return <section className="bg-light"><ErrorState title={t('error') || 'Error'} message={'Failed to load services'} onRetry={() => { setLoading(true); setError(null); }} /></section>;

  return (
    <section className="bg-light">
      <AboutBanner
        titleKey="ourServices"
        descriptionKey="officeServiceDescription"
        backgroundImage={image}
      />
      <Container>
        <h2 className="mb-4 text-center fw-bold" style={{ color: '#223B7D' }}>
          {t('ourServices')}
        </h2>
        <Row className="g-4 py-3">
          {services.map((service) => (
            <Col key={service.Id} md={6} lg={4}>
              <ServiceOfficeCard service={service} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};
