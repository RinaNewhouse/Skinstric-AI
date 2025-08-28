import React from 'react';
import './Header.css';

const Header = ({ 
  brandName = "SKINSTRIC", 
  phaseLabel = "[INTRO]", 
  buttonText = "ENTER CODE",
  onButtonClick 
}) => {
  return (
    <nav className="header">
      <div className="header-left">
        <span className="brand">{brandName}</span>
        <span className="phase">{phaseLabel}</span>
      </div>
      <button 
        className="enter-code-btn" 
        onClick={onButtonClick}
      >
        {buttonText}
      </button>
    </nav>
  );
};

export default Header;
