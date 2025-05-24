import React, { createContext, useContext, useState, ReactNode, useEffect, useRef } from 'react';
import { User, AuthContextType } from '../types';
import { usePaperContext } from '../context/PaperContext'; // adjust path as needed

import {
  login as loginApi,
  signup as signupApi,
  fetchUserDetails,
  bookmarkPaperApi,
  unbookmarkPaperApi
} from '../utils/api';

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

  // To hold the timeout ID for auto logout so we can clear if needed
  const logoutTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clear any existing logout timeout
  const clearLogoutTimeout = () => {
    if (logoutTimeoutRef.current) {
      clearTimeout(logoutTimeoutRef.current);
      logoutTimeoutRef.current = null;
    }
  };

  // Schedule auto logout based on token expiry (in ms)
  const scheduleAutoLogout = (expiryTimeMs: number) => {
    const timeout = expiryTimeMs - Date.now();
    if (timeout > 0) {
      logoutTimeoutRef.current = setTimeout(() => {
        logout();
      }, timeout);
    } else {
      // If expired already, logout immediately
      logout();
    }
  };

  // Login function with fetching bookmarks + history
  const login = async (username: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const userData = await loginApi(username, password); // { username, token, ... }
      const userDetails = await fetchUserDetails(userData.token); // { bookmarks: [...], history: [...] }

      setUser({ ...userData, bookmarks: userDetails.bookmarks });
      localStorage.setItem('token', userData.token);
      localStorage.setItem('username',userData.username);
      window.dispatchEvent(new Event('login'));


      // Setup auto logout based on token exp
      const payload = JSON.parse(atob(userData.token.split('.')[1]));
      if (payload.exp) {
        scheduleAutoLogout(payload.exp * 1000);
      }
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
    const userData = await signupApi(username, password); // expects token in response
    setUser(userData);
    localStorage.setItem('token', userData.token);

    const payload = JSON.parse(atob(userData.token.split('.')[1]));
    if (payload.exp) {
      scheduleAutoLogout(payload.exp * 1000);
    }
  } catch (err: any) {
  if (err.response && err.response.data && err.response.data.error) {
    setError(err.response.data.error); // shows "Username already exists"
  } else if (err instanceof Error) {
    setError(err.message);
  } else {
    setError("Failed to signup");
  }
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

          // Schedule auto logout
          if (payload.exp) {
            scheduleAutoLogout(payload.exp * 1000);
          }
        } catch (e) {
          console.error("Failed to load user from token:", e);
          logout();
        }
      })();
    }
    // Clear timeout on unmount
    return () => {
      clearLogoutTimeout();
    };
  }, []);

  // Logout clears user and token and clears timeout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    clearLogoutTimeout();
  };

  // Add a bookmark (call backend + update state)
  const addBookmark = async (paperId: string) => {
    if (!user) return;
    try {
      await bookmarkPaperApi(paperId);
      await updateUserBookmarks(); // updates state with correct structure from backend
    } catch (err) {
      console.error("Failed to add bookmark:", err);
    }
  };

  const updateUserBookmarks = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const updatedUser = await fetchUserDetails(token);
      setUser(prevUser =>
        prevUser ? { ...prevUser, bookmarks: updatedUser.bookmarks } : prevUser
      );
    } catch (err) {
      console.error("Failed to update bookmarks:", err);
    }
  };

  const removeBookmark = async (paperId: string) => {
    if (!user) return;
    try {
      await unbookmarkPaperApi(paperId);
      await updateUserBookmarks();
    } catch (err) {
      console.error("Failed to remove bookmark:", err);
    }
  };

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
      updateUserBookmarks,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
