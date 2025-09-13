import { Button } from "react-bootstrap";
import { FaChevronLeft } from "react-icons/fa";

export const BackToAboutSection = ({ navigate }) => (
  <section className="py-4 bg-white">
    <div className="container px-4 px-sm-5">
      <div className="d-flex justify-content-center">
        <Button
          style={{
            color: "#223B7D",
            borderColor: "#223B7D",
            fontWeight: 500,
          }}
          variant="outline-primary" // ✅ use a valid variant
          className="d-flex align-items-center rounded-pill px-4 py-2 shadow-sm"
          onClick={() => navigate("/about")}
          aria-label="Back to About"
        >
          <FaChevronLeft className="me-2" />
          Back to About
        </Button>
      </div>
    </div>
  </section>
);
