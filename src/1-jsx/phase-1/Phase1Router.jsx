import React, { useState } from 'react';
import IntroPage from './IntroPage';
import EnterNamePage from './EnterNamePage';
import EnterCityPage from './EnterCityPage';
import CameraSelectionPage from '../phase-2/CameraSelectionPage';
import ProcessingPage from './ProcessingPage';

const Phase1Router = () => {
  const [currentScreen, setCurrentScreen] = useState('intro');
  const [userData, setUserData] = useState({
    name: '',
    city: ''
  });

  const navigateTo = (screen) => {
    setCurrentScreen(screen);
  };

  const updateUserData = (field, value) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTakeTest = () => {
    navigateTo('enter-name');
  };

  const handleNameSubmit = (name) => {
    updateUserData('name', name);
    navigateTo('enter-city');
  };

  const handleCitySubmit = (city) => {
    updateUserData('city', city);
    navigateTo('camera-selection');
  };

  const handleBack = () => {
    switch (currentScreen) {
      case 'enter-name':
        navigateTo('intro');
        break;
      case 'enter-city':
        navigateTo('enter-name');
        break;
      case 'camera-selection':
        navigateTo('enter-city');
        break;
      case 'processing':
        navigateTo('camera-selection');
        break;
      default:
        navigateTo('intro');
    }
  };

  const handleCameraSelection = (selection) => {
    navigateTo('processing');
  };

  const handleProcessingComplete = () => {
    // Handle completion - could navigate to results or next phase
    console.log('Processing complete with data:', userData);
  };

  switch (currentScreen) {
    case 'intro':
      return (
        <IntroPage 
          onTakeTestClick={handleTakeTest}
          onDiscoverClick={() => console.log('Discover clicked')}
        />
      );
    
    case 'enter-name':
      return (
        <EnterNamePage 
          onBack={handleBack}
          onNext={handleNameSubmit}
        />
      );
    
    case 'enter-city':
      return (
        <EnterCityPage 
          onBack={handleBack}
          onNext={handleCitySubmit}
          userName={userData.name}
        />
      );
    
    case 'camera-selection':
      return (
        <CameraSelectionPage 
          onBack={handleBack}
          onSelection={handleCameraSelection}
        />
      );
    
    case 'processing':
      return (
        <ProcessingPage 
          onComplete={handleProcessingComplete}
        />
      );
    
    default:
      return <IntroPage onTakeTestClick={handleTakeTest} />;
  }
};

export default Phase1Router;
