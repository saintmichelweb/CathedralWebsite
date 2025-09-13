import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export const ServiceOfficeCard = ({ service }) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  return (
    <Card className="h-100 shadow-sm">
      <Card.Img
        variant="top"
        src={service.BackgroundImage}
        alt={service.Title[currentLang] || service.Title.en}
        style={{ height: '180px', objectFit: 'cover' }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title style={{ color: '#223B7D' }}>
          {service.Title[currentLang] || service.Title.en}
        </Card.Title>
        <Card.Text className="text-muted flex-grow-1">
          {service.Description[currentLang]?.slice(0, 100) + '...'}
        </Card.Text>
        <Link to={`/services/parish-office/${service.Id}`} className="mt-auto">
          <Button
            variant="primary"
            style={{ backgroundColor: '#223B7D', border: 'none' }}
          >
            {service.Action?.[currentLang] || service.Action?.en || t('view')}
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};
