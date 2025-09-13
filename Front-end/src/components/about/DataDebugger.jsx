import { Card, Badge } from "react-bootstrap";

export const DataDebugger = ({ communities, bccs }) => {
  if (process.env.NODE_ENV === 'production') return null;
  
  return (
    <div className="mt-4 p-3 bg-light rounded">
      <h6 className="text-muted mb-3">🔍 Data Debug Info (Development Only)</h6>
      
      <div className="row">
        <div className="col-md-6">
          <Card className="mb-3">
            <Card.Header className="py-2">
              <small className="fw-bold">Communities ({communities.length})</small>
            </Card.Header>
            <Card.Body className="py-2">
              {communities.map((c, idx) => (
                <div key={idx} className="small mb-1">
                  <Badge bg="primary" className="me-2">{c.name}</Badge>
                  <span className="text-muted">{c.families} families</span>
                </div>
              ))}
            </Card.Body>
          </Card>
        </div>
        
        <div className="col-md-6">
          <Card className="mb-3">
            <Card.Header className="py-2">
              <small className="fw-bold">BCCs by Community</small>
            </Card.Header>
            <Card.Body className="py-2">
              {Object.entries(bccs).map(([communityName, bccList]) => (
                <div key={communityName} className="mb-2">
                  <div className="small fw-semibold text-primary">{communityName}</div>
                  {bccList.map((bcc, idx) => (
                    <div key={idx} className="small ms-2 text-muted">
                      • {bcc.name} ({bcc.leader})
                      {bcc.mpuzaName && bcc.mpuzaName !== bcc.name && (
                        <Badge bg="info" className="ms-1" style={{ fontSize: "0.6rem" }}>
                          {bcc.mpuzaName}
                        </Badge>
                      )}
                      {bcc.picture ? (
                        <Badge bg="success" className="ms-1" style={{ fontSize: "0.5rem" }}>
                          Has Image
                        </Badge>
                      ) : (
                        <Badge bg="warning" className="ms-1" style={{ fontSize: "0.5rem" }}>
                          No Image
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};
