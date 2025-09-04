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
  const [isLoading, setIsLoading] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState(null);
  const [isCheckingPermission, setIsCheckingPermission] = useState(true);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    checkCameraPermission();
  }, []);

  useEffect(() => {
    if (stream && videoRef.current) {
      console.log('Setting video srcObject...');
      videoRef.current.srcObject = stream;
      console.log('Video srcObject set');
    }
  }, [stream, videoRef.current]);

  const checkCameraPermission = async () => {
    try {
      console.log('Starting permission check...');
      setIsCheckingPermission(true);
      // Check if permissions API is supported
      if (navigator.permissions && navigator.permissions.query) {
        console.log('Permissions API supported, querying...');
        const permission = await navigator.permissions.query({ name: 'camera' });
        console.log('Permission result:', permission.state);
        setPermissionStatus(permission.state);
        
        // If permission is already granted, start camera immediately
        if (permission.state === 'granted') {
          startCamera();
        }
      } else {
        console.log('Permissions API not supported, using fallback');
        // Fallback for browsers that don't support permissions API
        setPermissionStatus('prompt');
      }
      console.log('Setting isCheckingPermission to false');
      setIsCheckingPermission(false);
    } catch (err) {
      console.error('Permission check error:', err);
      setPermissionStatus('prompt');
      setIsCheckingPermission(false);
    }
  };

  const startCamera = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      console.log('Starting camera...');
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        } 
      });
      
      console.log('Camera stream obtained:', mediaStream);
      console.log('Stream tracks:', mediaStream.getTracks());
      
      setStream(mediaStream);
      
      setIsLoading(false);
      
      // Re-check permission after camera starts
      await checkCameraPermission();
    } catch (err) {
      console.error('Camera error:', err);
      setIsLoading(false);
      
      if (err.name === 'NotAllowedError') {
        setError('Camera access denied. Please allow camera permissions and try again.');
        setPermissionStatus('denied');
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
    console.log('Stopping camera stream...');
    if (stream) {
      stream.getTracks().forEach(track => {
        console.log('Stopping track:', track);
        track.stop();
      });
      setStream(null); // Reset stream state
    }
    console.log('Camera stream stopped');
    onBack();
  };

  if (isCheckingPermission) {
    return (
      <div className="camera-capture-page">
        <Header />
        <AnimatedSquares />
        <div className="content-wrapper">
          <div className="loading-message">
            <h2>Checking camera permissions...</h2>
            <p>Please wait while we check your camera settings</p>
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
        
        {console.log('Current permissionStatus:', permissionStatus)}
        {permissionStatus === 'prompt' ? (
          <div className="camera-setup">
            <div className="setup-instructions">
              <h3>Camera Setup</h3>
              <p>Click the button below to enable your camera</p>
              <Button 
                text="ENABLE CAMERA"
                position="left"
                onClick={startCamera}
                style={{ backgroundColor: 'red', color: 'white', padding: '20px', border: '2px solid yellow', fontSize: '16px', fontWeight: 'bold' }}
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
                onLoadedMetadata={() => console.log('Video metadata loaded')}
                onCanPlay={() => console.log('Video can play')}
                onPlay={() => console.log('Video started playing')}
                onError={(e) => console.error('Video error:', e)}
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
