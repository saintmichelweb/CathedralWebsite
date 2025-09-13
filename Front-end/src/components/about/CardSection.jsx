import React, { useState } from 'react';

export const CardSection = ({ data }) => {
  const [language, setLanguage] = useState('rw'); 

  const getDescription = (item) => {
    switch (language) {
      case 'fr': return item.description_fr;
      case 'en': return item.description_en;
      default: return item.description_rw;
    }
  };

  return (
    <div className="container my-4">
      {/* Language Selector */}
      <div className="mb-4 text-end">
        <select
          className="form-select w-auto d-inline-block"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="en">English</option>
          <option value="fr">Français</option>
          <option value="rw">Kinyarwanda</option>
        </select>
      </div>

      {/* Cards Grid */}
      <div className="row">
        {data.map((item) => (
          <div className="col-md-4 mb-4" key={item.id}>
            <div className="card h-100 shadow">
              <img
                src={item.backgroundImage}
                className="card-img-top"
                alt={item.title}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{item.name}</h6>
                <p className="card-text">{getDescription(item)}</p>
                <a href="#" className="btn btn-primary">{item.action}</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

