import React from 'react';
import { Carousel } from 'react-bootstrap';

export const HomeBanner = () => {
  const announcements = [
    {
      id: 1,
      title: "Mass Schedule Update",
      content: "New Sunday mass times starting next week. Click for details."
    },
    {
      id: 2,
      title: "Parish Festival",
      content: "Annual parish festival coming this August. Volunteers needed!"
    },
    {
      id: 3,
      title: "Baptism Preparation",
      content: "Next baptism preparation class starts September 1st."
    }
  ];

  return (
    <div className="parish-banner fluid-container w-100">
      {/* Main Title Section */}
      <div className="banner-header text-center py-4">
        <h1 className="display-4 mb-0">
          <span className="d-block">CATHÉDRALE</span>
          <span className="d-block">SAINT MICHEL</span>
        </h1>
      </div>

      {/* News Section */}
      <div className="banner-news bg-light p-4 mb-4">
        <h2 className="text-center mb-3">Top Parish News & Parish Notices</h2>
        <p className="text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec condimentum felis aliquet purus porta malesuada. 
          Pellentesque posuere, diam suscipit porta porttitor, nisi purus blandit nibh, ac vestibulum felis diam ac nunc.
        </p>
      </div>

      {/* Announcements Carousel */}
      <Carousel controls={false} indicators={false} interval={5000}>
        {announcements.map((item) => (
          <Carousel.Item key={item.id}>
            <div className="announcement-slide text-center py-3">
              <h5>{item.title}</h5>
              <p>{item.content}</p>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};
