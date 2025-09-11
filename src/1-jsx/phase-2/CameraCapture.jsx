import React, { useState, useRef, useEffect } from 'react';
import Header from '../../components/Header/Header';
import AnimatedSquares from '../../components/AnimatedSquares/AnimatedSquares';
import Button from '../../components/Button/Button';
import { ReactComponent as BackButton } from '../../assets/back-button-clean.svg';
import { ReactComponent as BackButtonWhite } from '../../assets/back-button-white.svg';
import { ReactComponent as ProceedButtonWhite } from '../../assets/proceed-button-white.svg';
import { ReactComponent as TakePicSVG } from '../../assets/take-pic.svg';
import { ReactComponent as CameraTextSVG } from '../../assets/camera-text-to-get-better-pic.svg';
import { ReactComponent as GreatShotSVG } from '../../assets/great-shot.svg';
import { ReactComponent as HeaderWhiteSVG } from '../../assets/header-white-when-camera-on.svg';
import '../../2-css/phase-2/CameraCapture.css';

const CameraCapture = ({ onBack, onImageCaptured }) => {
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState(null);
  const [isCheckingPermission, setIsCheckingPermission] = useState(true);
  const [isStartingCamera, setIsStartingCamera] = useState(false);
  const [photoTaken, setPhotoTaken] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    checkCameraPermission();
  }, []);

  // Add permission change listener
  useEffect(() => {
    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions.query({ name: 'camera' }).then(permission => {
        // Set up change listener
        permission.onchange = () => {
          console.log('Permission changed to:', permission.state);
          setPermissionStatus(permission.state);
          
          // If permission is now granted, start camera
          if (permission.state === 'granted') {
            startCamera();
          }
        };
      });
    }
  }, []);

  // Cleanup effect to stop camera when component unmounts
  useEffect(() => {
    return () => {
      console.log('Component unmounting, aggressive cleanup...');
      
      // Clear video element
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      
      // Stop all tracks
      if (stream) {
        stream.getTracks().forEach(track => {
          track.stop();
          track.enabled = false;
        });
      }
      
      // Force stop any remaining streams
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(activeStream => {
          activeStream.getTracks().forEach(track => {
            track.stop();
            track.enabled = false;
          });
        })
        .catch(() => {});
    };
  }, [stream]);

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
    if (isStartingCamera) return; // Prevent multiple starts
    
    try {
      setIsStartingCamera(true);
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
      setIsStartingCamera(false);
    } catch (err) {
      console.error('Camera error:', err);
      setIsLoading(false);
      setIsStartingCamera(false);
      
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
    
    // Set photo taken state
    setPhotoTaken(true);
    
    // Stop camera stream
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }

    // Pass base64 image to parent
    onImageCaptured(base64Image);
  };

  const handleProceed = () => {
    console.log('Proceeding with captured image...');
    // The image is already captured and passed to parent
    // This just handles the UI transition
  };

  const handleBack = () => {
    console.log('Stopping camera stream aggressively...');
    
    // 1. Clear video element immediately
    if (videoRef.current) {
      videoRef.current.srcObject = null;
      videoRef.current.load(); // Force reload
    }
    
    // 2. Stop all tracks aggressively
    if (stream) {
      stream.getTracks().forEach(track => {
        console.log('Stopping track aggressively:', track);
        track.stop();
        track.enabled = false; // Force disable
      });
    }
    
    // 3. Force stop any active media streams globally
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(activeStream => {
        activeStream.getTracks().forEach(track => {
          track.stop();
          track.enabled = false;
        });
      })
      .catch(() => {}); // Ignore errors
    
    // 4. Reset all state
    setStream(null);
    setIsLoading(false);
    setIsCapturing(false);
    setError(null);
    
    // 5. Small delay to ensure cleanup
    setTimeout(() => {
      console.log('Camera stream cleanup completed');
      onBack();
    }, 100);
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
      <div className="camera-container">
        {/* Camera Feed - Full Screen Background */}
        {stream && (
          <video
            ref={videoRef}
            className="camera-feed"
            autoPlay
            playsInline
            muted
            onLoadedMetadata={() => console.log('Video metadata loaded')}
            onCanPlay={() => console.log('Video can play')}
            onPlay={() => console.log('Video started playing')}
            onError={(e) => console.error('Video error:', e)}
          />
        )}
        
        {/* Hidden canvas for capture */}
        <canvas ref={canvasRef} style={{ display: 'none' }} />
        
        {/* Header - Top */}
        {stream && (
          <div className="header-overlay">
            <HeaderWhiteSVG />
          </div>
        )}
        
        {/* Before Photo State */}
        {stream && !photoTaken && (
          <>
            {/* Take Picture Button - Right Side */}
            <div className="take-pic-button" onClick={captureImage}>
              <TakePicSVG />
            </div>
            
            {/* Instructions - Bottom */}
            <div className="instructions-overlay">
              <CameraTextSVG />
            </div>
          </>
        )}
        
        {/* After Photo State */}
        {photoTaken && (
          <>
            {/* Great Shot Text - Above Photo */}
            <div className="great-shot-overlay">
              <GreatShotSVG />
            </div>
            
            {/* Instructions - Bottom */}
            <div className="instructions-overlay">
              <CameraTextSVG />
            </div>
            
            {/* Navigation Buttons - Bottom */}
            <div className="navigation-overlay">
              <div className="nav-button" onClick={handleBack}>
                <BackButtonWhite />
              </div>
              <div className="nav-button" onClick={handleProceed}>
                <ProceedButtonWhite />
              </div>
            </div>
          </>
        )}
        
        {/* Error States */}
        {error && (
          <div className="error-overlay">
            <h2>Camera Error</h2>
            <p>{error}</p>
            <div className="nav-button" onClick={handleBack}>
              <BackButtonWhite />
            </div>
          </div>
        )}
        
        {isLoading && (
          <div className="loading-overlay">
            <h2>Setting up camera...</h2>
            <p>Please wait while we initialize your camera.</p>
          </div>
        )}
        
        {permissionStatus === 'denied' && (
          <div className="permission-overlay">
            <h3>Camera Access Required</h3>
            <p>To take your photo, we need access to your camera. Please allow camera permissions in your browser settings and refresh the page.</p>
            <div className="nav-button" onClick={handleBack}>
              <BackButtonWhite />
            </div>
          </div>
        )}
        
        {permissionStatus === 'prompt' && (
          <div className="permission-overlay">
            <h3>Enable Camera</h3>
            <p>Click the button below to allow camera access and start taking your photo.</p>
            <Button 
              text="ENABLE CAMERA"
              position="center"
              onClick={startCamera}
              disabled={isStartingCamera}
              style={{
                backgroundColor: '#dc3545',
                border: '2px solid #ffc107',
                color: 'white'
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CameraCapture;
