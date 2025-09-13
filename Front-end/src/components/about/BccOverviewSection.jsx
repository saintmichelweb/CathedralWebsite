import { Row, Col, Badge, Card } from "react-bootstrap";
import { FaUsers, FaMapMarkerAlt, FaPhone, FaUser } from "react-icons/fa";
import { BccCard } from "./BccCard";

export const BccOverviewSection = ({ communities = [], bccs = [], bccName = "" }) => {
  // Flatten all BCCs from all communities
  const allBccs = communities.reduce((acc, community) => {
    const communityBccs = bccs[community.name] || [];
    return [...acc, ...communityBccs.map(bcc => ({
      ...bcc,
      communityName: community.name
    }))];
  }, []);

  const totalFamilies = allBccs.reduce((sum, bcc) => sum + (bcc.families || 0), 0);

  return (
    <section className="py-5 bg-white">
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
            All {bccName}
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
            className="text-muted mx-auto mb-4"
            style={{ maxWidth: "800px", fontSize: "1rem", lineHeight: "1.6" }}
          >
            Explore all our {bccName} across different communities, each fostering spiritual growth and community unity.
          </p>
          
          {/* Statistics */}
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Badge 
              bg="primary" 
              className="px-4 py-3 rounded-pill"
              style={{ fontSize: "1rem" }}
            >
              {allBccs.length} Total {bccName}
            </Badge>
            <Badge 
              bg="warning" 
              className="px-4 py-3 rounded-pill text-dark"
              style={{ fontSize: "1rem" }}
            >
              {totalFamilies} Total Families
            </Badge>
            <Badge 
              bg="success" 
              className="px-4 py-3 rounded-pill"
              style={{ fontSize: "1rem" }}
            >
              {communities.length} Communities
            </Badge>
          </div>
        </div>

        {/* BCCs Grid */}
        <Row className="g-4 bcc-grid">
          {allBccs.length > 0 ? (
            allBccs.map((bcc, idx) => (
              <Col key={idx} xs={12} sm={6} lg={4} xl={3}>
                <div className="position-relative">
                  <BccCard bcc={bcc} index={idx} showExpandable={true} />
                  {/* Community Badge */}
                  <Badge 
                    bg="light" 
                    className="position-absolute top-0 end-0 m-2 text-dark border"
                    style={{ fontSize: "0.7rem" }}
                  >
                    {bcc.communityName}
                  </Badge>
                  
                  {/* Mpuza Badge if different from BCC name */}
                  {bcc.mpuzaName && bcc.mpuzaName !== bcc.name && (
                    <Badge 
                      bg="info" 
                      className="position-absolute top-0 start-0 m-2 text-white"
                      style={{ fontSize: "0.6rem" }}
                    >
                      {bcc.mpuzaName}
                    </Badge>
                  )}
                </div>
              </Col>
            ))
          ) : (
            <Col xs={12}>
              <Card className="text-center py-5 border-0 shadow-sm">
                <Card.Body>
                  <FaUsers size="4em" className="mb-3" style={{ color: "#D4AF37" }} />
                  <h4 className="text-muted">No {bccName} Available</h4>
                  <p className="text-muted mb-0">Check back later for updates.</p>
                </Card.Body>
              </Card>
            </Col>
          )}
        </Row>

        {/* Community Breakdown */}
        {communities.length > 0 && (
          <div className="mt-5">
            <h3 
              className="text-center mb-4 fw-bold"
              style={{ color: "#223B7D" }}
            >
              {bccName} by Community
            </h3>
            <Row className="g-4">
              {communities.map((community, index) => {
                const communityBccs = bccs[community.name] || [];
                const communityFamilies = communityBccs.reduce((sum, bcc) => sum + (bcc.families || 0), 0);
                
                return (
                  <Col key={index} xs={12} md={6} lg={4}>
                    <Card className="h-100 border-0 shadow-sm rounded-4">
                      <Card.Header 
                        className="text-white text-center py-3"
                        style={{ backgroundColor: "#223B7D" }}
                      >
                        <h5 className="fw-bold mb-0">{community.name}</h5>
                      </Card.Header>
                      <Card.Body className="p-4 text-center">
                        <div className="d-flex justify-content-center gap-3 mb-3">
                          <Badge bg="primary" className="px-3 py-2">
                            {communityBccs.length} {bccName}
                          </Badge>
                          <Badge bg="warning" className="px-3 py-2 text-dark">
                            {communityFamilies} Families
                          </Badge>
                        </div>
                        <p className="text-muted small mb-0">
                          {community.description}
                        </p>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </div>
        )}
      </div>
    </section>
  );
};
