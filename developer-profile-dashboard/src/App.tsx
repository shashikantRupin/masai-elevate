import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ToastProvider } from './contexts/ToastContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import NotFound from './pages/NotFound';
import PrivateRoute from './components/PrivateRoute';
import './styles/global.css';
import './styles/Loading.css';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <ToastProvider>
            <div className="app">
              <Navbar />
              <main>
                <Routes>
                  {/* Redirect root to login or dashboard */}
                  <Route path="/" element={<Navigate to="/login" replace />} />
                  
                  {/* Public routes */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/about" element={<About />} />
                  
                  {/* Protected routes */}
                  <Route element={<PrivateRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                  </Route>
                  
                  {/* 404 route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </ToastProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;