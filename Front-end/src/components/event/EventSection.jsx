import React, { useEffect, useRef, useState } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import { fetchHomeRecentEvents } from '../../api/website';
import LoadingState from '../common/LoadingState';
import ErrorState from '../common/ErrorState';
import { SafeImage } from '../common/SafeImage';

  export const EventsSection = ({ data: overrideData }) => {
    const { t, i18n } = useTranslation();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const lang = i18n.language || 'rw';
    const scrollRef = useRef(null);
  
    useEffect(() => {
      const load = async () => {
        try {
          if (overrideData) {
            setData(overrideData);
          } else {
            const res = await fetchHomeRecentEvents();
            // API returns { data: [ { id, title: {title_en,...}, description: {...}, backgroundImage, event_date } ] }
            console.log(res)
            const mapped = (res?.data || []).map((e) => ({
              id: e.id,
              title_en: e.title?.title_en,
              title_fr: e.title?.title_fr,
              title_rw: e.title?.title_rw,
              description_en: e.description?.description_en,
              description_fr: e.description?.description_fr,
              description_rw: e.description?.description_rw,
              date: e.event_date,
              backgroundImage: e.backgroundImage,
              status: 'Activated',
            }));
            setData(mapped);
          }
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };
      load();
    }, [overrideData]);

    const activatedEvents = (data || []).filter(event => event.status === "Activated");
  
    const scroll = (scrollOffset) => {
      scrollRef.current?.scrollBy({ left: scrollOffset, behavior: 'smooth' });
    };
  
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString(lang, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };
  
    if (loading) return <section className="parish-events p-3"><LoadingState message={t('loading') || 'Loading...'} /></section>;
    if (error) return <section className="parish-events p-3"><ErrorState title={t('error') || 'Error'} message={'Failed to load events'} onRetry={() => { setLoading(true); setError(null); }} /></section>;
  
    return (
      <section className="parish-events p-3">
        <Fluid-Container>
          <h2 className="text-center mb-5 section-title">{t('upcoming_events')}</h2>
          
          <div className="position-relative p-2">
            <Button 
              variant="link" 
              className="scroll-button left m-3" 
              onClick={() => scroll(-300)}
              aria-label={t('previous_events')}
            >
              <FaChevronLeft size={24} />
            </Button>
  
            <div 
              ref={scrollRef}
              className="events-scroller"
            >
              <Row className="flex-nowrap p-5">
                {activatedEvents.map(event => (
                  <Col key={event.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                    <Card className="h-100 event-card">
                      <div className="card-image-container">
                        <SafeImage
                          src={event.backgroundImage}
                          alt={event[`title_${lang}`]}
                          className="card-image"
                          placeholderType="event"
                          placeholderSize="100%"
                          shape="rounded"
                        />
                        <div className="event-date-badge">
                          {formatDate(event.date)}
                        </div>
                      </div>
                      <Card.Body className="d-flex flex-column">
                        <Card.Title className="event-title">
                          {event[`title_${lang}`] || event.title_en}
                        </Card.Title>
                        <Card.Text className="event-description">
                          {event[`description_${lang}`] || event.description_en}
                        </Card.Text>
                        {/* <Button 
                          variant="primary" 
                          className="mt-auto align-self-start event-button"
                        >
                          {t('learn_more')}
                        </Button> */}
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
  
                {activatedEvents.length === 0 && (
                  <Col className="text-center py-5">
                    <p className="text-muted">{t('no_events')}</p>
                  </Col>
                )}
              </Row>
            </div>
  
            <Button 
              variant="link" 
              className="scroll-button right m-3" 
              onClick={() => scroll(300)}
              aria-label={t('next_events')}
            >
              <FaChevronRight size={24} />
            </Button>
          </div>
        </Fluid-Container>
      </section>
    );
  };
  