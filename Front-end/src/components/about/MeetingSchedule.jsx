import { Button, Card, Container, Row, Col } from "react-bootstrap";
import { Calendar, Users } from "lucide-react";
import { useTranslation } from "react-i18next";

export const MeetingSchedule = () => {
    const { t, i18n } = useTranslation();

  return (
    <section className="py-5 bg-white">
      <Container>
        <Row className="justify-content-center mb-4">
          <Col md={8} lg={6} className="text-center">
            <h2 className="fw-bold text-primary font-serif" style={{ color: "#002F6C" }}>
              {t("committeeMeetings")}
            </h2>
            <div
              className="my-3 mx-auto"
              style={{ width: "80px", height: "4px", backgroundColor: "#D4AF37" }}
            ></div>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <Card className="shadow-lg border-0 mb-4">
              <Card.Body className="border-bottom">
                <div className="d-flex align-items-center mb-3">
                  <Calendar size={20} className="me-2" style={{ color: "#D4AF37" }} />
                  <h4 className="mb-0 fw-bold" style={{ color: "#002F6C" }}>
                    {t("regularMeetings")}
                  </h4>
                </div>
                <p className="text-secondary">{t("regularMeetingsDesc")}</p>
                <ul className="list-unstyled mt-3">
                  <li className="d-flex justify-content-between py-1 border-bottom">
                    <span>{t("generalAssembly")}</span>
                    <span className="fw-medium">{t("firstSundayMonth")}, 2:00 PM</span>
                  </li>
                  <li className="d-flex justify-content-between py-1 border-bottom">
                    <span>{t("executiveCommittee")}</span>
                    <span className="fw-medium">{t("everyTuesday")}, 7:00 PM</span>
                  </li>
                  <li className="d-flex justify-content-between py-1">
                    <span>{t("financeCommittee")}</span>
                    <span className="fw-medium">{t("secondThursday")}, 6:30 PM</span>
                  </li>
                </ul>
              </Card.Body>

              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  <Users size={20} className="me-2" style={{ color: "#D4AF37" }} />
                  <h4 className="mb-0 fw-bold" style={{ color: "#002F6C" }}>
                    {t("parishionerParticipation")}
                  </h4>
                </div>
                <p className="text-secondary mb-3">{t("parishionerParticipationDesc")}</p>
                <Button style={{ backgroundColor: "#002F6C", borderColor: "#002F6C" }}>
                  {t("contactCommittee")}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
