import React, { useState } from 'react';
import IntroPage from './IntroPage';
import NameInputPage from './NameInputPage';
import CameraSelectionPage from './CameraSelectionPage';
import ProcessingPage from './ProcessingPage';

const Phase1Router = () => {
  const [currentScreen, setCurrentScreen] = useState('intro');
  const [userData, setUserData] = useState({
    name: '',
    location: ''
  });

  const navigateTo = (screen) => {
    setCurrentScreen(screen);
  };

  const updateUserData = (data) => {
    setUserData(prev => ({ ...prev, ...data }));
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'intro':
        return (
          <IntroPage 
            onDiscoverClick={() => navigateTo('name-input')}
            onTakeTestClick={() => navigateTo('camera-selection')}
          />
        );
      case 'name-input':
        return (
          <NameInputPage 
            userData={userData}
            onDataSubmit={updateUserData}
            onBack={() => navigateTo('intro')}
            onProceed={() => navigateTo('camera-selection')}
          />
        );
      case 'camera-selection':
        return (
          <CameraSelectionPage 
            onCameraSelect={() => navigateTo('processing')}
            onGallerySelect={() => navigateTo('processing')}
            onBack={() => navigateTo('name-input')}
          />
        );
      case 'processing':
        return (
          <ProcessingPage 
            onComplete={() => {
              // TODO: Navigate to Phase 2
              console.log('Phase 1 complete, moving to Phase 2');
            }}
            onBack={() => navigateTo('camera-selection')}
          />
        );
      default:
        return <IntroPage />;
    }
  };

  return (
    <div className="phase1-router">
      {renderCurrentScreen()}
    </div>
  );
};

export default Phase1Router;
