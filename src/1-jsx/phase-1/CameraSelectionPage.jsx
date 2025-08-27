import React, { useState } from 'react';
import '../../2-css/phase-1/CameraSelectionPage.css';

const CameraSelectionPage = ({ onCameraSelect, onGallerySelect, onBack }) => {
  const [hoveredOption, setHoveredOption] = useState(null);

  return (
    <div className="camera-selection-page">
      {/* Header */}
      <header className="camera-selection-header">
        <div className="header-left">
          <span className="brand-name">SKINSTRIC</span>
          <span className="phase-label">[INTRO]</span>
        </div>
        <div className="header-subtitle">
          <span>TO START ANALYSIS</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="camera-selection-main">
        <div className="selection-container">
          {/* Camera Option */}
          <div 
            className={`camera-option ${hoveredOption === 'camera' ? 'hovered' : ''}`}
            onMouseEnter={() => setHoveredOption('camera')}
            onMouseLeave={() => setHoveredOption(null)}
            onClick={onCameraSelect}
          >
            <div className="option-icon camera-icon">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2"/>
                <circle cx="24" cy="24" r="12" stroke="currentColor" strokeWidth="2"/>
                <circle cx="24" cy="24" r="6" fill="currentColor"/>
              </svg>
            </div>
            <div className="option-text">
              <span>ALLOW A.I. TO SCAN YOUR FACE</span>
            </div>
          </div>

          {/* Gallery Option */}
          <div 
            className={`gallery-option ${hoveredOption === 'gallery' ? 'hovered' : ''}`}
            onMouseEnter={() => setHoveredOption('gallery')}
            onMouseLeave={() => setHoveredOption(null)}
            onClick={onGallerySelect}
          >
            <div className="option-icon gallery-icon">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <path d="M12 16L20 24L12 32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M36 16L28 24L36 32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M24 12L24 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="option-text">
              <span>ALLOW A.I. ACCESS GALLERY</span>
            </div>
          </div>
        </div>
      </main>

      {/* Navigation */}
      <footer className="camera-selection-footer">
        <button className="back-btn" onClick={onBack}>
          <div className="back-icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 2L6 8L10 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span>BACK</span>
        </button>
      </footer>

      {/* Decorative Elements */}
      <div className="decorative-lines">
        <div className="line line-1"></div>
        <div className="line line-2"></div>
      </div>
    </div>
  );
};

export default CameraSelectionPage;
