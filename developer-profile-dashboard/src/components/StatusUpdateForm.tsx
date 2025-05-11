import React, { useState, useRef, useEffect } from 'react';
import { useToast } from '../contexts/ToastContext';
import { getStoredStatus, storeStatus } from '../utils/storage';
import { MessageSquare, Edit } from 'lucide-react';
import '../styles/StatusUpdateForm.css';

const StatusUpdateForm: React.FC = () => {
  const [status, setStatus] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const statusInputRef = useRef<HTMLInputElement>(null);
  const { addToast } = useToast();
  
  useEffect(() => {
    // Load status from localStorage on component mount
    const savedStatus = getStoredStatus();
    if (savedStatus) {
      setStatus(savedStatus);
    }
  }, []);
  
  const handleEditClick = () => {
    setIsEditing(true);
    // Use setTimeout to ensure the input is rendered before trying to focus
    setTimeout(() => {
      if (statusInputRef.current) {
        statusInputRef.current.focus();
      }
    }, 0);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Trim status to remove extra whitespace
    const trimmedStatus = status.trim();
    
    if (trimmedStatus) {
      // Save status to localStorage
      storeStatus(trimmedStatus);
      setStatus(trimmedStatus);
      addToast('Status updated successfully!', 'success');
    }
    
    setIsEditing(false);
  };
  
  return (
    <div className="status-card card">
      <div className="status-header">
        <h3>
          <MessageSquare size={18} />
          Developer Status
        </h3>
        {!isEditing && (
          <button 
            className="edit-btn"
            onClick={handleEditClick}
            aria-label="Edit status"
          >
            <Edit size={16} />
            Edit Status
          </button>
        )}
      </div>
      
      {!isEditing ? (
        <div className="status-display">
          {status ? (
            <p className="status-message">{status}</p>
          ) : (
            <p className="status-empty">No status set. Click "Edit Status" to set your status.</p>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="status-form">
          <div className="form-group">
            <label htmlFor="status" className="form-label">What are you working on?</label>
            <input
              ref={statusInputRef}
              type="text"
              id="status"
              className="form-input"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              placeholder="e.g., Coding an awesome React app..."
            />
          </div>
          <div className="form-buttons">
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Update Status
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default StatusUpdateForm;