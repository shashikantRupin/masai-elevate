import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';
import '../styles/NotFound.css';

const NotFound: React.FC = () => {
  return (
    <div className="not-found-container">
      <AlertTriangle size={64} className="not-found-icon" />
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>Sorry, the page you're looking for doesn't exist or has been moved.</p>
      <Link to="/" className="btn btn-primary">
        <Home size={18} />
        <span>Back to Home</span>
      </Link>
    </div>
  );
};

export default NotFound;