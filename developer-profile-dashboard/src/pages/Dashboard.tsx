import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import UserProfileCard from '../components/UserProfileCard';
import StatusUpdateForm from '../components/StatusUpdateForm';
import '../styles/Dashboard.css';

const Dashboard: React.FC = () => {
  const { user, isLoading, error } = useAuth();

  if (isLoading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading your data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <p>{error}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="dashboard-error">
        <p>Please login to see your dashboard</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome, {user.name}!</h1>
        <p className="dashboard-subtitle">Your developer dashboard is ready</p>
      </div>
      
      <div className="dashboard-content">
        <div className="dashboard-main">
          <StatusUpdateForm />
          
          <div className="dashboard-analytics card">
            <h3>Developer Activity</h3>
            <div className="activity-stats">
              <div className="stat-item">
                <div className="stat-value">12</div>
                <div className="stat-label">Projects</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">156</div>
                <div className="stat-label">Commits</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">5</div>
                <div className="stat-label">Pull Requests</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="dashboard-sidebar">
          <UserProfileCard user={user} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;