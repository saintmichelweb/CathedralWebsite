import { Card, Badge, Button, Collapse } from "react-bootstrap";
import { FaUsers, FaMapMarkerAlt, FaPhone, FaUser, FaChevronDown, FaChevronUp, FaCalendarAlt, FaClock, FaImage } from "react-icons/fa";
import { useState } from "react";
import { PlaceholderImage } from "../common/PlaceholderImage";

export const BccCard = ({ bcc, index, showExpandable = false }) => {
  const [expanded, setExpanded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <Card className="h-100 border-0 shadow-sm rounded-4 overflow-hidden hover-lift">
      <Card.Header 
        className="text-white text-center py-3"
        style={{ 
          backgroundColor: "#223B7D",
          border: "none"
        }}
      >
        <h6 className="fw-bold mb-0 text-truncate" title={bcc.name}>
          {bcc.name}
        </h6>
      </Card.Header>
      
      <Card.Body className="p-4 d-flex flex-column">
        {/* Leader Section */}
        <div className="text-center mb-3">
          {bcc.picture && !imageError ? (
            <div
              className="bg-light rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3 border overflow-hidden"
              style={{
                width: "60px",
                height: "60px",
                borderColor: "#D4AF37",
                borderWidth: "2px"
              }}
            >
              <img
                src={bcc.picture}
                alt={bcc.name}
                className="w-100 h-100 object-cover"
                onError={() => setImageError(true)}
                style={{ objectFit: 'cover' }}
              />
            </div>
          ) : (
            <PlaceholderImage 
              type="user" 
              size="60px" 
              className="mx-auto mb-3" 
              color="#D4AF37" 
            />
          )}
          <h6 className="fw-semibold mb-1" style={{ color: "#223B7D" }}>
            {bcc.leader}
          </h6>
          <Badge 
            bg="warning" 
            className="text-dark px-3 py-2 rounded-pill"
            style={{ fontSize: "0.75rem" }}
          >
            BCC Leader
          </Badge>
        </div>

        {/* Details Section */}
        <div className="mt-auto">
          <div className="d-flex align-items-center mb-2 text-muted small">
            <FaUsers className="text-warning me-2" style={{ width: "16px" }} />
            <span>{bcc.families} families</span>
          </div>
          
          {bcc.location && (
            <div className="d-flex align-items-center mb-2 text-muted small">
              <FaMapMarkerAlt className="text-warning me-2" style={{ width: "16px" }} />
              <span className="text-truncate" title={bcc.location}>
                {bcc.location}
              </span>
            </div>
          )}
          
          {bcc.mpuzaName && bcc.mpuzaName !== bcc.name && (
            <div className="d-flex align-items-center mb-2 text-muted small">
              <FaMapMarkerAlt className="text-warning me-2" style={{ width: "16px" }} />
              <span className="text-truncate" title={`Part of ${bcc.mpuzaName}`}>
                Part of {bcc.mpuzaName}
              </span>
            </div>
          )}
          
          {bcc.phone && (
            <div className="d-flex align-items-center text-muted small">
              <FaPhone className="text-warning me-2" style={{ width: "16px" }} />
              <span>{bcc.phone}</span>
            </div>
          )}

          {/* Expandable Section */}
          {showExpandable && (bcc.description || bcc.meetingDay || bcc.meetingTime) && (
            <>
              <Button
                variant="outline-primary"
                size="sm"
                className="w-100 mt-3 d-flex align-items-center justify-content-center"
                onClick={() => setExpanded(!expanded)}
                style={{
                  borderColor: "#223B7D",
                  color: "#223B7D",
                  fontSize: "0.8rem"
                }}
              >
                <span className="me-2">More Details</span>
                {expanded ? <FaChevronUp /> : <FaChevronDown />}
              </Button>
              
              <Collapse in={expanded}>
                <div className="mt-3 pt-3 border-top">
                  {bcc.description && (
                    <div className="mb-3">
                      <h6 className="small fw-semibold text-muted mb-2">Description</h6>
                      <p className="small text-muted mb-0">{bcc.description}</p>
                    </div>
                  )}
                  
                  {bcc.meetingDay && (
                    <div className="d-flex align-items-center mb-2 text-muted small">
                      <FaCalendarAlt className="text-warning me-2" style={{ width: "16px" }} />
                      <span>Meets: {bcc.meetingDay}</span>
                    </div>
                  )}
                  
                  {bcc.meetingTime && (
                    <div className="d-flex align-items-center text-muted small">
                      <FaClock className="text-warning me-2" style={{ width: "16px" }} />
                      <span>Time: {bcc.meetingTime}</span>
                    </div>
                  )}
                </div>
              </Collapse>
            </>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};
