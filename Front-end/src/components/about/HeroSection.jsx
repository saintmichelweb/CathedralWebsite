import { useTranslation } from "react-i18next";
import { Container, Row, Col } from "react-bootstrap";

export const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section
      className="position-relative d-flex align-items-center justify-content-center text-center text-white"
      style={{ height: "600px", overflow: "hidden" }}
    >
      {/* Background Image */}
      <img
        src="/_K4C9703.jpg?height=300&width=1200&text=Parish+Committee+Council"
        alt={t("parishCommitteeCouncil")}
        className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
        style={{ objectFit: "cover", filter: "brightness(0.7)", zIndex: 0 }}
      />

      {/* Overlay Content */}
      <Container className="position-relative z-1">
        <Row className="justify-content-center">
          <Col md="auto">
            <h1 className="display-4 fw-bold text-white font-serif mb-3">
              {t("parishCommitteeCouncil")}
            </h1>
            <div
              className="mx-auto"
              style={{ width: "80px", height: "4px", backgroundColor: "#D4AF37" }}
            ></div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
