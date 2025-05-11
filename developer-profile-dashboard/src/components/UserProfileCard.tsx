import React, { useRef } from 'react';
import { User } from '../types';
import { useToast } from '../contexts/ToastContext';
import { Copy, Building, Globe, Mail, Phone } from 'lucide-react';
import '../styles/UserProfileCard.css';

interface UserProfileCardProps {
  user: User;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({ user }) => {
  const { addToast } = useToast();
  const emailRef = useRef<HTMLDivElement>(null);

  const copyEmail = () => {
    if (user.email) {
      navigator.clipboard.writeText(user.email)
        .then(() => {
          addToast('Email copied to clipboard!', 'success');
        })
        .catch(() => {
          addToast('Failed to copy email', 'error');
        });
    }
  };

  return (
    <div className="user-profile-card card">
      <div className="user-profile-header">
        <div className="avatar">
          {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
        </div>
        <div className="user-info">
          <h2>{user.name}</h2>
          <div className="company">
            <Building size={16} />
            <span>{user.company.name}</span>
            <span className="badge badge-accent">Company</span>
          </div>
        </div>
      </div>
      
      <div className="divider"></div>
      
      <div className="contact-info">
        <div className="contact-item" ref={emailRef}>
          <Mail size={16} />
          <span>{user.email}</span>
          <button className="copy-btn" onClick={copyEmail} aria-label="Copy email">
            <Copy size={16} />
          </button>
        </div>
        
        <div className="contact-item">
          <Phone size={16} />
          <span>{user.phone}</span>
        </div>
        
        <div className="contact-item">
          <Globe size={16} />
          <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer">
            {user.website}
          </a>
        </div>
      </div>
      
      <div className="divider"></div>
      
      <div className="company-info">
        <p className="company-catchphrase">"{user.company.catchPhrase}"</p>
        <p className="company-bs">{user.company.bs}</p>
      </div>
    </div>
  );
};

export default UserProfileCard;