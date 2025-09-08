import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import AnimatedSquares from '../../components/AnimatedSquares/AnimatedSquares';
import Button from '../../components/Button/Button';
import { ReactComponent as BackButton } from '../../assets/back-button-clean.svg';
import '../../2-css/phase-3/DemographicsPage.css';

const DemographicsPage = ({ demographicData, onBack, onConfirm }) => {
  const [selectedRace, setSelectedRace] = useState(null);
  const [selectedAge, setSelectedAge] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const [currentPercentage, setCurrentPercentage] = useState(0);

  useEffect(() => {
    if (demographicData) {
      // Set initial selections to highest confidence values
      const raceEntries = Object.entries(demographicData.race);
      const ageEntries = Object.entries(demographicData.age);
      const genderEntries = Object.entries(demographicData.gender);
      
      const topRace = raceEntries.reduce((a, b) => a[1] > b[1] ? a : b);
      const topAge = ageEntries.reduce((a, b) => a[1] > b[1] ? a : b);
      const topGender = genderEntries.reduce((a, b) => a[1] > b[1] ? a : b);
      
      setSelectedRace(topRace);
      setSelectedAge(topAge);
      setSelectedGender(topGender);
      
      // Animate to the initial percentage (use the selected race percentage)
      setTimeout(() => {
        animateToPercentage(topRace[1]);
      }, 100); // Small delay to ensure component is fully mounted
    }
  }, [demographicData]);

  const formatPercentage = (value) => {
    return Math.floor(value * 100).toFixed(2);
  };

  const getSortedEntries = (data) => {
    return Object.entries(data).sort((a, b) => b[1] - a[1]);
  };

  const animateToPercentage = (targetPercentage) => {
    const startPercentage = currentPercentage;
    const duration = 800; // 0.8 seconds
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease-out animation
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      const newPercentage = startPercentage + (targetPercentage - startPercentage) * easeOut;
      setCurrentPercentage(newPercentage);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  const handleRaceSelect = (raceEntry) => {
    setSelectedRace(raceEntry);
    animateToPercentage(raceEntry[1]);
  };

  const handleAgeSelect = (ageEntry) => {
    setSelectedAge(ageEntry);
    animateToPercentage(ageEntry[1]);
  };

  const handleGenderSelect = (genderEntry) => {
    setSelectedGender(genderEntry);
    animateToPercentage(genderEntry[1]);
  };

  const handleReset = () => {
    if (demographicData) {
      const raceEntries = Object.entries(demographicData.race);
      const ageEntries = Object.entries(demographicData.age);
      const genderEntries = Object.entries(demographicData.gender);
      
      const topRace = raceEntries.reduce((a, b) => a[1] > b[1] ? a : b);
      const topAge = ageEntries.reduce((a, b) => a[1] > b[1] ? a : b);
      const topGender = genderEntries.reduce((a, b) => a[1] > b[1] ? a : b);
      
      setSelectedRace(topRace);
      setSelectedAge(topAge);
      setSelectedGender(topGender);
      
      setCurrentPercentage(Math.max(topRace[1], topAge[1], topGender[1]));
    }
  };

  const handleConfirm = () => {
    const confirmedData = {
      race: selectedRace,
      age: selectedAge,
      gender: selectedGender
    };
    onConfirm(confirmedData);
  };

  if (!demographicData) {
    return (
      <div className="demographics-page">
        <Header />
        <AnimatedSquares />
        <div className="content-wrapper">
          <div className="error-message">
            <h2>No Data Available</h2>
            <p>Please go back and try again.</p>
          </div>
        </div>
        <div className="navigation-buttons">
          <Button 
            icon={BackButton}
            text="BACK"
            position="left"
            onClick={onBack}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="demographics-page">
      <Header />
      <AnimatedSquares />
      
      <div className="content-wrapper">
        <div className="demographics-container">
          <div className="demographics-header">
            <h1>SKINSTRIC [ANALYSIS]</h1>
            <h2>A. I. ANALYSIS</h2>
            <h3>DEMOGRAPHICS</h3>
            <p>PREDICTED RACE & AGE</p>
          </div>

          <div className="demographics-content">
            {/* Left Sidebar - Selected Attributes */}
            <div className="left-sidebar">
              <div className="selected-attributes">
                <div className="attribute-block race-selected">
                  <span className="attribute-value">{selectedRace ? selectedRace[0].toUpperCase() : ''}</span>
                  <span className="attribute-label">RACE</span>
                </div>
                
                <div className="attribute-block age-selected">
                  <span className="attribute-value">{selectedAge ? selectedAge[0].toUpperCase() : ''}</span>
                  <span className="attribute-label">AGE</span>
                </div>
                
                <div className="attribute-block gender-selected">
                  <span className="attribute-value">{selectedGender ? selectedGender[0].toUpperCase() : ''}</span>
                  <span className="attribute-label">SEX</span>
                </div>
              </div>
              
              <div className="instruction-text">
                <p>If A.I. estimate is wrong, select the correct one.</p>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="main-content">
              {/* Center Content */}
              <div className="center-content">
                <div className="selected-category-name">
                  {selectedRace ? selectedRace[0].toUpperCase() : ''}
                </div>
                
                {/* Pie Chart */}
                <div className="pie-chart-container">
                  <div className="pie-chart" style={{ '--percentage': `${currentPercentage * 360}deg` }}>
                  </div>
                  <div className="pie-chart-text">
                    {formatPercentage(currentPercentage)}%
                  </div>
                </div>
              </div>

              {/* Right Panel - Race Table */}
              <div className="race-table-panel">
                <h3 className="table-title">RACE A.I. CONFIDENCE</h3>
                <div className="race-table">
                  {getSortedEntries(demographicData.race).map(([race, confidence]) => (
                    <div 
                      key={race}
                      className={`race-table-row ${selectedRace && selectedRace[0] === race ? 'selected' : ''}`}
                      onClick={() => handleRaceSelect([race, confidence])}
                    >
                      <span className="race-name">{race.toUpperCase()}</span>
                      <span className="race-confidence">{formatPercentage(confidence)}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
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
        <div className="action-buttons">
          <Button 
            text="RESET"
            position="left"
            onClick={handleReset}
            className="reset-button"
          />
          <Button 
            text="CONFIRM"
            position="right"
            onClick={handleConfirm}
            className="confirm-button"
          />
        </div>
      </div>
    </div>
  );
};

export default DemographicsPage;
