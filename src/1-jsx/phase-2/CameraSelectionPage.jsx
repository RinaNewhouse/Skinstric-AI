import React, { useState, useRef } from 'react';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import { ReactComponent as CameraScanSVG } from '../../assets/camera-scan-face.svg';
import { ReactComponent as CameraGallerySVG } from '../../assets/camera-gallery.svg';
import { ReactComponent as BackButton } from '../../assets/back-button-clean.svg';
import '../../2-css/phase-2/CameraSelectionPage.css';

const CameraSelectionPage = ({ onCameraSelect, onGallerySelect, onBack }) => {
  const [hoveredOption, setHoveredOption] = useState(null);
  const fileInputRef = useRef(null);

  const handleGalleryClick = () => {
    console.log('Gallery clicked, opening file picker');
    fileInputRef.current?.click();
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('File selected:', file.name, file.type, file.size);
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file.');
        return;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('Image file is too large. Please select an image smaller than 10MB.');
        return;
      }

      // Convert to base64 and pass to gallery handler
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = e.target.result;
        console.log('Image converted to base64, length:', base64String.length);
        onGallerySelect(base64String);
      };
      reader.onerror = () => {
        alert('Failed to process the image. Please try again.');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="camera-selection-page">
      <Header />
      
      {/* Analysis instruction - absolutely positioned under header */}
      <div className="analysis-instruction">
        <span>TO START ANALYSIS</span>
      </div>
      
      <div className="content-wrapper">
        
        <div className="options-container">
          {/* Camera Option */}
          <div 
            className={`option-svg ${hoveredOption === 'camera' ? 'hovered' : ''}`}
            onMouseEnter={() => setHoveredOption('camera')}
            onMouseLeave={() => setHoveredOption(null)}
            onClick={onCameraSelect}
          >
            <CameraScanSVG />
          </div>

          {/* Gallery Option */}
          <div 
            className={`option-svg ${hoveredOption === 'gallery' ? 'hovered' : ''}`}
            onMouseEnter={() => setHoveredOption('gallery')}
            onMouseLeave={() => setHoveredOption(null)}
            onClick={handleGalleryClick}
          >
            <CameraGallerySVG />
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

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default CameraSelectionPage;