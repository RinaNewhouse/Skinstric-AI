import React, { useState } from 'react';
import RhombusBackground from '../../components/RhombusBackground/RhombusBackground';
import '../../2-css/phase-1/NameInputPage.css';

const NameInputPage = ({ userData, onDataSubmit, onBack, onProceed }) => {
  const [name, setName] = useState(userData.name || '');
  const [location, setLocation] = useState(userData.location || '');
  const [currentField, setCurrentField] = useState('name');

  const handleSubmit = () => {
    if (name.trim() && location.trim()) {
      onDataSubmit({ name: name.trim(), location: location.trim() });
      onProceed();
    }
  };

  const isFormValid = name.trim() && location.trim();

  return (
    <div className="name-input-page">
      {/* Header */}
      <header className="name-input-header">
        <div className="header-left">
          <span className="brand-name">SKINSTRIC</span>
          <span className="phase-label">[INTRO]</span>
        </div>
        <div className="header-subtitle">
          <span>TO START ANALYSIS</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="name-input-main">
        <div className="input-container">
          {/* Rhombus Background */}
          <RhombusBackground size="large" opacity={0.8} />
          
          {/* Input Content */}
          <div className="input-content">
            <div className="input-field-wrapper">
              <div className="input-label">CLICK TO TYPE</div>
              <div className="input-field">
                <input
                  type="text"
                  placeholder="Introduce Yourself"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setCurrentField('name')}
                  className={currentField === 'name' ? 'focused' : ''}
                />
              </div>
            </div>

            <div className="input-field-wrapper">
              <div className="input-label">WHERE ARE YOU FROM?</div>
              <div className="input-field">
                <input
                  type="text"
                  placeholder="Where are you from?"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onFocus={() => setCurrentField('location')}
                  className={currentField === 'location' ? 'focused' : ''}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Navigation */}
      <footer className="name-input-footer">
        <button className="back-btn" onClick={onBack}>
          <div className="back-icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 2L6 8L10 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span>BACK</span>
        </button>

        <button 
          className={`proceed-btn ${isFormValid ? 'enabled' : 'disabled'}`}
          onClick={handleSubmit}
          disabled={!isFormValid}
        >
          <span>PROCEED</span>
          <div className="proceed-icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 2L10 8L6 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </button>
      </footer>
    </div>
  );
};

export default NameInputPage;
