import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export const OfficeServicePage = ({ service }) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  return (
    <section className="py-5 bg-light">
      <Container>
        <Row className="mb-4">
          <Col md={6}>
            <img
              src={service.BackgroundImage}
              alt={service.Title[currentLang] || service.Title.en}
              className="img-fluid rounded shadow-sm"
              style={{ maxHeight: '400px', objectFit: 'cover', width: '100%' }}
            />
          </Col>
          <Col md={6}>
            <h2 className="fw-bold mb-3" style={{ color: '#223B7D' }}>
              {service.Title[currentLang] || service.Title.en}
            </h2>
            <p className="text-muted">
              {service.Description[currentLang] || service.Description.en}
            </p>
            <ul className="list-unstyled">
              <li>
                <strong>{t('contact')}:</strong> {service.ContactPerson}
              </li>
              <li>
                <strong>{t('phone')}:</strong> {service.TelephoneNumber}
              </li>
              <li>
                <strong>{t('hours')}:</strong> {service.WorkDays}, {service.WorkHours}
              </li>
            </ul>
            <Button
              variant="primary"
              className="mt-3"
              style={{ backgroundColor: '#223B7D', border: 'none' }}
            >
              {service.Action?.[currentLang] || service.Action?.en || t("view")}
            </Button>
          </Col>
        </Row>

        <div className="text-center mt-4">
          <Link to="/services/parish-office">
            <Button variant="light" className="border" style={{ color: '#223B7D' }}>
              <i className="bi bi-chevron-left me-2"></i> {t("backToServices")}
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
};
