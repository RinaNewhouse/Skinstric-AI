import React, { useState } from 'react';
import './Button.css';

const Button = ({ 
  icon: Icon,
  text,
  position = 'left', // 'left', 'right', or 'center'
  onClick,
  className = '',
  hoverEffect = true,
  onHoverStart,
  onHoverEnd
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    if (hoverEffect) {
      setIsHovered(true);
      onHoverStart && onHoverStart(position);
    }
  };

  const handleMouseLeave = () => {
    if (hoverEffect) {
      setIsHovered(false);
      onHoverEnd && onHoverEnd(position);
    }
  };

  return (
    <div className={`button-container button-${position} ${className}`}>
      <div 
        className={`button ${isHovered ? 'hovered' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
      >
        {Icon && <Icon className="button-icon" />}
        {text && <span className="button-text">{text}</span>}
      </div>
    </div>
  );
};

export default Button;
