import React from "react";
import { Accordion } from "../generalComponents/Accordion";

export const ServiceParticipation: React.FC = () => {
  const serviceParticipationItems = [
    {
      title: "Volunteer Opportunities",
      content: (
        <ul className="list-disc list-inside space-y-1">
          <li>Assist with parish events and fundraising.</li>
          <li>Join the food pantry team to help distribute meals.</li>
          <li>Support youth programs by mentoring or coaching.</li>
          <li>Help maintain parish grounds and facilities.</li>
        </ul>
      ),
    },
    {
      title: "Religious Education",
      content: (
        <p>
          Religious education programs provide opportunities for children and
          adults to grow in their faith, understand Church teachings, and
          prepare for sacraments.
        </p>
      ),
    },
    {
      title: "Youth Ministry",
      content: (
        <p>
          Engage with our vibrant youth community through events, retreats, and
          leadership training designed to inspire and support young people in
          their faith journey.
        </p>
      ),
    },
    {
      title: "Adult Formation",
      content: (
        <p>
          Programs for adults include Bible studies, small faith-sharing groups,
          and workshops to deepen your spiritual understanding and personal
          growth.
        </p>
      ),
    },
    {
      title: "Social Services",
      content: (
        <p>
          Participate in outreach initiatives like housing support, job training
          programs, and advocacy for the marginalized.
        </p>
      ),
    },
    {
      title: "Community Building",
      content: (
        <p>
          Join our efforts to foster a welcoming and inclusive parish through
          social gatherings, family activities, and interfaith dialogues.
        </p>
      ),
    },
    {
      title: "Liturgical Ministries",
      content: (
        <p>
          Serve during Mass as a lector, Eucharistic minister, choir member, or
          altar server to enhance our communal worship experience.
        </p>
      ),
    },
  ];

  const sacramentalPreparationItems = [
    {
      title: "Baptisms",
      content: (
        <p>
          Prepare for this sacred sacrament by attending our baptismal
          preparation sessions, designed for parents and godparents.
        </p>
      ),
    },
    {
      title: "First Communions",
      content: (
        <p>
          Children prepare to receive the Eucharist for the first time through
          engaging catechism classes and special celebrations.
        </p>
      ),
    },
    {
      title: "Confirmations",
      content: (
        <p>
          Our confirmation program helps young people and adults strengthen
          their faith and commitment to the Church through catechesis and
          spiritual formation.
        </p>
      ),
    },
    {
      title: "Weddings",
      content: (
        <p>
          Couples are guided through pre-marital counseling and preparation
          sessions to ensure a sacramental and joyous wedding day.
        </p>
      ),
    },
  ];

  return (
    <div className="w-full mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold text-blue-900 mb-4">
        Service Participation and Engagement
      </h2>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Accordion items={serviceParticipationItems} />
      </div>
      <h2 className="text-2xl font-bold text-blue-900 mt-8 mb-4">
        Sacramental Preparation
      </h2>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Accordion items={sacramentalPreparationItems} />
      </div>
    </div>
  );
};
