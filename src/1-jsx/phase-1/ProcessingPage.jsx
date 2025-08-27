import React, { useState, useEffect } from 'react';
import '../../2-css/phase-1/ProcessingPage.css';

const ProcessingPage = ({ onComplete, onBack }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [dots, setDots] = useState('');

  const steps = [
    {
      title: 'SETTING UP CAMERA...',
      message: 'TO GET BETTER RESULTS MAKE SURE TO HAVE',
      tips: ['NEUTRAL EXPRESSION', 'FRONTAL POSE', 'ADEQUATE LIGHTING']
    },
    {
      title: 'PREPARING YOUR ANALYSIS...',
      message: 'A.I. IS PROCESSING YOUR IMAGE',
      tips: ['ANALYZING SKIN TONE', 'DETECTING FEATURES', 'GENERATING RECOMMENDATIONS']
    }
  ];

  useEffect(() => {
    // Animate dots
    const dotInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    // Progress through steps
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(stepInterval);
          // Complete after a delay
          setTimeout(() => {
            onComplete();
          }, 2000);
          return prev;
        }
      });
    }, 3000);

    return () => {
      clearInterval(dotInterval);
      clearInterval(stepInterval);
    };
  }, [onComplete]);

  const currentStepData = steps[currentStep];

  return (
    <div className="processing-page">
      {/* Header */}
      <header className="processing-header">
        <div className="header-left">
          <span className="brand-name">SKINSTRIC</span>
          <span className="phase-label">[INTRO]</span>
        </div>
        <div className="header-subtitle">
          <span>TO START ANALYSIS</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="processing-main">
        <div className="processing-container">
          {/* Camera Icon */}
          <div className="camera-icon">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
              <circle cx="40" cy="40" r="35" stroke="currentColor" strokeWidth="2"/>
              <circle cx="40" cy="40" r="25" stroke="currentColor" strokeWidth="2"/>
              <circle cx="40" cy="40" r="15" stroke="currentColor" strokeWidth="2"/>
              <circle cx="40" cy="40" r="8" fill="currentColor"/>
            </svg>
          </div>

          {/* Processing Text */}
          <div className="processing-text">
            <h2 className="processing-title">
              {currentStepData.title}
              <span className="dots">{dots}</span>
            </h2>
            
            <p className="processing-message">{currentStepData.message}</p>
          </div>

          {/* Tips */}
          <div className="processing-tips">
            {currentStepData.tips.map((tip, index) => (
              <div key={index} className="tip-item">
                <div className="tip-bullet"></div>
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Navigation */}
      <footer className="processing-footer">
        <button className="back-btn" onClick={onBack}>
          <div className="back-icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 2L6 8L10 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span>BACK</span>
        </button>
      </footer>

      {/* Decorative Elements */}
      <div className="decorative-diamond"></div>
    </div>
  );
};

export default ProcessingPage;
