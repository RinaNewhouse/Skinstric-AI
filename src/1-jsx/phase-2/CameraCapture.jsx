import React, { useState, useRef } from 'react';
import Header from '../../components/Header/Header';
import AnimatedSquares from '../../components/AnimatedSquares/AnimatedSquares';
import Button from '../../components/Button/Button';
import { ReactComponent as BackButton } from '../../assets/back-button-clean.svg';
import '../../2-css/phase-2/CameraCapture.css';

const CameraCapture = ({ onBack, onImageCaptured }) => {
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const startCamera = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        } 
      });
      
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setIsLoading(false);
    } catch (err) {
      console.error('Camera error:', err);
      setIsLoading(false);
      
      if (err.name === 'NotAllowedError') {
        setError('Camera access denied. Please allow camera permissions and try again.');
      } else if (err.name === 'NotFoundError') {
        setError('No camera found. Please check if your camera is connected.');
      } else {
        setError(`Camera error: ${err.message}`);
      }
    }
  };

  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return;

    setIsCapturing(true);
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Set canvas size to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert to base64
    const base64Image = canvas.toDataURL('image/jpeg', 0.8);
    
    // Stop camera stream
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }

    // Pass base64 image to parent
    onImageCaptured(base64Image);
  };

  const handleBack = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    onBack();
  };

  if (error) {
    return (
      <div className="camera-capture-page">
        <Header />
        <AnimatedSquares />
        <div className="content-wrapper">
          <div className="error-message">
            <h2>Camera Access Required</h2>
            <p>{error}</p>
            <Button 
              text="TRY AGAIN"
              position="center"
              onClick={startCamera}
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

  if (isLoading) {
    return (
      <div className="camera-capture-page">
        <Header />
        <AnimatedSquares />
        <div className="content-wrapper">
          <div className="loading-message">
            <h2>Setting up camera...</h2>
            <p>Please allow camera permissions when prompted</p>
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
    <div className="camera-capture-page">
      <Header />
      <AnimatedSquares />
      
      <div className="content-wrapper">
        <div className="camera-header">
          <span>TAKE A SELFIE</span>
        </div>
        
        {!stream ? (
          <div className="camera-setup">
            <div className="setup-instructions">
              <h3>Camera Setup</h3>
              <p>Click the button below to enable your camera</p>
              <Button 
                text="ENABLE CAMERA"
                position="center"
                onClick={startCamera}
              />
            </div>
          </div>
        ) : (
          <>
            <div className="camera-container">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="camera-feed"
              />
              <canvas ref={canvasRef} style={{ display: 'none' }} />
              
              <div className="capture-overlay">
                <div className="capture-frame"></div>
              </div>
            </div>
            
            <div className="capture-instructions">
              <p>Position your face in the frame and click capture</p>
            </div>
          </>
        )}
      </div>

      <div className="navigation-buttons">
        <Button 
          icon={BackButton}
          text="BACK"
          position="left"
          onClick={handleBack}
        />
        {stream && (
          <Button 
            text={isCapturing ? 'CAPTURING...' : 'CAPTURE'}
            position="right"
            onClick={captureImage}
            disabled={isCapturing}
          />
        )}
      </div>
    </div>
  );
};

export default CameraCapture;
