import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import AnimatedSquares from '../../components/AnimatedSquares/AnimatedSquares';
import Button from '../../components/Button/Button';
import { ReactComponent as BackButton } from '../../assets/back-button-clean.svg';
import { RiCameraLensLine } from "react-icons/ri";
import { GrGallery } from "react-icons/gr";
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
              <RiCameraLensLine size={48} />
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
              <GrGallery size={48} />
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