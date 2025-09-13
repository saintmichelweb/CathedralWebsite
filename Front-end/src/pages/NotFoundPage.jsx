import React from "react";
import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  React.useEffect(() => {
    document.title = "404 - Page Not Found";
  }, []);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light">
      <div className="text-center p-5 bg-white rounded shadow-sm" style={{ maxWidth: "600px" }}>
        <h1 className="text-danger display-3 fw-bold mb-4">404</h1>
        <h2 className="mb-4">Page Not Found</h2>
        <p className="lead text-muted mb-4">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="d-flex gap-3 justify-content-center">
          <Link to="/" className="btn btn-primary px-4 py-2">
            Return Home
          </Link>
          <button 
            onClick={() => window.history.back()} 
            className="btn btn-outline-secondary px-4 py-2"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};