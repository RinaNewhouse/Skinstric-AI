import React, { useState } from 'react';
import CameraCapture from './CameraCapture';
import CameraSetUpPage from './CameraSetUpPage';
import ProcessingPage from './ProcessingPage';

const Phase2Router = ({ mode = 'camera', imageData = null, onBack, onComplete }) => {
  const [currentPage, setCurrentPage] = useState(mode === 'camera' ? 'setup' : mode);
  const [capturedImage, setCapturedImage] = useState(imageData);
  const [demographicData, setDemographicData] = useState(null);

  console.log('Phase2Router initialized with mode:', mode, 'imageData:', imageData ? 'present' : 'null');

  const handleSetupComplete = () => {
    console.log('Camera setup complete, moving to camera capture...');
    setCurrentPage('camera');
  };

  const handleImageCaptured = (base64Image) => {
    console.log('Image captured from camera, moving to processing...');
    setCapturedImage(base64Image);
    setCurrentPage('processing');
  };

  const handleProcessingComplete = (data) => {
    console.log('Processing complete, moving to demographics...');
    console.log('Phase2Router received data from ProcessingPage:', data);
    console.log('Calling onComplete with data:', data);
    setDemographicData(data);
    // Move to Phase 3
    onComplete(data);
  };

  const handleBack = () => {
    if (currentPage === 'processing') {
      setCurrentPage('camera'); // Go back to camera capture
      setCapturedImage(null);
    } else if (currentPage === 'camera') {
      setCurrentPage('setup'); // Go back to setup
    } else {
      onBack(); // Go back to camera selection
    }
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'setup':
        return (
          <CameraSetUpPage
            onSetupComplete={handleSetupComplete}
          />
        );
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
          <CameraSetUpPage
            onSetupComplete={handleSetupComplete}
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
