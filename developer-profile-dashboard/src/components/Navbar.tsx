import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ThemeToggle from './ThemeToggle';
import { Code, LogOut, Info } from 'lucide-react';
import '../styles/Navbar.css';

const Navbar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  
  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="logo">
          <Code size={24} />
          <span>DevBoard</span>
        </Link>
        
        <div className="nav-items">
          {isAuthenticated && (
            <Link 
              to="/dashboard" 
              className={location.pathname === '/dashboard' ? 'nav-link active' : 'nav-link'}
            >
              Dashboard
            </Link>
          )}
          
          <Link 
            to="/about" 
            className={location.pathname === '/about' ? 'nav-link active' : 'nav-link'}
          >
            <Info size={16} />
            <span>About</span>
          </Link>
          
          <div className="nav-actions">
            <ThemeToggle />
            
            {isAuthenticated && (
              <button className="logout-btn" onClick={logout}>
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;