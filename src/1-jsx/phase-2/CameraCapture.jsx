import React, { useState, useRef, useEffect } from 'react';
import Header from '../../components/Header/Header';
import AnimatedSquares from '../../components/AnimatedSquares/AnimatedSquares';
import Button from '../../components/Button/Button';
import { ReactComponent as BackButton } from '../../assets/back-button-clean.svg';
import '../../2-css/phase-2/CameraCapture.css';

const CameraCapture = ({ onBack, onImageCaptured }) => {
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
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
    } catch (err) {
      setError('Camera access denied. Please allow camera permissions.');
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
            <p>Please refresh the page and allow camera permissions.</p>
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
      </div>

      <div className="navigation-buttons">
        <Button 
          icon={BackButton}
          text="BACK"
          position="left"
          onClick={handleBack}
        />
        <button 
          className="capture-button"
          onClick={captureImage}
          disabled={isCapturing || !stream}
        >
          {isCapturing ? 'CAPTURING...' : 'CAPTURE'}
        </button>
      </div>
    </div>
  );
};

export default CameraCapture;
