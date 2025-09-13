import React from 'react';
import { Clock } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


export const ServiceCard = ({ service }) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  return (
    <div className="card h-100 shadow-sm">
      <img
        src={service.BackgroundImage}
        className="card-img-top"
        alt={service.Title[currentLang] || service.Title.en}
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <div className="card-body">
        <h5 className="card-title fw-bold" style={{ color: '#223B7D' }}>
          {service.Title[currentLang] || service.Title.en}
        </h5>

        {/* <h5 className="card-title fw-bold title-color">
          {service.Title[currentLang] || service.Title.en}
        </h5> */}

        <p className="card-text text-muted">
          {service.Description[currentLang] || service.Description.en}
        </p>
        <ul className="list-unstyled small mb-3">
          <li>
            <Clock className="text-warning me-2" />
            <strong>{t('contact')}:</strong> {service.ContactPerson}
          </li>
          <li>
            <Clock className="text-warning me-2" />
            <strong>{t('phone')}:</strong> {service.TelephoneNumber}
          </li>
          <li>
            <Clock className="text-warning me-2" />
            <strong>{t('hours')}:</strong> {service.WorkDays}, {service.WorkHours}
          </li>
        </ul>
        <Link
          to={`/services/parish-office/${service.Id}`}
          className="btn w-100"
          style={{ backgroundColor: '#223B7D', color: '#fff', border: 'none' }}
        >
          {service.Action?.[currentLang] || service.Action?.en || t('view')}
        </Link>
      </div>
    </div>
  );
};
