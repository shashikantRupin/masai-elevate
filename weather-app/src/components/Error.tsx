import React from 'react';
import { AlertCircle } from 'lucide-react';
import '../styles/Weather.css';

interface ErrorProps {
  message: string;
}

const Error: React.FC<ErrorProps> = ({ message }) => {
  return (
    <div className="error-container">
      <AlertCircle size={40} className="error-icon" />
      <p className="error-message">{message}</p>
    </div>
  );
};

export default Error;