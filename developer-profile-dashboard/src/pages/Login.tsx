import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Code, LogIn } from 'lucide-react';
import '../styles/Login.css';

const Login: React.FC = () => {
  const { login, isAuthenticated, isLoading, error } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get the page the user was trying to access before being redirected to login
  const from = location.state?.from?.pathname || '/dashboard';
  
  // If already authenticated, redirect to the intended page
  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }
  
  const handleLogin = async () => {
    await login();
    navigate(from, { replace: true });
  };
  
  return (
    <div className="login-container">
      <div className="login-card card">
        <div className="login-header">
          <Code size={32} className="login-logo" />
          <h1>DevBoard</h1>
          <p className="login-subtitle">Your Developer Dashboard</p>
        </div>
        
        {error && (
          <div className="login-error">
            {error}
          </div>
        )}
        
        <button
          className="btn btn-primary login-btn"
          onClick={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <div className="btn-spinner"></div>
              <span>Logging in...</span>
            </>
          ) : (
            <>
              <LogIn size={18} />
              <span>Login</span>
            </>
          )}
        </button>
        
        <p className="login-info">
          This will simulate a login and fetch your profile from JSONPlaceholder.
        </p>
      </div>
    </div>
  );
};

export default Login;