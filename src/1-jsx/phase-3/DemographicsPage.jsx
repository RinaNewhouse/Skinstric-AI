import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import { ReactComponent as BackButton } from '../../assets/back-button-clean.svg';
import { ReactComponent as ResetButton } from '../../assets/reset-button.svg';
import { ReactComponent as ConfirmButton } from '../../assets/confirm-button.svg';
import radioButton from '../../assets/radioButton.webp';
import activeRadioButton from '../../assets/activeRadioButton.webp';
import '../../2-css/phase-3/DemographicsPage.css';

const DemographicsPage = ({ demographicData, onBack, onConfirm }) => {
  const [selectedRace, setSelectedRace] = useState(null);
  const [selectedAge, setSelectedAge] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const [currentPercentage, setCurrentPercentage] = useState(0);
  const [activeCategory, setActiveCategory] = useState('race'); // Track which category is active

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

  const formatRaceName = (name) => {
    return name.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
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
      
      // Ease animation
      const ease = 1 - Math.pow(1 - progress, 3);
      
      const newPercentage = startPercentage + (targetPercentage - startPercentage) * ease;
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

  const handleCategoryClick = (category) => {
    console.log('Category clicked:', category);
    setActiveCategory(category);
    
    // Update percentage based on selected category
    if (category === 'race' && selectedRace) {
      animateToPercentage(selectedRace[1]);
    } else if (category === 'age' && selectedAge) {
      animateToPercentage(selectedAge[1]);
    } else if (category === 'gender' && selectedGender) {
      animateToPercentage(selectedGender[1]);
    }
  };

  const getCurrentSelection = () => {
    switch (activeCategory) {
      case 'race':
        return selectedRace;
      case 'age':
        return selectedAge;
      case 'gender':
        return selectedGender;
      default:
        return selectedRace;
    }
  };

  const getCurrentData = () => {
    switch (activeCategory) {
      case 'race':
        return demographicData.race;
      case 'age':
        return demographicData.age;
      case 'gender':
        return demographicData.gender;
      default:
        return demographicData.race;
    }
  };

  const getCategoryTitle = () => {
    switch (activeCategory) {
      case 'race':
        return 'RACE A.I. CONFIDENCE';
      case 'age':
        return 'AGE A.I. CONFIDENCE';
      case 'gender':
        return 'GENDER A.I. CONFIDENCE';
      default:
        return 'RACE A.I. CONFIDENCE';
    }
  };

  const getCategoryName = () => {
    switch (activeCategory) {
      case 'race':
        return 'RACE';
      case 'age':
        return 'AGE';
      case 'gender':
        return 'GENDER';
      default:
        return 'RACE';
    }
  };

  const handleItemSelect = (item, confidence) => {
    if (activeCategory === 'race') {
      handleRaceSelect([item, confidence]);
    } else if (activeCategory === 'age') {
      handleAgeSelect([item, confidence]);
    } else if (activeCategory === 'gender') {
      handleGenderSelect([item, confidence]);
    }
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
        <Header
          brandName="SKINSTRIC"
          phaseLabel="[ ANALYSIS ]"
          buttonText="ENTER CODE"
        />
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
      <Header
        brandName="SKINSTRIC"
        phaseLabel="[ANALYSIS]"
        buttonText="ENTER CODE"
      />
      <div className="content-wrapper">
        <div className="demographics-container">
          <div className="demographics-header">
            <h1>A.I. ANALYSIS</h1>
            <h2>DEMOGRAPHICS</h2>
            <p>PREDICTED RACE & AGE</p>
          </div>

          <div className="demographics-content">
             {/* Left Sidebar - Selected Attributes */}
             <div className="left-sidebar">
               <div className="selected-attributes">
                 <div 
                   className={`attribute-block ${activeCategory === 'race' ? 'active' : 'race-selected'}`}
                   onClick={() => handleCategoryClick('race')}
                 >
                   <span className="attribute-value">{selectedRace ? selectedRace[0].toUpperCase() : ''}</span>
                   <span className="attribute-label">RACE</span>
                 </div>
                 
                 <div 
                   className={`attribute-block ${activeCategory === 'age' ? 'active' : 'age-selected'}`}
                   onClick={() => handleCategoryClick('age')}
                 >
                   <span className="attribute-value">{selectedAge ? selectedAge[0].toUpperCase() : ''}</span>
                   <span className="attribute-label">AGE</span>
                 </div>
                 
                 <div 
                   className={`attribute-block ${activeCategory === 'gender' ? 'active' : 'gender-selected'}`}
                   onClick={() => handleCategoryClick('gender')}
                 >
                   <span className="attribute-value">{selectedGender ? selectedGender[0].toUpperCase() : ''}</span>
                   <span className="attribute-label">SEX</span>
                 </div>
               </div>
             </div>

            {/* Main Content Area */}
            <div className="demographics-main-content">
              <div className="selected-category-name">
                {getCurrentSelection() ? formatRaceName(getCurrentSelection()[0]) : ''}
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

            {/* Right Sidebar - Dynamic Category Table */}
            <div className="right-sidebar">
              <div className="table-title">
                <span className="table-title-left">{getCategoryName()}</span>
                <span className="table-title-right">A.I. CONFIDENCE</span>
              </div>
              <div className="race-table">
                {getSortedEntries(getCurrentData()).map(([item, confidence]) => (
                  <div 
                    key={item}
                    className={`race-table-row ${getCurrentSelection() && getCurrentSelection()[0] === item ? 'selected' : ''}`}
                    onClick={() => handleItemSelect(item, confidence)}
                  >
                    <div className="race-name-container">
                      <img 
                        src={getCurrentSelection() && getCurrentSelection()[0] === item ? activeRadioButton : radioButton}
                        alt="radio button"
                        className="radio-button"
                      />
                      <span className="race-name">{formatRaceName(item)}</span>
                    </div>
                    <span className="race-confidence">{formatPercentage(confidence)}%</span>
                  </div>
                ))}
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
        <div className="instruction-text">
          <p>If A.I. estimate is wrong, select the correct one.</p>
        </div>
        <ResetButton className="reset-button" onClick={handleReset} />
        <ConfirmButton 
          className="confirm-button" 
          // onClick={handleConfirm} 
        />
      </div>
    </div>
  );
};

export default DemographicsPage;