import React from 'react';

export const HeroSection = () =>{
  return (
    <section className="position-relative w-100" style={{ height: '500px' }}>
      <img
        src="/services-banner.jpg"
        alt="Services at Saint Michel Parish"
        className="img-fluid position-absolute w-100 h-100 object-fit-cover"
        style={{ filter: 'brightness(0.6)' }}
      />
      <div className="position-relative text-center text-white z-2 top-50 translate-middle-y">
        <h1 className="display-4 fw-bold">Our Services</h1>
        <div className="mx-auto bg-warning" style={{ width: '80px', height: '4px' }}></div>
      </div>
    </section>
  );
}

