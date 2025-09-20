import React, { useEffect, useState, useMemo } from 'react';
import { Container, Row, Col, Table, Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { fetchHomeMassTimes } from '../../api/website';
import LoadingState from '../common/LoadingState';
import ErrorState from '../common/ErrorState';

export const MassScheduleSection = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || 'rw';
  const [tabs, setTabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const translate = (item, field) => {
    const map = {
      en: field,
      fr: `${field}_fr`,
      rw: `${field}_rw`,
    };
    return item[map[lang]] || item[field] || '';
  };

  const translateDay = (item) => {
    const key = lang === 'fr' ? 'jour' : lang === 'rw' ? 'umunsi' : 'day';
    return item[key] || item['day'] || '';
  };

  // Memoize maps for performance
  const titleMap = useMemo(() => ({
    en: 'Mass Schedule',
    fr: 'Heures des Messes',
    rw: 'Amasaha ya misa',
  }), []);

  const sacramentsTitle = useMemo(() => ({
    en: 'Sacraments',
    fr: 'Sacrements',
    rw: 'Amasakaramentu',
  }), []);

  const columnLabels = useMemo(() => ({
    day: lang === 'fr' ? 'Jour' : lang === 'rw' ? 'Umunsi' : 'Day',
    time: lang === 'fr' ? 'Heure' : lang === 'rw' ? 'Isaha' : 'Time',
    lang: lang === 'fr' ? 'Langue' : lang === 'rw' ? 'Ururimi' : 'Language',
  }), [lang]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchHomeMassTimes();
        // API returns { data: [ { id, tabTitle, content: [ { day, times: [ { time, language } ] } ] } ] }
        setTabs(res?.data || []);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <section className="mass-schedule py-5 bg-light">
        <LoadingState message={t('loading') || 'Loading...'} />
      </section>
    );
  }

  if (error) {
    return (
      <section className="mass-schedule py-5 bg-light">
        <ErrorState
          title={t('error') || 'Error'}
          message={t('failedToLoadMassTimes') || 'Failed to load mass times'}
          onRetry={() => {
            setLoading(true);
            setError(null);
          }}
        />
      </section>
    );
  }

  // Flatten all masses to check for empty state
  const allActiveMasses = tabs.flatMap((tab) =>
    (tab.content || []).flatMap((dayItem) =>
      (dayItem.times || [])
    )
  );

  return (
    <section className="mass-schedule py-5 bg-light">
      <Container>
        <h1 className="text-center mb-2 church-title">{t('mainChurch') || 'Main Church'}</h1>
        <p className="text-center mb-4 church-address">KN 67 St, Kigali, Rwanda</p>

        <h2 className="text-center mb-4 section-title">{titleMap[lang]}</h2>

        {allActiveMasses.length === 0 ? (
          <Row className="justify-content-center">
            <Col lg={8}>
              <Alert variant="info" className="text-center">
                {t('noMassTimesAvailable') || 'No mass times available at the moment.'}
              </Alert>
            </Col>
          </Row>
        ) : (
          tabs.map((tab) => (
            <Row className="justify-content-center" key={tab.id}>
              <Col lg={8}>
                <h3 className="text-center mb-3">{translate(tab, 'tabTitle')}</h3>
                <div className="schedule-card p-4 mb-5">
                  <Table responsive borderless className="mb-0">
                    <caption className="visually-hidden">{titleMap[lang]}</caption>
                    <thead>
                      <tr className="table-header">
                        <th scope="col">{columnLabels.day}</th>
                        <th scope="col">{columnLabels.time}</th>
                        <th scope="col">{columnLabels.lang}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tab.content?.flatMap((dayItem, dayIdx) =>
                        (dayItem.times || []).map((timeItem, timeIdx) => (
                          <tr key={`${tab.id}-${dayIdx}-${timeIdx}`}>
                            <td>{translateDay(dayItem)}</td>
                            <td>{timeItem.time}</td>
                            <td>{timeItem.language}</td>
                          </tr>
                        ))
                      ) || null}
                    </tbody>
                  </Table>
                </div>
              </Col>
            </Row>
          ))
        )}

        {/* Sacraments Section - Using data from the fetched tabs if available, otherwise placeholder */}
        <hr className="my-5" />
        <h2 className="text-center mb-4 section-title">{sacramentsTitle[lang]}</h2>
        <Row className="justify-content-center">
        <Col lg={6}>
        <div className="sacraments-card p-4 text-center mt-4">
          <p className="section-title">{t('confessions')} <br/> {t('Adoration')} </p>
          <Link
            to="/services/mass-schedule"
            className="inline-block px-4 py-2 mt-2 text-customBlue font-medium border border-customBlue rounded-lg no-underline hover:bg-customBlue hover:text-white transition-colors duration-200"
          >
            {t('viewFullSchedule')}
          </Link>


        </div>
        </Col>
        </Row>
        
      </Container>
    </section>
  );
};