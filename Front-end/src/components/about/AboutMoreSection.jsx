import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import K4C9558 from '../../assets/images/_K4C9558.jpg';
import K4C9496 from '../../assets/images/_K4C9496.jpg';
import K4C9517 from '../../assets/images/_K4C9517.jpg';
import K4C9703 from '../../assets/images/_K4C9703.jpg';


export const AboutMoreSection = () => {
  const { t } = useTranslation();

  const sections = [
    {
      title: t("ourChorals"),
      description: t("choralsDesc"),
      image: K4C9558,
      link: "/about/our-chorals"
    },
    {
      title: t("catholicActions"),
      description: t("catholicActionsDesc"),
      image: K4C9496,
      link: "/about/catholic-actions"
    },
    {
      title: t("community"),
      description: t("communityAboutDesc"),
      image: K4C9517,
      link: "/about/community"
    },
    {
      title: t("parishCommittee"),
      description: t("parishCommitteeAboutDesc"),
      image: K4C9703,
      link: "/about/parish-committee"
    }
  ];

  return (
    <section style={{ backgroundColor: "#F5F5F5", padding: "4rem 0" }}>
      <Container>
        <div className="text-center mb-5">
          <h2 style={{ color: "#002F6C", fontFamily: "serif", fontWeight: "bold" }}>
            {t("exploreMoreAbout")}
          </h2>
          <div style={{
            width: "80px",
            height: "4px",
            backgroundColor: "#D4AF37",
            margin: "1rem auto"
          }} />
          <p className="text-muted mx-auto" style={{ maxWidth: "600px" }}>
            {t("exploreMoreDesc")}
          </p>
        </div>

        <Row className="g-4">
          {sections.map((item, index) => (
            <Col key={index} md={6} lg={3}>
              <Card className="h-100 shadow-sm border-0">
                <div style={{ height: "200px", overflow: "hidden" }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <Card.Body>
                  <Card.Title style={{ color: "#002F6C", fontWeight: "bold" }}>
                    {item.title}
                  </Card.Title>
                  <Card.Text className="text-muted">
                    {item.description}
                  </Card.Text>
                  <a href={item.link} style={{ textDecoration: 'none' }}>
                    <Button
                      variant="primary"
                      style={{ backgroundColor: "#002F6C", borderColor: "#002F6C" }}
                      className="w-100 d-flex align-items-center justify-content-center"
                    >
                      {t("learnMore")} <ChevronRight size={16} className="ms-2" />
                    </Button>
                  </a>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};
