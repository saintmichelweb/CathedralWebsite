import React, { useState } from "react";
import { Container, Row, Col, Card, Image, Button } from "react-bootstrap";
import { Calendar, Users, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";

export const CatholicActionGroups = ({ groups }) => {
  const { t } = useTranslation();

  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 5;

  // Calculate pagination values
  const totalPages = Math.ceil(groups.length / cardsPerPage);
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentGroups = groups.slice(indexOfFirstCard, indexOfLastCard);

  return (
    <section style={{ backgroundColor: "#F5F5F5", padding: "4rem 0" }}>
      <Container>
        <div className="text-center mb-5">
          <h2
            className="text-3xl fw-bold mb-3"
            style={{ color: "#223B7D", fontFamily: "serif" }}
          >
            {t("ourCatholicActionGroups")}
          </h2>
          <div
            className="mx-auto mb-3"
            style={{ width: "80px", height: "4px", backgroundColor: "#D4AF37" }}
          ></div>
          <p className="text-muted mx-auto" style={{ maxWidth: "700px" }}>
            {t("ourCatholicActionGroupsDesc")}
          </p>
        </div>

        {/* Render only the groups for current page */}
        {currentGroups.map((group, index) => (
          <Card className="mb-4 shadow-sm border-0" key={index}>
            <Row className="g-0">
              {group.logo && (
                <Col md={4}>
                  <div style={{ height: "250px", overflow: "hidden" }}>
                    <Image
                      src={group.logo}
                      alt={group.name}
                      fluid
                      style={{ height: "100%", width: "100%", objectFit: "cover" }}
                    />
                  </div>
                </Col>
              )}

              <Col md={group.logo ? 8 : 12}>
                <Card.Body
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Card.Title className="fw-bold" style={{ color: "#223B7D" }}>
                    {group.name}
                  </Card.Title>
                  <Card.Text className="text-muted">{group.description}</Card.Text>
                  <div className="mb-2 text-secondary small">
                    <div className="d-flex align-items-center mb-1">
                      <Calendar size={16} color="#D4AF37" className="me-2" />
                      Meeting: {group.meeting}
                    </div>
                    <div className="d-flex align-items-center mb-1">
                      <Users size={16} color="#D4AF37" className="me-2" />
                      Leader: {group.leader}
                    </div>
                    <div className="d-flex align-items-center">
                      <Phone size={16} color="#D4AF37" className="me-2" />
                      Phone: {group.phone}
                    </div>
                  </div>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        ))}

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="d-flex justify-content-center my-4">
            <Button
              variant="primary"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="me-2"
            >
              Previous
            </Button>
            <div className="align-self-center" style={{ lineHeight: "38px" }}>
              Page {currentPage} of {totalPages}
            </div>
            <Button
              variant="primary"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="ms-2"
            >
              Next
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
};
