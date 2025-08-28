import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const Animation = ({ children, leftTriangleRef, rightTriangleRef, onHoverStart, onHoverEnd }) => {
  const mainHeadingRef = useRef(null);
  const leftSideRef = useRef(null);
  const rightSideRef = useRef(null);

  // Animation functions
  const animateToRight = () => {
    console.log('Animating to right'); // Debug log
    
    gsap.to(mainHeadingRef.current, {
      x: '65%',
      duration: 0.4,
      ease: 'power2.out'
    });
    
    // Fade out RIGHT side (button + triangle)
    gsap.to([rightSideRef.current, rightTriangleRef.current], {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.out'
    });
  };

  const animateToLeft = () => {
    console.log('Animating to left'); // Debug log
    
    gsap.to(mainHeadingRef.current, {
      x: '-65%',
      duration: 0.4,
      ease: 'power2.out'
    });
    
    // Fade out LEFT side (button + triangle)
    gsap.to([leftSideRef.current, leftTriangleRef.current], {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.out'
    });
  };

  const resetAnimation = () => {
    console.log('Resetting animation'); // Debug log
    
    gsap.to(mainHeadingRef.current, {
      x: 0,
      duration: 0.4,
      ease: 'power2.out'
    });
    
    // Fade in both sides (buttons + triangles)
    gsap.to([leftSideRef.current, rightSideRef.current, leftTriangleRef.current, rightTriangleRef.current], {
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
      
      {/* Left side container */}
      <div ref={leftSideRef} className="left-side">
        {childrenWithProps[0]}
      </div>
      
      {/* Right side container */}
      <div ref={rightSideRef} className="right-side">
        {childrenWithProps[1]}
      </div>
    </div>
  );
};

export default Animation;
