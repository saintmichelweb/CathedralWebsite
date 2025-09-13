import React from 'react';
import { Container, Row, Col, Accordion, Card, Button, ListGroup } from 'react-bootstrap';
// import Image from 'next/image';
// import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { IntroductionService, SacramentsList, PreparationClasses, BackButtonService } from '../../components';





export const SacramentsPage = () => {
    const { t } = useTranslation();
  
    const sacraments = [
      {
        id: "baptism",
        title: t("baptism"),
        description: t("baptismDesc"),
        requirements: [t("baptismReq1"), t("baptismReq2"), t("baptismReq3")],
        image: "baptism.jpg",
        action: t("requestBaptism"),
      },
      {
        id: "eucharist",
        title: t("firstHolyCommunion"),
        description: t("firstHolyCommunionDesc"),
        requirements: [t("firstHolyCommunionReq1"), t("firstHolyCommunionReq2"), t("firstHolyCommunionReq3")],
        image: "communion.jpeg",
        action: t("learnMore"),
      },
      {
        id: "confirmation",
        title: t("confirmation"),
        description: t("confirmationDesc"),
        requirements: [t("confirmationReq1"), t("confirmationReq2"), t("confirmationReq3"), t("confirmationReq4")],
        image: "confirmation_2024.jpg",
        action: t("registerForConfirmation"),
      },
      {
        id: "reconciliation",
        title: t("reconciliation"),
        description: t("reconciliationDesc"),
        requirements: [t("reconciliationReq1"), t("reconciliationReq2")],
        image: "penitence.jpg",
        action: t("confessionSchedule"),
      },
      {
        id: "marriage",
        title: t("marriage"),
        description: t("marriageDesc"),
        requirements: [t("marriageReq1"), t("marriageReq2"), t("marriageReq3"), t("marriageReq4")],
        image: "mariage-bénédiction.jpg",
        action: t("weddingInquiry"),
      },
      {
        id: "anointing",
        title: t("anointingOfSick"),
        description: t("anointingOfSickDesc"),
        requirements: [t("anointingOfSickReq1"), t("anointingOfSickReq2")],
        image: "Anointing.jpg",
        action: t("requestAnointing"),
      },
      {
        id: "holyorders",
        title: t("holyOrders"),
        description: t("holyOrdersDesc"),
        requirements: [t("holyOrdersReq1"), t("holyOrdersReq2"), t("holyOrdersReq3")],
        image: "holy-orders1.jpg",
        action: t("vocationInquiry"),
      },
    ];
  
    return (
      <div className="d-flex flex-column min-vh-100">
        {/* <HeroSection title={t("sacraments")} imageUrl="/_K4C9590.jpg?height=300&width=1200&text=Sacraments" /> */}
        {/* <ServicesNavigation t={t} /> */}
        <IntroductionService t={t} />
        <SacramentsList sacraments={sacraments} t={t} />
        <PreparationClasses t={t} />
        <BackButtonService t={t} />
      </div>
    );
  }