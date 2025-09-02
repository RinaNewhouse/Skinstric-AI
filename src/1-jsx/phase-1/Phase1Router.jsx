import React, { useState } from 'react';
import IntroPage from './IntroPage';
import EnterNamePage from './EnterNamePage';
import EnterCityPage from './EnterCityPage';
import CameraSelectionPage from '../phase-2/CameraSelectionPage';
import CameraCapture from '../phase-2/CameraCapture';
import GalleryUpload from '../phase-2/GalleryUpload';
import ProcessingPage from './ProcessingPage';

const Phase1Router = () => {
  const [currentScreen, setCurrentScreen] = useState('intro');
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
    navigateTo('camera-capture');
  };

  const handleGallerySelect = () => {
    navigateTo('gallery-upload');
  };

  const handleImageCaptured = async (base64Image) => {
    updateUserData('image', base64Image);
    
    try {
      // Call Phase 2 API
      const response = await fetch('https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseTwo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Image: base64Image })
      });

      if (response.ok) {
        const data = await response.json();
        updateUserData('demographics', data.data);
        navigateTo('demographics');
      } else {
        console.error('API call failed');
        navigateTo('processing');
      }
    } catch (error) {
      console.error('Error calling API:', error);
      navigateTo('processing');
    }
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

  const handleProcessingComplete = () => {
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
          onCameraSelect={handleCameraSelect}
          onGallerySelect={handleGallerySelect}
          onBack={handleBack}
        />
      );
    
    case 'camera-capture':
      return (
        <CameraCapture 
          onBack={handleBack}
          onImageCaptured={handleImageCaptured}
        />
      );
    
    case 'gallery-upload':
      return (
        <GalleryUpload 
          onBack={handleBack}
          onImageSelected={handleImageCaptured}
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
