import React, { useState } from 'react';
import CameraCapture from './CameraCapture';
import ProcessingPage from './ProcessingPage';

const Phase2Router = ({ onBack, onComplete }) => {
  const [currentPage, setCurrentPage] = useState('camera');
  const [capturedImage, setCapturedImage] = useState(null);
  const [demographicData, setDemographicData] = useState(null);

  const handleImageCaptured = (base64Image) => {
    console.log('Image captured, moving to processing...');
    setCapturedImage(base64Image);
    setCurrentPage('processing');
  };

  const handleProcessingComplete = (data) => {
    console.log('Processing complete, moving to demographics...');
    setDemographicData(data);
    // Move to Phase 3
    onComplete(data);
  };

  const handleBack = () => {
    if (currentPage === 'processing') {
      setCurrentPage('camera');
      setCapturedImage(null);
    } else {
      onBack();
    }
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'camera':
        return (
          <CameraCapture
            onBack={handleBack}
            onImageCaptured={handleImageCaptured}
          />
        );
      case 'processing':
        return (
          <ProcessingPage
            imageData={capturedImage}
            onBack={handleBack}
            onAnalysisComplete={handleProcessingComplete}
          />
        );
      default:
        return (
          <CameraCapture
            onBack={handleBack}
            onImageCaptured={handleImageCaptured}
          />
        );
    }
  };

  return (
    <div className="phase2-router">
      {renderCurrentPage()}
    </div>
  );
};

export default Phase2Router;
