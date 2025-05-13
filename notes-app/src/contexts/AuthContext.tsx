import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is logged in on component mount
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call and validation
    try {
      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find((u: User & { password: string }) => 
        u.email === email && u.password === password
      );
      
      if (!user) {
        return false;
      }
      
      // Create a token (in a real app, this would be a JWT from backend)
      const token = `token_${Math.random().toString(36).substring(2)}`;
      
      // Store user info without password
      const { password: _, ...userWithoutPassword } = user;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      
      setUser(userWithoutPassword);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const signup = async (email: string, password: string): Promise<boolean> => {
    try {
      // Get existing users
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Check if user already exists
      if (users.some((u: User) => u.email === email)) {
        return false;
      }
      
      // Create new user
      const newUser = {
        id: `user_${Math.random().toString(36).substring(2)}`,
        email,
        password,
      };
      
      // Add user to users array
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};