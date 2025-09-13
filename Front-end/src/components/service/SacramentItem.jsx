import React from 'react';
import { Accordion, Row, Col, ListGroup, Button } from 'react-bootstrap';

export const SacramentItem = ({ sacrament, t }) => (
  <Accordion.Item eventKey={sacrament.id.toString()}>
    <Accordion.Header>
      <span className="fs-5 fw-semibold" style={{ color: '#223B7D' }}>
        {sacrament.title}
      </span>
    </Accordion.Header>
    <Accordion.Body>
      <Row className="align-items-center">
        <Col md={6}>
          <p className="text-muted">{sacrament.description}</p>
          <h5 className="fw-bold mt-4 mb-2" style={{ color: '#223B7D' }}>
            {t("requirements")}
          </h5>
          <ListGroup variant="flush" className="mb-3">
            {sacrament.requirements.map((req, idx) => (
              <ListGroup.Item key={idx} className="text-muted">
                {req}
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Button variant="primary">{sacrament.action}</Button>
        </Col>
        <Col md={6}>
          <div
            className="position-relative rounded overflow-hidden shadow-sm"
            style={{ minHeight: '240px', width: '100%' }}
          >
            <img
              src={`/${sacrament.image}`}
              alt={sacrament.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              className="rounded"
            />
          </div>
        </Col>
      </Row>
    </Accordion.Body>
  </Accordion.Item>
);
