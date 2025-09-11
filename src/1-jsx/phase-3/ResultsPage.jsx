import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import { ReactComponent as BackButtonBlack } from "../../assets/back-button-clean.svg";
import RhombusBackground from "../../components/RhombusBackground/RhombusBackground";
import "../../2-css/phase-3/ResultsPage.css";

const ResultsPage = ({ onDemographicsClick, onBack, onGetSummary }) => {
  const [demographicsHovered, setDemographicsHovered] = useState(false);

  const handleDemographicsClick = () => {
    console.log("Demographics section clicked");
    onDemographicsClick();
  };

  const handleBack = () => {
    console.log("Back button clicked");
    onBack();
  };

  const handleGetSummary = () => {
    console.log("Get Summary button clicked - navigating to demographics");
    onDemographicsClick(); // Same as clicking demographics diamond
  };

  return (
    <div className="results-page">
      <div className="content-wrapper">
        <Header
          brandName="SKINSTRIC"
          phaseLabel="[ANALYSIS]"
          buttonText="ENTER CODE"
        />

        {/* Analysis section moved outside main-content */}
        <div className="analysis-section">
          <h1 className="analysis-title">SKINSTRIC [ANALYSIS]</h1>
          <p className="analysis-description">
            A.I. HAS ESTIMATED THE FOLLOWING. 
            <br />
            FIX ESTIMATED INFORMATION IF NEEDED.
          </p>
        </div>

        <div className="main-content">
          <div className="diamond-container">
            {/* Rhombus Background */}
            <RhombusBackground size="medium" opacity="high" />
            
            <div className="diamond-diagram">
              {/* Top section - DEMOGRAPHICS (clickable) */}
              <div
                className={`diamond-section demographics-section ${
                  demographicsHovered ? "hovered" : ""
                }`}
                onClick={handleDemographicsClick}
                onMouseEnter={() => setDemographicsHovered(true)}
                onMouseLeave={() => setDemographicsHovered(false)}
              >
                <span className="section-label">DEMOGRAPHICS</span>
              </div>

              {/* Left section - SKIN TYPE DETAILS (not clickable) */}
              <div className="diamond-section skin-type-section">
                <span className="section-label">SKIN TYPE DETAILS</span>
              </div>

              {/* Right section - COSMETIC CONCERNS (not clickable) */}
              <div className="diamond-section cosmetic-concerns-section">
                <span className="section-label">COSMETIC CONCERNS</span>
              </div>

              {/* Bottom section - WEATHER (not clickable) */}
              <div className="diamond-section weather-section">
                <span className="section-label">WEATHER</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation - Bottom Left and Right */}
        <div className="navigation-left">
          <Button
            icon={BackButtonBlack}
            text="BACK"
            onClick={handleBack}
            position="left"
          />
        </div>

        <div className="navigation-right">
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
