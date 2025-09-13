import { useTranslation } from "react-i18next";
import { Container, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

export const NavigationTabs = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const tabs = [
    { id: "overview", href: "/about", text: "overview" },
    { id: "chorals", href: "/about/our-chorals", text: "ourChorals" },
    { id: "actions", href: "/about/catholic-actions", text: "catholicActions" },
    { id: "community", href: "/about/community", text: "community" },
    { id: "parish-committee", href: "/about/parish-committee", text: "parishCommittee" },
  ];

  return (
    <section className="bg-light py-4">
      <Container>
        <Nav className="justify-content-center gap-2" variant="pills">
          {tabs.map((tab) => (
            <Nav.Item key={tab.id}>
              <Link
                to={tab.href}
                className={`nav-link ${
                  location.pathname === tab.href ? "active bg-primary text-white" : "bg-white text-primary"
                }`}
                style={{ borderRadius: "8px", padding: "8px 16px" }}
              >
                {t(tab.text)}
              </Link>
            </Nav.Item>
          ))}
        </Nav>
      </Container>
    </section>
  );
};
