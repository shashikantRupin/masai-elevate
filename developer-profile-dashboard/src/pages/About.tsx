import React from 'react';
import { Code, Github, Layout, UserCircle, PanelLeft, Sun } from 'lucide-react';
import '../styles/About.css';

const About: React.FC = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <Code size={48} className="about-logo" />
        <h1>About DevBoard</h1>
        <p className="about-subtitle">
          A private dashboard for developers to manage their profile and status
        </p>
      </div>
      
      <div className="about-content">
        <div className="about-section">
          <h2>What is DevBoard?</h2>
          <p>
            DevBoard is a personal developer dashboard that helps you manage your
            profile information and share your current development status. It's
            designed to be simple, elegant, and focused on the needs of developers.
          </p>
        </div>
        
        <div className="about-section">
          <h2>Key Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <UserCircle size={24} />
              <h3>Developer Profile</h3>
              <p>View and manage your developer profile with ease.</p>
            </div>
            
            <div className="feature-card">
              <Layout size={24} />
              <h3>Status Updates</h3>
              <p>Share what you're working on with custom status messages.</p>
            </div>
            
            <div className="feature-card">
              <PanelLeft size={24} />
              <h3>Private Dashboard</h3>
              <p>Your personal space to organize your development activity.</p>
            </div>
            
            <div className="feature-card">
              <Sun size={24} />
              <h3>Theme Switching</h3>
              <p>Choose between light and dark themes for comfort.</p>
            </div>
            
            <div className="feature-card">
              <Github size={24} />
              <h3>Activity Tracking</h3>
              <p>Keep track of your development activity and progress.</p>
            </div>
          </div>
        </div>
        
        <div className="about-section">
          <h2>Technology Stack</h2>
          <p>
            DevBoard is built using modern web technologies including React,
            TypeScript, Context API for state management, and CSS for styling.
            The app demonstrates best practices in React development including
            component composition, hooks usage, and responsive design.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;