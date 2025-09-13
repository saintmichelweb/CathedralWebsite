import React from "react";
import { Button, Container } from "react-bootstrap";
import GoogleMapCanvas from "./GoogleMapCanvas";

export const MapSection = ({ t }) => {
  return (
    <section style={{ paddingTop: "4rem", paddingBottom: "4rem", backgroundColor: "#F5F5F5" }}>
      <Container>
        <div className="text-center mb-5">
          <h2
            className="fw-bold"
            style={{ color: "#002F6C", fontFamily: "serif", fontSize: "2rem", marginBottom: "1rem" }}
          >
            {t("findUs")}
          </h2>
          <div
            style={{
              width: "80px",
              height: "4px",
              backgroundColor: "#D4AF37",
              margin: "0 auto 1rem",
              borderRadius: "2px",
            }}
          />
          <p className="text-muted mx-auto" style={{ maxWidth: "640px" }}>
            {t("visitUsDesc")}
          </p>
        </div>

        <div className="bg-white rounded shadow overflow-hidden">
          <div style={{ height: "400px", position: "relative" }}>
            <GoogleMapCanvas />
          </div>
          <div className="p-4 text-center">
            <p className="text-secondary mb-3">{t("mapDesc")}</p>
            {/* <Button
              style={{ backgroundColor: "#002F6C", borderColor: "#002F6C" }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#001F4C";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "#002F6C";
              }}
            >
              {t("getDirections")}
            </Button> */}
          </div>
        </div>
      </Container>
    </section>
  );
};
