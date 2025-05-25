import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { BrowserRouter as Router } from 'react-router-dom';

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

// Animation variants for page transition
const pageVariants = {
  initial: { opacity: 0, x: 20 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: -20 },
};

const pageTransition = {
  type: 'tween',
  ease: 'easeInOut',
  duration: 0.3,
};

const AppRoutes = () => {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route
            path="/auth"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Auth />
              </motion.div>
            }
          />

          <Route
            path="/papers/:id"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <PaperDetails />
              </motion.div>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <UserProfile />
                </motion.div>
              </ProtectedRoute>
            }
          />

          <Route
            path="/"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <HomePage />
              </motion.div>
            }
          />

          <Route
            path="/bookmarks"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Bookmarks />
              </motion.div>
            }
          />

          <Route
            path="/dashboard"
            element={
              <motion.div
                key={location.key} // optional
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Dashboard />
              </motion.div>
            }
          />

          <Route
            path="/notes"
            element={
              <motion.div
                key={location.key} // optional
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <MarkdownPreviewer />
              </motion.div>
            }
          />
        </Routes>
      </AnimatePresence>
    </>
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
