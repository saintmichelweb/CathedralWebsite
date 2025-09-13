import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const ServicesListPage = ({ services }) => {
  const { i18n, t } = useTranslation();
  const lang = i18n.language;

  return (
    <section className="py-5 bg-light">
      <Container>
        <h2 className="text-center fw-bold mb-4" style={{ color: '#223B7D' }}>
          {t('ourServices')}
        </h2>
        <Row>
          {services.map((service) => (
            <Col key={service.Id} md={6} lg={4} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src={service.BackgroundImage}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <Card.Body>
                  <Card.Title className="fw-bold">
                    {service.Title[lang] || service.Title.en}
                  </Card.Title>
                  <Card.Text className="text-muted">
                    {(service.Description[lang] || service.Description.en).substring(0, 100)}...
                  </Card.Text>
                  <Link to={`/services/${service.Id}`}>
                    <Button variant="primary">{t('learnMore')}</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

