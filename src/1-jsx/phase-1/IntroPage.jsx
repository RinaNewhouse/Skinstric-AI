import React, { useRef } from 'react';
import { ReactComponent as BackButton } from '../../assets/back-button-clean.svg';
import { ReactComponent as ForwardButton } from '../../assets/forward-button-clean.svg';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import Animation from '../../components/Animation/Animation';
import '../../2-css/phase-1/IntroPage.css';

const IntroPage = ({ onDiscoverClick, onTakeTestClick }) => {
  const leftTriangleRef = useRef(null);
  const rightTriangleRef = useRef(null);

  return (
    <div className="intro-page">
      {/* Header Component */}
      <Header />

      {/* Animation Component */}
      <Animation 
        leftTriangleRef={leftTriangleRef}
        rightTriangleRef={rightTriangleRef}
      >
        <Button 
          icon={BackButton}
          text="DISCOVER A.I."
          position="left"
          onClick={onDiscoverClick}
        />
        
        <Button 
          icon={ForwardButton}
          text="TAKE TEST"
          position="right"
          onClick={onTakeTestClick}
        />
      </Animation>

      {/* Decorative Triangles - with refs for animation */}
      <div ref={leftTriangleRef} className="left-triangle"></div>
      <div ref={rightTriangleRef} className="right-triangle"></div>

      {/* Footer */}
      <footer className="footer">
        <p>SKINSTRIC DEVELOPED AN A.I. THAT CREATES A HIGHLY-PERSONALISED ROUTINE TAILORED TO WHAT YOUR SKIN NEEDS.</p>
      </footer>
    </div>
  );
};

export default IntroPage;
