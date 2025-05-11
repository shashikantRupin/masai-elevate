import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { AuthContextType, User } from '../types';
import { fetchUser } from '../utils/api';
import { getStoredAuth, storeAuth } from '../utils/storage';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is already authenticated in localStorage
    const { isAuthenticated: storedIsAuth, userId } = getStoredAuth();
    
    if (storedIsAuth && userId) {
      setIsLoading(true);
      fetchUser(userId)
        .then(userData => {
          setUser(userData);
          setIsAuthenticated(true);
        })
        .catch(err => {
          console.error('Failed to fetch user data on init:', err);
          setError('Failed to authenticate. Please log in again.');
          // Clear invalid auth data
          storeAuth(false, null);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  const login = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const userData = await fetchUser(1); // Fetching user ID 1 as per requirements
      setUser(userData);
      setIsAuthenticated(true);
      storeAuth(true, userData.id);
    } catch (err) {
      setError('Failed to log in. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = (): void => {
    setUser(null);
    setIsAuthenticated(false);
    storeAuth(false, null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};