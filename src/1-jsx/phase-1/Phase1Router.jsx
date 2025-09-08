import React, { useState } from 'react';
import IntroPage from './IntroPage';
import EnterNamePage from './EnterNamePage';
import EnterCityPage from './EnterCityPage';
import CameraSelectionPage from '../phase-2/CameraSelectionPage';
import Phase2Router from '../phase-2/Phase2Router';
import Phase3Router from '../phase-3/Phase3Router';

const Phase1Router = () => {
  const [currentScreen, setCurrentScreen] = useState('intro');
  const [currentPhase, setCurrentPhase] = useState('phase1');
  const [phase2Mode, setPhase2Mode] = useState('camera'); // Track which mode Phase 2 should use
  const [userData, setUserData] = useState({
    name: '',
    city: '',
    image: null,
    demographics: null
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

  const handleCameraSelect = () => {
    console.log('Camera selected, setting mode to camera');
    setPhase2Mode('camera');
    setCurrentPhase('phase2');
  };

  const handleGallerySelect = (base64Image) => {
    console.log('Gallery image selected, going directly to processing');
    updateUserData('image', base64Image);
    setCurrentPhase('phase2');
    setPhase2Mode('processing'); // Skip camera/gallery, go straight to processing
  };

  const handlePhase2Complete = (demographicData) => {
    console.log('Phase1Router received demographicData from Phase2Router:', demographicData);
    console.log('Updating userData.demographics to:', demographicData);
    updateUserData('demographics', demographicData);
    setCurrentPhase('phase3');
  };

  const handlePhase3Complete = (confirmedData) => {
    console.log('All phases complete with data:', { ...userData, demographics: confirmedData });
    // Here you could navigate to future phases or show completion
  };

  const handleBackToPhase1 = () => {
    setCurrentPhase('phase1');
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
      case 'camera-capture':
        navigateTo('camera-selection');
        break;
      case 'gallery-upload':
        navigateTo('camera-selection');
        break;
      case 'processing':
        navigateTo('camera-selection');
        break;
      default:
        navigateTo('intro');
    }
  };

  // Handle phase transitions
  if (currentPhase === 'phase2') {
    return (
      <Phase2Router 
        mode={phase2Mode}
        imageData={userData.image}
        onBack={handleBackToPhase1}
        onComplete={handlePhase2Complete}
      />
    );
  }

  if (currentPhase === 'phase3') {
    return (
      <Phase3Router 
        demographicData={userData.demographics}
        onBack={() => setCurrentPhase('phase2')}
        onComplete={handlePhase3Complete}
      />
    );
  }

  // Phase 1 screens
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
          onCameraSelect={handleCameraSelect}
          onGallerySelect={handleGallerySelect}
          onBack={handleBack}
        />
      );
    
    default:
      return <IntroPage onTakeTestClick={handleTakeTest} />;
  }
};

export default Phase1Router;
