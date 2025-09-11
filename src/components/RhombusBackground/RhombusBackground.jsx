import React from 'react';
import { ReactComponent as RhombusesAroundDemographics } from '../../assets/rhombuses-around-demographics.svg';
import './RhombusBackground.css';

const RhombusBackground = ({ 
  size = 'medium', 
  opacity = 0.8, 
  className = '' 
}) => {
  return (
    <div 
      className={`rhombus-background rhombus-${size} ${className}`}
      style={{ opacity: opacity }}
    >
      <RhombusesAroundDemographics />
    </div>
  );
};

export default RhombusBackground;
