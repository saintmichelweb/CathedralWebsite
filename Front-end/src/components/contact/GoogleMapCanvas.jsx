import React from 'react';

const GoogleMapCanvas = () => {
  return (
    <iframe
      title="Parish Location Map"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4890.925994507414!2d30.060172974967017!3d-1.9505406980317685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca428834a1bed%3A0x6ad695b6f9926aab!2sSt.%20Michael%20Cathedral!5e1!3m2!1sen!2srw!4v1743179974630!5m2!1sen!2srw"
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  );
};

export default GoogleMapCanvas;
