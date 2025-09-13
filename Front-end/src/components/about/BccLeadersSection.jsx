import { Tabs, Tab, Row, Col, Badge } from "react-bootstrap";
import { FaUsers, FaMapMarkerAlt, FaPhone, FaUser } from "react-icons/fa";
import { BccCard } from "./BccCard";

export const BccLeadersSection = ({ communities = [], bccs = [], bccName = "" }) => {
  const defaultKey =
    communities.length > 0
      ? communities[0].name.toLowerCase().replace(/\s+/g, "-")
      : "default";

  return (
    <section id="bcc-leaders" className="py-5 bg-light">
      <div className="container px-4 px-sm-5">
        {/* Section Header */}
        <div className="text-center mb-5">
          <h2
            className="display-5 fw-bold font-serif mb-3"
            style={{
              color: "#223B7D",
              letterSpacing: "0.5px",
              fontFamily: "'Merriweather', serif",
            }}
          >
            Our {bccName} Leaders
          </h2>
          <div
            className="mx-auto mb-3"
            style={{
              width: "80px",
              height: "4px",
              backgroundColor: "#D4AF37",
              borderRadius: "2px",
            }}
          ></div>
          <p
            className="text-muted mx-auto"
            style={{ maxWidth: "800px", fontSize: "1rem", lineHeight: "1.6" }}
          >
            Meet the passionate individuals who lead our {bccName}, fostering unity and
            spiritual growth within our community.
          </p>
        </div>

        {/* Tabs Section */}
        <div className="mx-auto" style={{ maxWidth: "1200px" }}>
          <Tabs
            defaultActiveKey={defaultKey}
            id="bcc-leader-tabs"
            className="mb-4 justify-content-center"
            fill
          >
            {communities.map((community) => {
              const key = community.name.toLowerCase().replace(/\s+/g, "-");
              const leaders = bccs[community.name] || [];

              return (
                <Tab
                  key={key}
                  eventKey={key}
                  title={community.name.replace(" Community", "")}
                >
                  {/* Community Title */}
                  <h3
                    className="h4 fw-bold text-center mb-4"
                    style={{
                      color: "#223B7D",
                      fontFamily: "'Merriweather', serif",
                    }}
                  >
                    {community.name} {bccName}
                  </h3>

                  {/* Community Stats */}
                  <div className="text-center mb-4">
                    <Badge 
                      bg="primary" 
                      className="px-3 py-2 rounded-pill me-2"
                      style={{ fontSize: "0.9rem" }}
                    >
                      {leaders.length} {bccName}
                    </Badge>
                    <Badge 
                      bg="warning" 
                      className="px-3 py-2 rounded-pill text-dark"
                      style={{ fontSize: "0.9rem" }}
                    >
                      {leaders.reduce((sum, bcc) => sum + (bcc.families || 0), 0)} Total Families
                    </Badge>
                  </div>

                  {/* BCC Cards */}
                  <Row className="g-4 bcc-grid">
                    {leaders.length > 0 ? (
                      leaders.map((bcc, idx) => (
                        <Col key={idx} xs={12} sm={6} lg={4} xl={3}>
                          <BccCard bcc={bcc} index={idx} showExpandable={true} />
                        </Col>
                      ))
                    ) : (
                      <Col xs={12}>
                        <div className="text-center text-muted py-5">
                          <FaUsers size="3em" className="mb-3" style={{ color: "#D4AF37" }} />
                          <h5>No {bccName} listed for this community yet.</h5>
                          <p className="mb-0">Check back later for updates.</p>
                        </div>
                      </Col>
                    )}
                  </Row>
                </Tab>
              );
            })}
          </Tabs>
        </div>
      </div>
    </section>
  );
};
