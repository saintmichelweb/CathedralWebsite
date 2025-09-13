import React from 'react';
import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import image from '../../assets/images/_K4C9496.jpg'

export const AboutBanner = ({ 
  titleKey = 'aboutParish',
  defaultTitle = 'About Our Parish',
  descriptionKey = 'aboutParishDescription',
  defaultDescription = 'Discover the rich history, mission, and community of our parish',
  backgroundImage = image,
  gradientColors = ['#D4AF37', '#002F6C'],
  minHeight = '400px',
  showDivider = true
}) => {
  const { t } = useTranslation();

  return (
    <section 
      className="position-relative d-flex align-items-center justify-content-center text-center text-white"
      style={{ 
        minHeight: minHeight, 
        background: `linear-gradient(to right, ${gradientColors[0]}, ${gradientColors[1]})`,
        opacity: 0.9 
      }}
    >
      {/* Background Image Overlay */}
      {backgroundImage && (
        <div 
          className="position-absolute w-100 h-100 top-0 start-0" 
          style={{ 
            backgroundImage: `url(${backgroundImage})`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center', 
            mixBlendMode: 'overlay' 
          }}
          aria-hidden="true"
          onError={(e) => {
            console.warn('Background image failed to load:', backgroundImage);
            e.target.style.display = 'none';
          }}
        ></div>
      )}

      {/* Content */}
      <Container className="position-relative z-2 px-4 py-5">
        <h1 className="display-4 fw-bold text-white mb-3 font-serif">
          {t(titleKey, defaultTitle)}
        </h1>
        
        {showDivider && (
          <div 
            style={{ 
              width: '80px', 
              height: '5px', 
              backgroundColor: '#D4AF37', 
              margin: '0 auto' 
            }}
          ></div>
        )}

        <p className="lead text-white mt-4 mx-auto" style={{ maxWidth: '600px' }}>
          {t(descriptionKey, defaultDescription)}
        </p>
      </Container>
    </section>
  );
};

AboutBanner.propTypes = {
  titleKey: PropTypes.string,
  defaultTitle: PropTypes.string,
  descriptionKey: PropTypes.string,
  defaultDescription: PropTypes.string,
  backgroundImage: PropTypes.string,
  gradientColors: PropTypes.arrayOf(PropTypes.string),
  minHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  showDivider: PropTypes.bool
};

AboutBanner.defaultProps = {
  gradientColors: ['#D4AF37', '#002F6C'],
  minHeight: '400px',
  showDivider: true
};

