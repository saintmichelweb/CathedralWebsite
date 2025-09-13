import React from 'react';
import { Carousel, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const dbAnnouncements = [
  {
    id: 1,
    title_en: "Mass Schedule Update",
    title_fr: "Mise à jour de l'horaire des messes",
    title_rw: "Gahunda nshya ya Misa",
    description_en: "New Sunday mass times starting next week. Click for details.",
    description_fr: "Nouveaux horaires de la messe du dimanche à partir de la semaine prochaine. Cliquez pour plus de détails.",
    description_rw: "Igihe gishya cya misa yo ku cyumweru gitangira icyumweru gitaha. Kanda hano ubone ibisobanuro."
  },
  {
    id: 2,
    title_en: "Youth Retreat Registration",
    title_fr: "Inscription à la retraite des jeunes",
    title_rw: "Kwiyandikisha mu rugendo rw'urubyiruko",
    description_en: "Registrations for the youth spiritual retreat are now open. Limited spots available.",
    description_fr: "Les inscriptions pour la retraite spirituelle des jeunes sont ouvertes. Places limitées.",
    description_rw: "Kwiyandikisha mu rugendo rw'umwuka rw'urubyiruko biratangiye. Amahoro ni make."
  },
  {
    id: 3,
    title_en: "Choir Practice Schedule",
    title_fr: "Programme des répétitions de chorale",
    title_rw: "Gahunda y'imyitozo ya Korali",
    description_en: "All choir members are invited for practice every Wednesday at 6 PM in the main hall.",
    description_fr: "Tous les membres de la chorale sont invités à la répétition chaque mercredi à 18h dans la grande salle.",
    description_rw: "Abagize Korali bose barasabwa kwitabira imyitozo buri ku wa Gatatu saa kumi n'imwe z'umugoroba muri salle principale."
  }
];

export const BannerPage = ({ pageTitle, image, announcements = dbAnnouncements }) => {
  const { i18n } = useTranslation();
  const lang = i18n.language || 'rw';

  const localizedAnnouncements = announcements.map(item => ({
    id: item.id,
    title: item[`title_${lang}`] || item.title_rw,
    content: item[`description_${lang}`] || item.description_rw
  }));

  return (
    <section
      className="banner-page position-relative d-flex flex-column justify-content-center align-items-center text-center text-white"
      style={{
        backgroundImage: image ? `url(${image})` : 'linear-gradient(135deg, #223B7D 0%, #D4AF37 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '600px'
      }}
    >
      <div className="position-absolute w-100 h-100 top-0 start-0 bg-dark bg-opacity-50"></div>

      <Container className="position-relative py-5">
        <h1 className="display-3 fw-bold mb-4">{pageTitle}</h1>

        {/* <Carousel controls={false} indicators={false} interval={5000} fade pause="hover">
          {localizedAnnouncements.map(item => (
            <Carousel.Item key={item.id}>
              <div className="announcement-slide bg-opacity-75 p-4 rounded">
                <h5 className="fw-bold mb-2">{item.title}</h5>
                <p className="mb-0">{item.content}</p>
              </div>
            </Carousel.Item>
          ))}
        </Carousel> */}
      </Container>
    </section>
  );
};
