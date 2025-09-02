import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import AnimatedSquares from '../../components/AnimatedSquares/AnimatedSquares';
import Button from '../../components/Button/Button';
import { ReactComponent as BackButton } from '../../assets/back-button-clean.svg';
import '../../2-css/phase-2/CameraSelectionPage.css';

const CameraSelectionPage = ({ onCameraSelect, onGallerySelect, onBack }) => {
  const [hoveredOption, setHoveredOption] = useState(null);

  return (
    <div className="camera-selection-page">
      <Header />
      <AnimatedSquares />
      
      <div className="content-wrapper">
        <div className="analysis-header">
          <span>TO START ANALYSIS</span>
        </div>
        
        <div className="options-container">
          {/* Camera Option */}
          <div 
            className={`option-frame ${hoveredOption === 'camera' ? 'hovered' : ''}`}
            onMouseEnter={() => setHoveredOption('camera')}
            onMouseLeave={() => setHoveredOption(null)}
            onClick={onCameraSelect}
          >
            <div className="option-icon">
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
            className={`option-frame ${hoveredOption === 'gallery' ? 'hovered' : ''}`}
            onMouseEnter={() => setHoveredOption('gallery')}
            onMouseLeave={() => setHoveredOption(null)}
            onClick={onGallerySelect}
          >
            <div className="option-icon">
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
      </div>

      <div className="navigation-buttons">
        <Button 
          icon={BackButton}
          text="BACK"
          position="left"
          onClick={onBack}
        />
      </div>
    </div>
  );
};

export default CameraSelectionPage;
