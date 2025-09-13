import { FaImage, FaUser, FaChurch, FaNewspaper, FaCalendarAlt, FaMusic } from "react-icons/fa";

export const PlaceholderImage = ({ 
  type = "image", 
  size = "60px", 
  className = "", 
  color = "#D4AF37",
  fallbackIcon,
  shape = "circle" // circle, rounded, square
}) => {
  const getIcon = () => {
    if (fallbackIcon) return fallbackIcon;
    
    switch (type) {
      case "user": return FaUser;
      case "church": return FaChurch;
      case "news": return FaNewspaper;
      case "event": return FaCalendarAlt;
      case "music": return FaMusic;
      default: return FaImage;
    }
  };

  const IconComponent = getIcon();
  const iconSize = type === "user" ? "1.5em" : "2em";
  
  const shapeClass = shape === "circle" ? "rounded-circle" : 
                    shape === "rounded" ? "rounded" : "";
  
  return (
    <div
      className={`bg-light d-flex align-items-center justify-content-center border ${shapeClass} ${className}`}
      style={{
        width: size,
        height: size,
        borderColor: color,
        borderWidth: "2px",
        minHeight: size === "100%" ? "200px" : size,
        ...(size === "100%" && {
          width: "100%",
          height: "100%"
        })
      }}
    >
      <IconComponent style={{ color }} size={iconSize} />
    </div>
  );
};
