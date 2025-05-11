// Theme storage
export const getStoredTheme = (): 'light' | 'dark' => {
  const storedTheme = localStorage.getItem('theme');
  return (storedTheme === 'light' || storedTheme === 'dark') 
    ? storedTheme 
    : 'light'; // Default to light theme
};

export const storeTheme = (theme: 'light' | 'dark'): void => {
  localStorage.setItem('theme', theme);
};

// Auth storage
export const getStoredAuth = (): { isAuthenticated: boolean; userId: number | null } => {
  const storedAuth = localStorage.getItem('auth');
  
  if (storedAuth) {
    try {
      return JSON.parse(storedAuth);
    } catch (error) {
      console.error('Error parsing stored auth data:', error);
    }
  }
  
  return { isAuthenticated: false, userId: null };
};

export const storeAuth = (isAuthenticated: boolean, userId: number | null): void => {
  localStorage.setItem('auth', JSON.stringify({ isAuthenticated, userId }));
};

// Status message storage
export const getStoredStatus = (): string => {
  return localStorage.getItem('status') || '';
};

export const storeStatus = (status: string): void => {
  localStorage.setItem('status', status);
};