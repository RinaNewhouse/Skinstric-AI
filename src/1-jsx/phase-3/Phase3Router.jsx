import React, { useState } from 'react';
import DemographicsPage from './DemographicsPage';

const Phase3Router = ({ demographicData, onBack, onComplete }) => {
  const [currentPage, setCurrentPage] = useState('demographics');
  const [confirmedDemographics, setConfirmedDemographics] = useState(null);

  const handleDemographicsConfirm = (confirmedData) => {
    console.log('Demographics confirmed:', confirmedData);
    setConfirmedDemographics(confirmedData);
    
    // For now, just complete the phase
    // In the future, this could navigate to other analysis pages
    onComplete(confirmedData);
  };

  const handleBack = () => {
    onBack();
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'demographics':
        return (
          <DemographicsPage
            demographicData={demographicData}
            onBack={handleBack}
            onConfirm={handleDemographicsConfirm}
          />
        );
      default:
        return (
          <DemographicsPage
            demographicData={demographicData}
            onBack={handleBack}
            onConfirm={handleDemographicsConfirm}
          />
        );
    }
  };

  return (
    <div className="phase3-router">
      {renderCurrentPage()}
    </div>
  );
};

export default Phase3Router;
