import { Row, Col } from "react-bootstrap";
import { CommitteeMemberCard } from "./CommitteeMemberCard";

export const CommitteeMembersGrid = ({ members, t }) => {
  return (
    <Row xs={1} sm={2} md={3} lg={4} className="g-4">
      {members.map((member) => (
        <Col key={member.email}>
          <CommitteeMemberCard member={member} t={t} />
        </Col>
      ))}
    </Row>
  );
};
