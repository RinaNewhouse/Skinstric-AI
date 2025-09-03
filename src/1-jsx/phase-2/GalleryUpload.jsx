import React, { useRef } from 'react';
import Header from '../../components/Header/Header';
import AnimatedSquares from '../../components/AnimatedSquares/AnimatedSquares';
import Button from '../../components/Button/Button';
import { ReactComponent as BackButton } from '../../assets/back-button-clean.svg';
import { MdFileUpload } from "react-icons/md";
import '../../2-css/phase-2/GalleryUpload.css';

const GalleryUpload = ({ onBack, onImageSelected }) => {
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Image = e.target.result;
        onImageSelected(base64Image);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="gallery-upload-page">
      <Header />
      <AnimatedSquares />
      
      <div className="content-wrapper">
        <div className="upload-header">
          <span>SELECT FROM GALLERY</span>
        </div>
        
        <div className="upload-container">
          <div className="upload-area" onClick={handleUploadClick}>
            <div className="upload-icon">
              <MdFileUpload size={48} />
            </div>
            <div className="upload-text">
              <span>CLICK TO SELECT IMAGE</span>
            </div>
            <div className="upload-hint">
              <span>Supports: JPG, PNG, GIF</span>
            </div>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
        </div>
        
        <div className="upload-instructions">
          <p>Select an image from your device to analyze</p>
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

export default GalleryUpload;
