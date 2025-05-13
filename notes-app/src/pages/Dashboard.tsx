import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getUserNotes, createNote, deleteNote, Note } from '../models/Note';
import { LogOut, PlusCircle, Trash2 } from 'lucide-react';
import '../styles/dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState('');
  
  useEffect(() => {
    if (user) {
      loadNotes();
    }
  }, [user]);
  
  const loadNotes = () => {
    if (user) {
      const userNotes = getUserNotes(user.id);
      setNotes(userNotes);
    }
  };
  
  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !content) {
      setError('Please fill in all fields');
      return;
    }
    
    try {
      if (user) {
        createNote(user.id, title, content);
        loadNotes();
        setTitle('');
        setContent('');
        setError('');
        setIsCreating(false);
      }
    } catch (err) {
      setError('Error creating note');
    }
  };
  
  const handleDeleteNote = (noteId: string) => {
    try {
      const success = deleteNote(noteId);
      
      if (success) {
        loadNotes();
      }
    } catch (err) {
      console.error('Error deleting note:', err);
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="container">
          <h1>My Notes</h1>
          <div className="user-actions">
            {user && <span className="user-email">{user.email}</span>}
            <button className="logout-button" onClick={logout}>
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>
      
      <main className="dashboard-content container">
        <div className="create-note-container">
          {!isCreating ? (
            <button 
              className="create-note-button"
              onClick={() => setIsCreating(true)}
            >
              <PlusCircle size={20} />
              <span>Create New Note</span>
            </button>
          ) : (
            <div className="create-note-form">
              <h2>Create a New Note</h2>
              
              {error && <div className="note-error">{error}</div>}
              
              <form onSubmit={handleCreateNote}>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Note title"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="content">Content</label>
                  <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your note here..."
                    rows={5}
                  ></textarea>
                </div>
                
                <div className="form-actions">
                  <button 
                    type="button" 
                    className="cancel-button"
                    onClick={() => {
                      setIsCreating(false);
                      setTitle('');
                      setContent('');
                      setError('');
                    }}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="save-button">
                    Save Note
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
        
        <div className="notes-list">
          <h2>Your Notes</h2>
          
          {notes.length === 0 ? (
            <div className="empty-state">
              <p>You don't have any notes yet.</p>
              {!isCreating && (
                <button 
                  className="create-first-note"
                  onClick={() => setIsCreating(true)}
                >
                  Create your first note
                </button>
              )}
            </div>
          ) : (
            <div className="notes-grid">
              {notes.map((note) => (
                <div key={note.id} className="note-card">
                  <div className="note-header">
                    <h3>{note.title}</h3>
                    <button 
                      className="delete-note"
                      onClick={() => handleDeleteNote(note.id)}
                      aria-label="Delete note"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <div className="note-content">
                    <p>{note.content}</p>
                  </div>
                  <div className="note-footer">
                    <span className="note-date">
                      {formatDate(note.createdAt)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;