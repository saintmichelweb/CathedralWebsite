import { Card, Button, Tabs, Tab, Row, Col, Collapse } from "react-bootstrap";
import { FaUsers, FaChevronRight, FaChevronDown } from "react-icons/fa";
import { useState } from "react";
import { BccCard } from "./BccCard";

export const CommunityCard = ({ community, bccs, bccName }) => {
  const bccCount = bccs[community.name]?.length || 0;
  const [showBccs, setShowBccs] = useState(false);

  return (
    <Card className="shadow-sm h-100 border-0 rounded-4 community-card">
      <Card.Body className="d-flex flex-column justify-content-between p-4">
        <div>
          <Card.Title className="h4 fw-bold mb-3" style={{ color: "#223B7D" }}>
            {community.name}
          </Card.Title>

          <Card.Text className="text-muted mb-4" style={{ fontSize: "0.95rem" }}>
            {community.description}
          </Card.Text>

          <div className="text-muted small mb-4">
            <div className="d-flex align-items-center mb-2">
              <FaUsers className="text-warning me-2" />
              <span>
                {bccCount} {bccName} • {community.families} Families
              </span>
            </div>
          </div>

          {/* BCCs Section */}
          {bccCount > 0 && (
            <div className="mb-3">
              <Button
                variant="outline-primary"
                size="sm"
                className="w-100 d-flex align-items-center justify-content-between"
                onClick={() => setShowBccs(!showBccs)}
                style={{
                  borderColor: "#223B7D",
                  color: "#223B7D",
                  fontSize: "0.9rem"
                }}
              >
                <span>View {bccName}</span>
                {showBccs ? <FaChevronDown /> : <FaChevronRight />}
              </Button>
              
              <Collapse in={showBccs}>
                <div className="mt-3">
                  <Row className="g-3 bcc-grid">
                    {bccs[community.name]?.map((bcc, index) => (
                      <Col key={index} xs={12} sm={6} lg={4}>
                        <BccCard bcc={bcc} index={index} />
                      </Col>
                    ))}
                  </Row>
                </div>
              </Collapse>
            </div>
          )}
        </div>

        {/* <div className="d-flex justify-content-end">
          <Button
            variant="outline-primary"
            className="d-flex align-items-center rounded-pill px-4 py-2 fw-semibold"
          >
            View Details <FaChevronRight className="ms-2" />
          </Button>
        </div> */}
      </Card.Body>
    </Card>
  );
};
