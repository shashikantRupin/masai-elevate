import React from 'react';
import '../styles/Weather.css';

const Loading: React.FC = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p className="loading-text">Fetching weather data...</p>
    </div>
  );
};

export default Loading;