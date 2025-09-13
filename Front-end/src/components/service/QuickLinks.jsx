import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const QuickLinks = () => {
  const { t } = useTranslation();

  const links = [
    {
      path: '/services/mass-schedule',
      title: t('quickLinks.massSchedule'),
      desc: t('quickLinks.massScheduleDesc'),
    },
    {
      path: '/services/sacraments',
      title: t('quickLinks.sacraments'),
      desc: t('quickLinks.sacramentsDesc'),
    },
    {
      path: '/services/parish-office',
      title: t('quickLinks.parishOffice'),
      desc: t('quickLinks.parishOfficeDesc'),
    }
  ];

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-6 fw-bold" style={{ color: '#223B7D' }}>
            {t('quickLinks.title')}
          </h2>
          <div className="mx-auto bg-warning" style={{ width: '80px', height: '4px' }}></div>
        </div>
        <div className="row g-4 justify-content-center">
          {links.map(link => (
            <div key={link.path} className="col-md-4">
              <Link
                to={link.path}
                className="card text-decoration-none h-100 shadow-sm p-4 text-center"
                style={{ transition: 'box-shadow 0.3s ease' }}
              >
                <h5 className="fw-bold mb-2" style={{ color: '#223B7D' }}>
                  {link.title}
                </h5>
                <p className="text-muted">{link.desc}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
