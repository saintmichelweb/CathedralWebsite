import { Card, Row, Col } from "react-bootstrap";
import { Mail } from "lucide-react";
import { useState } from "react";

export const CommitteeMemberCard = ({ member, t }) => {
  const { name, positionKey, bioKey, image, email } = member;
  const [isHovered, setIsHovered] = useState(false);

  const imageSrc = typeof image === "string" ? `/${image}` : image;

  return (
    <Card className="shadow-sm rounded overflow-hidden h-100">
      <div style={{ height: 300, overflow: "hidden" }}>
        <Card.Img
          variant="top"
          src={imageSrc}
          alt={`Photo of ${name}`}
          style={{ objectFit: "cover", height: "100%", width: "100%" }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/images/placeholder-user.png";
          }}
        />
      </div>

      <Card.Body className="d-flex flex-column">
        <Card.Title className="fw-bold mb-1" style={{ color: "#002F6C" }}>
          {name}
        </Card.Title>
        <Card.Subtitle className="mb-3" style={{ color: "#D4AF37", fontWeight: 500 }}>
          {t(positionKey)}
        </Card.Subtitle>
        <p className="text-muted small mb-3">{t(bioKey)}</p>

        <Row className="align-items-center text-muted small mt-auto">
          <Col xs="auto">
            <Mail size={16} className="me-2" style={{ color: "#D4AF37" }} />
          </Col>
          <Col>
            <a
              href={`mailto:${email}`}
              className={`text-muted text-decoration-none ${isHovered ? "text-gold" : ""}`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onFocus={() => setIsHovered(true)}
              onBlur={() => setIsHovered(false)}
              style={{ transition: "color 0.2s" }}
              aria-label={`Send email to ${name}`}
            >
              {email}
            </a>
          </Col>
        </Row>
      </Card.Body>

      <style jsx>{`
        .text-gold {
          color: #d4af37 !important;
        }
      `}</style>
    </Card>
  );
};
