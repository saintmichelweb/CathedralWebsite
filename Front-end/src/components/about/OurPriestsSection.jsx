import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

export const OurPriestsSection = ({ priests }) => {
  const { t, i18n } = useTranslation();

  const getBio = (priest) => {
    if (!priest.description) return '';
    const langOrder = i18n.language === 'fr' ? ['fr', 'en', 'rw'] : i18n.language === 'en' ? ['en', 'fr', 'rw'] : ['rw', 'en', 'fr'];
    const bio = langOrder.reduce((bio, lang) => bio || priest.description[lang] || '', '');
    return bio.length > 150 ? `${bio.slice(0, 150)}...` : bio;
  };

  if (!priests || priests.length === 0) {
    return (
      <section className="mb-5">
        <Container>
          <Card
            className="border-0 shadow-sm text-center p-4"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              animation: 'fadeIn 0.5s ease-in-out',
            }}
            aria-live="polite"
          >
            <div
              className="spinner"
              style={{
                width: '40px',
                height: '40px',
                border: '4px solid #D4AF37',
                borderTop: '4px solid #002F6C',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto 1rem',
              }}
            />
            <p
              className="text-muted mb-0"
              style={{
                fontSize: '1.1rem',
                fontFamily: 'serif',
                animation: 'pulse 2s ease-in-out infinite',
              }}
            >
              {t("loading", "Loading...")}
            </p>
          </Card>
          <style>
            {`
              @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
              }
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
              @keyframes pulse {
                0% { opacity: 1; }
                50% { opacity: 0.6; }
                100% { opacity: 1; }
              }
            `}
          </style>
        </Container>
      </section>
    );
  }

  return (
    <section className="mb-5">
      <Container>
        <div className="text-center mb-5">
          <h2 className="fw-bold mb-3" style={{ color: '#002F6C', fontFamily: 'serif' }}>
            {t("ourPriests", "Our Priests")}
          </h2>
          <div
            style={{ width: '80px', height: '4px', backgroundColor: '#D4AF37', margin: '0 auto 1rem' }}
            aria-hidden="true"
          />
          <p className="text-muted mx-auto" style={{ maxWidth: '600px' }}>
            {t("priestsDesc", "Meet our dedicated priests who serve our community.")}
          </p>
        </div>

        <Row className="g-4">
          {priests.map((priest) => (
            <Col md={4} key={priest.id}>
              <Card className="h-100 shadow-sm border-0 hover-shadow" style={{ transition: 'box-shadow 0.3s' }}>
                <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
                  <img
                    src={priest.image || '/fallback-image.jpg'}
                    alt={priest.name}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                      color: 'white',
                      padding: '1rem',
                    }}
                  >
                    <h5 className="mb-1">{priest.name}</h5>
                    <small style={{ color: '#D4AF37' }}>
                      {priest.title} {priest.startYear && `- Since ${priest.startYear}`}
                    </small>
                  </div>
                </div>
                <Card.Body>
                  <p className="text-muted">{getBio(priest)}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};