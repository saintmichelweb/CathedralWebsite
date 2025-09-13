import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Envelope,
  Telephone,
  GeoAlt,
  Clock,
} from "react-bootstrap-icons";

export const ContactInfo = ({ t }) => {
  return (
    <div className="container py-5">
      {/* Title */}
      <h2
        className="h3 fw-bold mb-4 font-serif text-center text-md-start"
        style={{ color: "#223B7D" }}
      >
        {t("getInTouch")}
      </h2>

      <div className="row gx-5">
        {/* Left column: Contact Details */}
        <div className="col-12 col-md-7 mb-5 mb-md-0">
          {[{
            Icon: GeoAlt,
            titleKey: "address",
            lines: ["KN 67 St", "Kigali, Rwanda"],
          },{
            Icon: Telephone,
            titleKey: "phone",
            lines: ["+250 788 300 646"],
          },{
            Icon: Envelope,
            titleKey: "email",
            lines: ["info@saintmichel.rw"],
          },{
            Icon: Clock,
            titleKey: "officeHours",
            lines: [
              `${t("tuesdayToSunday")}: 9:00 AM - 5:00 PM`,
              `${t("saturday")}: 9:00 AM - 12:00 PM`,
              `${t("monday")}: ${t("closed")}`,
            ],
          }].map(({ Icon, titleKey, lines }) => (
            <div key={titleKey} className="d-flex align-items-start mb-4">
              <Icon
                size={28}
                className="text-warning flex-shrink-0 me-3 mt-1"
                aria-hidden="true"
              />
              <div>
                <h5
                  className="mb-2"
                  style={{ color: "#223B7D", fontWeight: "600" }}
                >
                  {t(titleKey)}
                </h5>
                {lines.map((line, idx) => (
                  <p key={idx} className="mb-1 text-secondary">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Right column: Description + Social Media */}
        <div className="col-12 col-md-5">
          {/* Description */}
          <p className="text-muted mb-4">{t("contactDesc")}</p>

          {/* Social Media */}
          <h5
            className="mb-3"
            style={{ color: "#223B7D", fontWeight: "600" }}
          >
            {t("connectWithUs")}
          </h5>
          <div className="d-flex gap-3 flex-wrap" >
            {[
              { href: "#", Icon: Facebook, label: "Facebook" },
              { href: "#", Icon: Instagram, label: "Instagram" },
              { href: "#", Icon: Twitter, label: "Twitter" },
              { href: "#", Icon: Youtube, label: "YouTube" },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                className="btn rounded-circle d-flex align-items-center justify-content-center p-2"
                aria-label={label}
                style={{ width: "40px", height: "40px",color: "#002F6C", }}
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
