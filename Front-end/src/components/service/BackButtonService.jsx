import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

export const BackButtonService = ({ t }) => (
  <section className="py-4 bg-light">
    <Container>
      <div className="text-center">
        <Link to="/service" legacybehavior>
          <Button
            style={{ backgroundColor: '#223B7D', color: '#fff', border: 'none' }}
          >
            <i className="bi bi-chevron-left me-2"></i> {t("backToServices")}
          </Button>
        </Link>
      </div>
    </Container>
  </section>
);
