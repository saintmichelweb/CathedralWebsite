import { useState, useRef } from "react";
import { Form, Button, Alert, Spinner } from "react-bootstrap";

export const ContactForm = ({ t }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validated, setValidated] = useState(false);

  const formRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
    setValidated(false);
    setIsSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form.checkValidity()) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    setValidated(true);
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setValidated(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    }, 1500);
  };

  return (
    <div className="bg-white rounded shadow p-4 border border-secondary-subtle mb-3">
      <h2 className="mb-4  fw-bold" style={{ color: "#002F6C", fontFamily: "serif", fontSize: "2rem", marginBottom: "1rem" }}>
        {t("sendMessage")}
      </h2>

      {isSubmitted ? (
        <Alert
          variant="success"
          className="text-center"
          aria-live="polite"
          aria-atomic="true"
        >
          <div
            className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle"
            style={{ width: "64px", height: "64px", backgroundColor: "#d1e7dd" }}
          >
            <svg
              className="text-success"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              width="32"
              height="32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="text-success mb-2">{t("messageSent")}</h3>
          <p>{t("messageSentDesc")}</p>
          <Button
            variant="primary"
            className="mt-3"
            onClick={handleReset}
            style={{ backgroundColor: "#002F6C", borderColor: "#002F6C" }}
          >
            {t("sendAnotherMessage")}
          </Button>
        </Alert>
      ) : (
        <Form noValidate validated={validated} onSubmit={handleSubmit} ref={formRef}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>{t("fullName")} *</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder={t("fullName")}
            />
            <Form.Control.Feedback type="invalid">
              {t("pleaseEnterName")}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="row">
            <Form.Group className="mb-3 col-md-6" controlId="email">
              <Form.Label>{t("emailAddress")} *</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder={t("emailAddress")}
              />
              <Form.Control.Feedback type="invalid">
                {t("pleaseEnterValidEmail")}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3 col-md-6" controlId="phone">
              <Form.Label>{t("phoneNumber")}</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder={t("phoneNumber")}
              />
            </Form.Group>
          </div>

          <Form.Group className="mb-3" controlId="subject">
            <Form.Label>{t("subject")} *</Form.Label>
            <Form.Select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            >
              <option value="">{t("selectSubject")}</option>
              <option value="general">{t("generalInquiry")}</option>
              <option value="mass">{t("massIntentions")}</option>
              <option value="sacraments">{t("sacraments")}</option>
              <option value="events">{t("parishEvents")}</option>
              <option value="volunteer">{t("volunteering")}</option>
              <option value="other">{t("other")}</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {t("pleaseSelectSubject")}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="message">
            <Form.Label>{t("message")} *</Form.Label>
            <Form.Control
              as="textarea"
              name="message"
              rows={6}
              value={formData.message}
              onChange={handleChange}
              required
              placeholder={t("message")}
              style={{ minHeight: "150px" }}
            />
            <Form.Control.Feedback type="invalid">
              {t("pleaseEnterMessage")}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex gap-2">
            <Button
              type="submit"
              className="flex-grow-1"
              style={{ backgroundColor: "#D4AF37", borderColor: "#D4AF37", color: "white" }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  {t("sending")}
                </>
              ) : (
                t("sendMessage")
              )}
            </Button>

            <Button
              type="button"
              variant="outline-secondary"
              onClick={handleReset}
              disabled={isSubmitting}
            >
              {t("clearForm")}
            </Button>
          </div>
        </Form>
      )}
    </div>
  );
};
