import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Image from '../../assets/images/_K4C9496.jpg';
import { useTranslation } from 'react-i18next';

export const AboutParishSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-5 bg-white">
      <Container>
        <Row className="align-items-center g-5">
          <Col md={6}>
            <div style={{ position: 'relative', height: '400px', borderRadius: '12px', overflow: 'hidden' }}>
              <img
                src={Image}
                alt="About Saint Michel Parish"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '12px',
                }}
              />
            </div>
          </Col>

          <Col md={6}>
            <h2 className="fs-2 fw-bold mb-3" style={{ color: '#002F6C', fontFamily: 'serif' }}>
              {t("aboutParish")}
            </h2>
            <div style={{ width: '80px', height: '4px', backgroundColor: '#D4AF37', marginBottom: '1.5rem' }}></div>
            <p className="text-muted mb-4">{t("aboutParishDesc1")}</p>
            <p className="text-muted mb-4">{t("aboutParishDesc2")}</p>
            <Button
              style={{ backgroundColor: '#002F6C', borderColor: '#002F6C' }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#001F4C')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#002F6C')}
            >
              {t("learnMore")}
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
