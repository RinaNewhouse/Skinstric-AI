import React, { useState } from 'react';
import { ReactComponent as DiscoverButton } from '../../assets/discover-ai-button.svg';
import { ReactComponent as TakeTestButton } from '../../assets/take-test-button.svg';
import '../../2-css/phase-1/IntroPage.css';

const IntroPage = ({ onDiscoverClick, onTakeTestClick }) => {
  const [isDiscoverHovered, setIsDiscoverHovered] = useState(false);
  const [isTakeTestHovered, setIsTakeTestHovered] = useState(false);

  return (
    <div className="intro-page">
      {/* Left Rectangle */}
      <div className="left-rectangle"></div>
      
      {/* Right Rectangle */}
      <div className="right-rectangle"></div>

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
        <h2 className="main-heading">Sophisticated skincare</h2>
        
        {/* Left Button */}
        <div 
          className="left-button-container"
          onMouseEnter={() => setIsDiscoverHovered(true)}
          onMouseLeave={() => setIsDiscoverHovered(false)}
          onClick={onDiscoverClick}
        >
          <DiscoverButton 
            className={`discover-button ${isDiscoverHovered ? 'hovered' : ''}`}
          />
        </div>

        {/* Right Button */}
        <div 
          className="right-button-container"
          onMouseEnter={() => setIsTakeTestHovered(true)}
          onMouseLeave={() => setIsTakeTestHovered(false)}
          onClick={onTakeTestClick}
        >
          <TakeTestButton 
            className={`take-test-button ${isTakeTestHovered ? 'hovered' : ''}`}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="intro-footer">
        <p>SKINSTRIC DEVELOPED AN A.I. THAT CREATES A HIGHLY-PERSONALISED ROUTINE TAILORED TO WHAT YOUR SKIN NEEDS.</p>
      </footer>
    </div>
  );
};

export default IntroPage;
