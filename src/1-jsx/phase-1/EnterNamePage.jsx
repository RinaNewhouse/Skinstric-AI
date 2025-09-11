import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import RhombusBackground from '../../components/RhombusBackground/RhombusBackground';
import { ReactComponent as BackButton } from '../../assets/back-button-clean.svg';
import { ReactComponent as ForwardButton } from '../../assets/forward-button-clean.svg';
import '../../2-css/phase-1/EnterNamePage.css';

const EnterNamePage = ({ onBack, onNext }) => {
  const [name, setName] = useState('');
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
    if (name.trim()) {
      onNext(name);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="enter-name-page">
      <Header />
      
      <div className="content-wrapper">
        {/* Rhombus Background */}
        <RhombusBackground size="extra-large" opacity={0.8} />
        
        <div className="input-section">
          <div className="input-label">
            {isMobile ? 'TAP TO TYPE' : 'CLICK TO TYPE'}
          </div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Introduce Yourself"
            className="name-input"
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
          disabled={!name.trim()}
        />
      </div>
    </div>
  );
};

export default EnterNamePage;
