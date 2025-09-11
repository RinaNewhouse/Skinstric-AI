import React, { useState, useEffect } from 'react';
import { ReactComponent as LinesAroundPreparing } from '../../assets/lines-around-preparing-your-analysis.svg';
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
      
      // Wait 2 seconds to show the processing page longer
      setTimeout(() => {
        // Pass the demographic data to the parent component
        onAnalysisComplete(result.data);
      }, 2000);
      
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
        <div className="error-container">
          <h2>Analysis Failed</h2>
          <p>{error}</p>
          <button onClick={() => uploadImageForAnalysis(imageData)}>
            TRY AGAIN
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="processing-page">
      <div className="processing-container">
        {/* Rotating Diamond Lines Animation */}
        <div className="rotating-lines">
          <LinesAroundPreparing />
        </div>
        
        {/* Text centered inside the diamonds */}
        <div className="processing-text">
          <h1>PREPARING YOUR ANALYSIS...</h1>
        </div>
      </div>
    </div>
  );
};

export default ProcessingPage;
