import React from 'react';
import { Container, Row, Col, Accordion } from 'react-bootstrap';
import { SacramentItem } from './SacramentItem'; 

export const SacramentsList = ({ sacraments, t }) => (
  <section className="py-5 bg-light">
    <Container>
      <div className="text-center mb-5">
        <h2
          className="display-5 fw-bold font-serif"
          style={{ color: '#223B7D' }}
        >
          {t("sevenSacraments")}
        </h2>
        <div className="w-25 h-1 bg-warning mx-auto my-3"></div>
        <p className="text-muted mx-auto" style={{ maxWidth: '600px' }}>
          {t("sevenSacramentsDesc")}
        </p>
      </div>
      <Row className="justify-content-center">
        <Col lg={10}>
          <Accordion defaultActiveKey="0" alwaysOpen>
            {sacraments.map((sacrament) => (
              <SacramentItem key={sacrament.id} sacrament={sacrament} t={t} />
            ))}
          </Accordion>
        </Col>
      </Row>
    </Container>
  </section>
);
