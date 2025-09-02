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
                {/* Camera aperture - hexagon with six blades */}
                <path d="M24 4L28 8L32 12L32 20L28 24L24 28L20 24L16 20L16 12L20 8L24 4Z" stroke="currentColor" strokeWidth="2" fill="none"/>
                <circle cx="24" cy="16" r="4" stroke="currentColor" strokeWidth="2" fill="none"/>
                <circle cx="24" cy="16" r="2" fill="currentColor"/>
              </svg>
            </div>
            <div className="connecting-line"></div>
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
                {/* Landscape with sun/moon */}
                <circle cx="24" cy="12" r="6" fill="currentColor"/>
                <path d="M8 32C8 28 12 24 16 24C20 24 24 28 24 32C24 36 20 40 16 40C12 40 8 36 8 32Z" stroke="currentColor" strokeWidth="2" fill="none"/>
                <path d="M24 32C24 28 28 24 32 24C36 24 40 28 40 32C40 36 36 40 32 40C28 40 24 36 24 32Z" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
            </div>
            <div className="connecting-line"></div>
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
