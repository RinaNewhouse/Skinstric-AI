import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import AnimatedSquares from '../../components/AnimatedSquares/AnimatedSquares';
import '../../2-css/phase-3/ResultsPage.css';

const ResultsPage = ({ onDemographicsClick, onBack, onGetSummary }) => {
  const [demographicsHovered, setDemographicsHovered] = useState(false);

  const handleDemographicsClick = () => {
    console.log('Demographics section clicked');
    onDemographicsClick();
  };

  const handleBack = () => {
    console.log('Back button clicked');
    onBack();
  };

  const handleGetSummary = () => {
    console.log('Get Summary button clicked');
    onGetSummary();
  };

  return (
    <div className="results-page">
      <AnimatedSquares />
      
      <div className="content-wrapper">
        <Header />
        
        <div className="main-content">
          <div className="analysis-section">
            <h1 className="analysis-title">A.I. ANALYSIS</h1>
            <p className="analysis-description">
              A.I. HAS ESTIMATED THE FOLLOWING.<br />
              FIX ESTIMATED INFORMATION IF NEEDED.
            </p>
          </div>

          <div className="diamond-container">
            <div className="diamond-diagram">
              {/* Top section - DEMOGRAPHICS (clickable) */}
              <div 
                className={`diamond-section demographics-section ${demographicsHovered ? 'hovered' : ''}`}
                onClick={handleDemographicsClick}
                onMouseEnter={() => setDemographicsHovered(true)}
                onMouseLeave={() => setDemographicsHovered(false)}
              >
                <span className="section-label">DEMOGRAPHICS</span>
              </div>

              {/* Left section - COSMETIC CONCERNS (not clickable) */}
              <div className="diamond-section cosmetic-concerns-section">
                <span className="section-label">COSMETIC CONCERNS</span>
              </div>

              {/* Right section - SKIN TYPE DETAILS (not clickable) */}
              <div className="diamond-section skin-type-section">
                <span className="section-label">SKIN TYPE DETAILS</span>
              </div>

              {/* Bottom section - WEATHER (not clickable) */}
              <div className="diamond-section weather-section">
                <span className="section-label">WEATHER</span>
              </div>
            </div>
          </div>
        </div>

        <div className="navigation-section">
          <Button 
            text="BACK" 
            onClick={handleBack}
            position="left"
          />
          <Button 
            text="GET SUMMARY" 
            onClick={handleGetSummary}
            position="right"
          />
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
