import React from 'react';
import { Container, Row, Col, Card, ListGroup, Button } from 'react-bootstrap';

export const PreparationClasses = ({ t }) => (
  <section className="py-5 bg-white">
    <Container>
      <Row className="justify-content-center">
        <Col lg={8}>
          <h2
            style={{ color: '#223B7D' }}
            className="display-5 fw-bold font-serif text-center"
          >
            {t("sacramentalPreparation")}
          </h2>
          <div className="w-25 h-1 bg-warning mx-auto my-3"></div>
          <p className="text-muted text-center mb-4">{t("sacramentalPreparationDesc")}</p>

          <Card className="bg-light mb-5">
            <Card.Body>
              <h4 style={{ color: '#223B7D' }} className="fw-bold mb-4">
                {t("upcomingClasses")}
              </h4>
              <ListGroup variant="flush">
                {[
                  {
                    title: t("baptismPrep"),
                    time: `${t("firstSaturdayMonth")}, 10:00 AM - 12:00 PM`,
                    desc: t("baptismPrepDesc"),
                  },
                  {
                    title: t("firstCommunionPrep"),
                    time: `${t("sundaysAfterMass")}, 12:00 PM - 1:30 PM`,
                    desc: t("firstCommunionPrepDesc"),
                  },
                  {
                    title: t("confirmationPrep"),
                    time: `${t("wednesdayEvenings")}, 6:30 PM - 8:00 PM`,
                    desc: t("confirmationPrepDesc"),
                  },
                  {
                    title: t("marriagePrep"),
                    time: t("byAppointment"),
                    desc: t("marriagePrepDesc"),
                  },
                ].map((cls, idx) => (
                  <ListGroup.Item key={idx} className="mb-3 pb-3 border-bottom">
                    <h5 style={{ color: '#223B7D' }} className="fw-bold">
                      {cls.title}
                    </h5>
                    <p className="text-muted">{cls.time}</p>
                    <p className="text-muted small">{cls.desc}</p>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>

          <div className="text-center">
            <p className="text-muted mb-3">{t("sacramentalPrepContact")}</p>
            <Button style={{ backgroundColor: '#223B7D', color: '#fff', border: 'none' }}>
                {t("contactReligiousEd")}
            </Button>
         </div>

        </Col>
      </Row>
    </Container>
  </section>
);
