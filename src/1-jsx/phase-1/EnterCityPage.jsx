import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import RhombusBackground from '../../components/RhombusBackground/RhombusBackground';
import { ReactComponent as BackButton } from '../../assets/back-button-clean.svg';
import { ReactComponent as ForwardButton } from '../../assets/forward-button-clean.svg';
import '../../2-css/phase-1/EnterCityPage.css';

const EnterCityPage = ({ onBack, onNext, userName }) => {
  const [city, setCity] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSubmit = () => {
    if (city.trim()) {
      onNext(city);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="enter-city-page">
      <Header />
      
      <div className="content-wrapper">
        {/* Rhombus Background */}
        <RhombusBackground size="large" opacity={0.8} />
        
        <div className="input-section">
          <div className="input-label">
            {isMobile ? 'TAP TO TYPE' : 'CLICK TO TYPE'}
          </div>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="your city name"
            className="city-input"
            autoFocus
          />
        </div>
      </div>

      <div className="navigation-buttons">
        <Button 
          icon={BackButton}
          text="BACK"
          position="left"
          onClick={onBack}
        />
        <Button 
          icon={ForwardButton}
          text="PROCEED"
          position="right"
          onClick={handleSubmit}
          disabled={!city.trim()}
        />
      </div>
    </div>
  );
};

export default EnterCityPage;
