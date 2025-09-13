import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export const IntroductionService = ({ t }) => (
  <section className="py-5 bg-white">
    <Container>
      <Row className="justify-content-center text-center">
        <Col lg={8}>
          <h2
            style={{ color: '#223B7D' }}
            className="display-5 fw-bold font-serif mb-3"
          >
            {t("sacramentsIntro")}
          </h2>
          <div className="w-25 h-1 bg-warning mx-auto mb-4"></div>
          <p className="text-muted">{t("sacramentsIntroDesc1")}</p>
          <p className="text-muted">{t("sacramentsIntroDesc2")}</p>
        </Col>
      </Row>
    </Container>
  </section>
);
