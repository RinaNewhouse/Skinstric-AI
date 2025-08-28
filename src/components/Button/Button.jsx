import React, { useState } from 'react';
import './Button.css';

const Button = ({ 
  icon: Icon,
  text,
  position = 'left', // 'left', 'right', or 'center'
  onClick,
  className = '',
  hoverEffect = true
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    if (hoverEffect) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (hoverEffect) setIsHovered(false);
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
