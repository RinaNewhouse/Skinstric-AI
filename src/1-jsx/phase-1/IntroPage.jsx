import React, { useState } from 'react';
import '../../2-css/phase-1/IntroPage.css';

const IntroPage = ({ onDiscoverClick, onTakeTestClick }) => {
  const [hoveredButton, setHoveredButton] = useState(null);

  const handleButtonClick = (action) => {
    console.log(`${action} clicked`);
    if (action === 'discover' && onDiscoverClick) {
      onDiscoverClick();
    } else if (action === 'test' && onTakeTestClick) {
      onTakeTestClick();
    }
  };

  return (
    <div className="intro-page">
      {/* Header */}
      <header className="intro-header">
        <div className="header-left">
          <span className="brand-name">SKINSTRIC</span>
          <span className="phase-label">[INTRO]</span>
        </div>
        <div className="header-right">
          <button className="enter-code-btn">ENTER CODE</button>
        </div>
      </header>

      {/* Main Content */}
      <main className="intro-main">
        {/* Left Interactive Element */}
        <div className="left-interactive">
          <div 
            className={`discover-ai-btn ${hoveredButton === 'discover' ? 'hovered' : ''}`}
            onMouseEnter={() => setHoveredButton('discover')}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={() => handleButtonClick('discover')}
          >
            <div className="diamond-icon">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 2L10 8L8 14L6 8L8 2Z" fill="currentColor"/>
              </svg>
            </div>
            <span>DISCOVER A.I.</span>
          </div>
        </div>

        {/* Center Main Heading */}
        <div className="main-heading">
          <h1>Sophisticated skincare</h1>
        </div>

        {/* Right Interactive Element */}
        <div className="right-interactive">
          <div 
            className={`take-test-btn ${hoveredButton === 'test' ? 'hovered' : ''}`}
            onMouseEnter={() => setHoveredButton('test')}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={() => handleButtonClick('test')}
          >
            <span>TAKE TEST</span>
            <div className="diamond-icon">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 2L10 8L8 14L6 8L8 2Z" fill="currentColor"/>
              </svg>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Description */}
      <footer className="intro-footer">
        <p className="description">
          SKINSTRIC DEVELOPED AN A.I. THAT CREATES A HIGHLY-PERSONALISED ROUTINE TAILORED TO WHAT YOUR SKIN NEEDS.
        </p>
      </footer>

      {/* Decorative Lines */}
      <div className="decorative-lines">
        <div className="line line-1"></div>
        <div className="line line-2"></div>
      </div>
    </div>
  );
};

export default IntroPage;
