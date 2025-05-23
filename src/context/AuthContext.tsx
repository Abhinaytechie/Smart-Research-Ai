import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, AuthContextType } from '../types';
import { usePaperContext } from '../context/PaperContext'; // adjust path as needed

import { login as loginApi, signup as signupApi, fetchUserDetails, bookmarkPaper, unbookmarkPaper } from '../utils/api';

const AuthContext = createContext<AuthContextType>({} as AuthContextType);


export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { papers } = usePaperContext();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Login function with fetching bookmarks + history
  const login = async (username: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const userData = await loginApi(username, password); // { username, token, ... }
      const userDetails = await fetchUserDetails(userData.token); // { bookmarks: [...], history: [...] }

      setUser({ ...userData, bookmarks: userDetails.bookmarks });
      localStorage.setItem('token', userData.token);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  // Signup - similar to login but maybe no bookmarks yet
  const signup = async (username: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const userData = await signupApi(username, password);
      setUser(userData);
      localStorage.setItem('token', userData.token);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to signup');
    } finally {
      setIsLoading(false);
    }
  };

  // On mount, check token and load user data + bookmarks/history
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      (async () => {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          const username = payload.sub || payload.username;
          const userDetails = await fetchUserDetails(token);
          setUser({
            username,
            token,
            email: payload.email,
            roles: payload.roles,
            bookmarks: userDetails.bookmarks,
            
          });
        } catch (e) {
          console.error("Failed to load user from token:", e);
          logout();
        }
      })();
    }
  }, []);

  // Logout clears user and token
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  // Add a bookmark (call backend + update state)
  const addBookmark = async (paperId: string) => {
  if (!user) return;
  try {
    await bookmarkPaper(paperId);
    
    const paper = papers.find(p => p.id === paperId);
    if (!paper) return;

    setUser(prev =>
      prev ? { ...prev, bookmarks: [...prev.bookmarks, paper] } : prev
    );
  } catch (err) {
    console.error("Failed to add bookmark:", err);
  }
};


const removeBookmark = async (paperId: string) => {
  if (!user) return;
  try {
    await unbookmarkPaper(paperId);
    setUser(prev =>
      prev
        ? { ...prev, bookmarks: prev.bookmarks.filter(p => p.id !== paperId) }
        : prev
    );
  } catch (err) {
    console.error("Failed to remove bookmark:", err);
  }
};
  // Remove a bookmark (call backend + update state)
 


  return (
    <AuthContext.Provider value={{
      user,
      login,
      signup,
      logout,
      isLoading,
      error,
      addBookmark,
      removeBookmark,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
