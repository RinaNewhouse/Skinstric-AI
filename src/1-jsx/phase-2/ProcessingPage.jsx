import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import AnimatedSquares from '../../components/AnimatedSquares/AnimatedSquares';
import Button from '../../components/Button/Button';
import { ReactComponent as BackButton } from '../../assets/back-button-clean.svg';
import '../../2-css/phase-2/ProcessingPage.css';

const ProcessingPage = ({ imageData, onBack, onAnalysisComplete }) => {
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (imageData) {
      uploadImageForAnalysis(imageData);
    }
  }, [imageData]);

  const uploadImageForAnalysis = async (base64Image) => {
    try {
      setIsProcessing(true);
      setError(null);
      
      console.log('Uploading image for demographic analysis...');
      
      // Extract pure base64 string from data URL
      const pureBase64 = base64Image.split(',')[1];
      console.log('Base64 length:', pureBase64.length);
      console.log('First 50 chars:', pureBase64.substring(0, 50));
      
      const response = await fetch('https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseTwo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "image": pureBase64
        })
      });

      if (!response.ok) {
        throw new Error(`API call failed: ${response.status}`);
      }

      const result = await response.json();
      console.log('Analysis complete:', result);
      console.log('API response data:', result.data);
      console.log('Calling onAnalysisComplete with data:', result.data);
      
      // Pass the demographic data to the parent component
      onAnalysisComplete(result.data);
      
    } catch (err) {
      console.error('Analysis error:', err);
      setError('Failed to analyze image. Please try again.');
      setIsProcessing(false);
    }
  };

  const handleBack = () => {
    onBack();
  };

  if (error) {
    return (
      <div className="processing-page">
        <Header />
        <AnimatedSquares />
        <div className="content-wrapper">
          <div className="error-message">
            <h2>Analysis Failed</h2>
            <p>{error}</p>
            <Button 
              text="TRY AGAIN"
              position="center"
              onClick={() => uploadImageForAnalysis(imageData)}
            />
          </div>
        </div>
        <div className="navigation-buttons">
          <Button 
            icon={BackButton}
            text="BACK"
            position="left"
            onClick={handleBack}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="processing-page">
      <Header />
      <AnimatedSquares />
      
      <div className="content-wrapper">
        <div className="processing-container">
          <div className="processing-header">
            <span>SKINSTRIC [ANALYSIS]</span>
          </div>
          
          <div className="processing-content">
            <div className="processing-text">
              <h2>PREPARING YOUR ANALYSIS...</h2>
              <p>A.I. IS PROCESSING YOUR IMAGE</p>
            </div>
            
            <div className="processing-steps">
              <div className="step-item">
                <div className="step-bullet"></div>
                <span>ANALYZING SKIN TONE</span>
              </div>
              <div className="step-item">
                <div className="step-bullet"></div>
                <span>DETECTING FEATURES</span>
              </div>
              <div className="step-item">
                <div className="step-bullet"></div>
                <span>GENERATING RECOMMENDATIONS</span>
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
          onClick={handleBack}
        />
      </div>
    </div>
  );
};

export default ProcessingPage;
