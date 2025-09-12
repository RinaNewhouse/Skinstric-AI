import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import RhombusBackground from '../../components/RhombusBackground/RhombusBackground';
import { ReactComponent as BackButton } from '../../assets/back-button-clean.svg';
import { ReactComponent as ForwardButton } from '../../assets/forward-button-clean.svg';
import '../../2-css/phase-1/EnterInfoPage.css';

const EnterInfoPage = ({ 
  type = 'name', // 'name' or 'city'
  placeholder = 'Introduce Yourself',
  userName = '',
  onBack, 
  onNext 
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isValid, setIsValid] = useState(false);

  // Reset state when type changes (e.g., switching from name to city)
  useEffect(() => {
    setInputValue('');
    setIsValid(false);
  }, [type]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    
    // Validation logic based on type
    if (type === 'name') {
      setIsValid(value.trim().length >= 2);
    } else if (type === 'city') {
      setIsValid(value.trim().length >= 2);
    }
  };

  const handleNext = () => {
    if (isValid) {
      onNext(inputValue.trim());
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && isValid) {
      handleNext();
    }
  };

  return (
    <div className="enter-info-page">
      <Header />
      <div className="content-wrapper">
        <RhombusBackground size="large" opacity={0.8} />
        <div className="input-section">
          <div className="input-container">
            <div className="input-label">CLICK TO TYPE</div>
            <input
              type="text"
              className="info-input"
              placeholder={placeholder}
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              autoFocus
            />
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
        <Button 
          icon={ForwardButton}
          text="PROCEED"
          position="right"
          onClick={handleNext}
        />
      </div>
    </div>
  );
};

export default EnterInfoPage;
