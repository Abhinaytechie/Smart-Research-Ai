import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { PaperProvider } from './context/PaperContext';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Dashboard from './pages/Dashboard';
import Bookmarks from './pages/Bookmarks';
import History from './pages/History';
import Auth from './pages/Auth';
import HomePage from './pages/HomePage';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/auth" />;
  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <PaperProvider>
          <div className="min-h-screen bg-black text-white">
            <Routes>
              <Route path="/auth" element={
                <>
                      <Navbar />
                      <Auth />
                    </>
                } />
              <Route
                path="/"
                element={<>
                <Navbar/><HomePage/>
              </>
              }/>
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
                      <Dashboard />
                    </>
                  
                }
              />
              <Route
                path="/history"
                element={
                  <ProtectedRoute>
                    <>
                      <Navbar />
                      <History />
                    </>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </PaperProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;