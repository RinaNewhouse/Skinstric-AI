import React, { useState } from 'react';
import ResultsPage from './ResultsPage';
import DemographicsPage from './DemographicsPage';

const Phase3Router = ({ demographicData, onBack, onComplete }) => {
  const [currentPage, setCurrentPage] = useState('results');
  const [confirmedDemographics, setConfirmedDemographics] = useState(null);

  console.log('Phase3Router received demographicData:', demographicData);

  const handleDemographicsClick = () => {
    console.log('Demographics section clicked, navigating to demographics page');
    console.log('Current demographicData:', demographicData);
    setCurrentPage('demographics');
  };

  const handleResultsBack = () => {
    console.log('Back from results page');
    onBack();
  };

  const handleGetSummary = () => {
    console.log('Get Summary clicked - completing phase');
    onComplete(confirmedDemographics || demographicData);
  };

  const handleDemographicsConfirm = (confirmedData) => {
    console.log('Demographics confirmed:', confirmedData);
    setConfirmedDemographics(confirmedData);
    
    // Navigate back to results page
    setCurrentPage('results');
  };

  const handleDemographicsBack = () => {
    console.log('Back from demographics page');
    setCurrentPage('results');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'results':
        return (
          <ResultsPage
            onDemographicsClick={handleDemographicsClick}
            onBack={handleResultsBack}
            onGetSummary={handleGetSummary}
          />
        );
      case 'demographics':
        return (
          <DemographicsPage
            demographicData={demographicData}
            onBack={handleDemographicsBack}
            onConfirm={handleDemographicsConfirm}
          />
        );
      default:
        return (
          <ResultsPage
            onDemographicsClick={handleDemographicsClick}
            onBack={handleResultsBack}
            onGetSummary={handleGetSummary}
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
