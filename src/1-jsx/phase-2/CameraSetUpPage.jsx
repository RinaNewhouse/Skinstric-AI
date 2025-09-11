import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import { ReactComponent as CameraSetUpSVG } from '../../assets/camera-set-up.svg';
import { ReactComponent as ForBetterPicBlackSVG } from '../../assets/for-better-pic-black.svg';
import '../../2-css/phase-2/CameraSetUpPage.css';

const CameraSetUpPage = ({ onSetupComplete }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show the page immediately
    setIsVisible(true);
    
    // Auto-proceed after 3 seconds
    const timer = setTimeout(() => {
      onSetupComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onSetupComplete]);

  return (
    <div className={`camera-setup-page ${isVisible ? 'visible' : ''}`}>
      <Header />
      
      <div className="setup-content">
        {/* Rotating camera setup SVG */}
        <div className="camera-setup-container">
          <CameraSetUpSVG />
          <div className="setup-text">
            <span>SETTING UP CAMERA...</span>
          </div>
        </div>
        
        {/* Instructions */}
        <div className="instructions-container">
          <ForBetterPicBlackSVG />
        </div>
      </div>
    </div>
  );
};

export default CameraSetUpPage;
