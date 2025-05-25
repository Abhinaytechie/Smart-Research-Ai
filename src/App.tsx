import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { PaperProvider } from './context/PaperContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Dashboard from './pages/Dashboard';
import Bookmarks from './pages/Bookmarks';

import Auth from './pages/Auth';
import HomePage from './pages/HomePage';
import UserProfile from './pages/UserProfile';
import PaperDetails from './pages/PaperDetails';
import MarkdownPreviewer from './pages/MarkdownPreviwer';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/auth" />;
  return <>{children}</>;
};

const storedUser = localStorage.getItem('username');
const userName = storedUser ?? "User";

const AppRoutes = () => {
  const location = useLocation(); // ✅ Use hook here

  return (
    <Routes>
      <Route
        path="/auth"
        element={
          <>
            <Navbar />
            <Auth />
          </>
        }
      />
      <Route path="/papers/:id" element={<PaperDetails />} />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <>
              <Navbar />
              <UserProfile />
            </>
          </ProtectedRoute>
        }
      />
      <Route
        path="/"
        element={
          <>
            <Navbar />
            <HomePage />
          </>
        }
      />
      <Route
        path="/bookmarks"
        element={
          <>
            <Navbar />
            <Bookmarks />
          </>
        }
      />
      <Route
        path="/dashboard"
        element={
          <>
            <Navbar />
            <Dashboard key={location.key} /> {/* ✅ Use location.key to remount */}
          </>
        }
      />
      <Route
        path="/notes"
        element={
         
            <>
              <Navbar />
              <MarkdownPreviewer key={location.key}/>
            </>
          
        }
      />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <PaperProvider>
          <div className="min-h-screen bg-black text-white">
            <AppRoutes />
          </div>
        </PaperProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
