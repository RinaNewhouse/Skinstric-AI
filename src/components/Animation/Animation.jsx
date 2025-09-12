import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const Animation = ({ children, leftTriangleRef, rightTriangleRef, onHoverStart, onHoverEnd }) => {
  const mainHeadingRef = useRef(null);
  const leftSideRef = useRef(null);
  const rightSideRef = useRef(null);
  const leftButtonRef = useRef(null);
  const rightButtonRef = useRef(null);

  // Get responsive slide distance based on screen size
  const getSlideDistance = () => {
    const screenWidth = window.innerWidth;
    
    if (screenWidth >= 1200) {
      return '60%'; // Desktop - good slide distance
    } else if (screenWidth >= 768) {
      return '40%'; // Tablet - medium slide
    } else {
      return '20%'; // Mobile - safe slide, won't go off-screen
    }
  };

  // Check if device is mobile
  const isMobile = () => {
    return window.innerWidth <= 768;
  };

  // Animation functions
  const animateToRight = () => {
    // Don't animate on mobile
    if (isMobile()) return;
    
    console.log('Animating to right'); // Debug log
    
    gsap.to(mainHeadingRef.current, {
      x: getSlideDistance(),
      textAlign: 'right',
      duration: 0.4,
      ease: 'power2.out'
    });
    
    // Fade out RIGHT side (button + triangle)
    gsap.to([rightSideRef.current, rightTriangleRef.current, rightButtonRef.current], {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.out'
    });
  };

  const animateToLeft = () => {
    // Don't animate on mobile
    if (isMobile()) return;
    
    console.log('Animating to left'); // Debug log
    
    gsap.to(mainHeadingRef.current, {
      x: `-${getSlideDistance()}`,
      textAlign: 'left',
      duration: 0.4,
      ease: 'power2.out'
    });
    
    // Fade out LEFT side (button + triangle)
    gsap.to([leftSideRef.current, leftTriangleRef.current, leftButtonRef.current], {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.out'
    });
  };

  const resetAnimation = () => {
    // Don't animate on mobile
    if (isMobile()) return;
    
    console.log('Resetting animation'); // Debug log
    
    gsap.to(mainHeadingRef.current, {
      x: 0,
      textAlign: 'center',
      duration: 0.4,
      ease: 'power2.out'
    });
    
    // Fade in both sides (buttons + triangles)
    gsap.to([leftSideRef.current, rightSideRef.current, leftTriangleRef.current, rightTriangleRef.current, leftButtonRef.current, rightButtonRef.current], {
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out'
    });
  };

  const handleHoverStart = (position) => {
    console.log('Hover start:', position); // Debug log
    
    if (position === 'left') {
      animateToRight();
    } else if (position === 'right') {
      animateToLeft();
    }
  };

  const handleHoverEnd = () => {
    console.log('Hover end'); // Debug log
    resetAnimation();
  };

  // Pass animation handlers to children
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        onHoverStart: handleHoverStart,
        onHoverEnd: handleHoverEnd
      });
    }
    return child;
  });

  return (
    <div className="main-content">
      {/* Main heading with ref */}
      <h1 ref={mainHeadingRef} className="main-heading">
        Sophisticated<br />skincare
      </h1>
      
      {/* Left side container - empty for GSAP targeting */}
      <div ref={leftSideRef} className="left-side"></div>
      
      {/* Right side container - empty for GSAP targeting */}
      <div ref={rightSideRef} className="right-side"></div>
      
      {/* Buttons as siblings to triangles */}
      <div ref={leftButtonRef}>
        {childrenWithProps[0]}
      </div>
      <div ref={rightButtonRef}>
        {childrenWithProps[1]}
      </div>
    </div>
  );
};

export default Animation;
