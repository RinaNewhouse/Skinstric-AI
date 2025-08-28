import React from 'react';
import { ReactComponent as DiscoverButton } from '../../assets/discover-ai-button.svg';
import { ReactComponent as TakeTestButton } from '../../assets/take-test-button.svg';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import '../../2-css/phase-1/IntroPage.css';

const IntroPage = ({ onDiscoverClick, onTakeTestClick }) => {
  return (
    <div className="intro-page">
      {/* Header Component */}
      <Header />

      {/* Main Content */}
      <div className="main-content">
        <h1 className="main-heading">Sophisticated<br />skincare</h1>
        
        {/* Button Components */}
        <Button 
          icon={DiscoverButton}
          position="left"
          onClick={onDiscoverClick}
        />
        
        <Button 
          icon={TakeTestButton}
          position="right"
          onClick={onTakeTestClick}
        />
      </div>

      {/* Decorative Triangles */}
      <div className="left-triangle"></div>
      <div className="right-triangle"></div>

      {/* Footer */}
      <footer className="footer">
        <p>SKINSTRIC DEVELOPED AN A.I. THAT CREATES A HIGHLY-PERSONALISED ROUTINE TAILORED TO WHAT YOUR SKIN NEEDS.</p>
      </footer>
    </div>
  );
};

export default IntroPage;
