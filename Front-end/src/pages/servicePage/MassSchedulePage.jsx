import React from 'react';
import { Container } from 'react-bootstrap';
import { MassScheduleSection, AboutBanner, BackButtonService } from '../../components';
import { useTranslation } from 'react-i18next';
import image from '../../assets/images/_K4C9507.jpg'

export const MassSchedulePage = () => {
  const { t } = useTranslation();

  return (
    <>
      <AboutBanner
        titleKey="massScheduleTitle"
        descriptionKey="massScheduleDesc"
        backgroundImage={image}
      />

      <Container fluid className="p-0">
        <MassScheduleSection />
        <BackButtonService t={t} />
      </Container>
    </>
  );
};

