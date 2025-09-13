import { useState } from "react";
import { PlaceholderImage } from "./PlaceholderImage";

export const SafeImage = ({ 
  src, 
  alt, 
  className = "", 
  style = {},
  placeholderType = "image",
  placeholderSize = "100%",
  placeholderColor = "#D4AF37",
  fallbackIcon,
  ...props 
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  // If no src or image failed to load, show placeholder
  if (!src || imageError) {
    return (
      <PlaceholderImage 
        type={placeholderType}
        size={placeholderSize}
        className={className}
        color={placeholderColor}
        fallbackIcon={fallbackIcon}
      />
    );
  }

  return (
    <div className={`position-relative ${className}`} style={style}>
      {imageLoading && (
        <div 
          className="position-absolute top-50 start-50 translate-middle"
          style={{ zIndex: 1 }}
        >
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setImageLoading(false)}
        onError={() => {
          setImageError(true);
          setImageLoading(false);
        }}
        style={{
          ...style,
          opacity: imageLoading ? 0.5 : 1,
          transition: 'opacity 0.3s ease',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center'
        }}
        {...props}
      />
    </div>
  );
};
