import React, { useState, useEffect } from 'react';
import { Menu, Upload, BookmarkIcon, History, X,LogIn} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Button from '../common/Button';
import Auth from '../../pages/Auth';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Track scrolling for navbar background change
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
  { label: 'Dashboard', path: '/dashboard', icon: <Upload size={20} /> },
  { label: 'Bookmarks', path: '/bookmarks', icon: <BookmarkIcon size={20} /> },
  { label: 'History', path: '/history', icon: <History size={20} /> },
  { label: 'Signup', path: '/auth', icon: <LogIn size={20} /> }
];


  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/90 backdrop-blur-sm shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center mr-2">
                <span className="text-black font-bold text-xl">R</span>
              </div>
              <span className="text-white font-semibold text-xl hidden md:block">
                Research<span className="text-orange-500">AI</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg flex items-center transition-all duration-300 ${
                  isActive(link.path)
                    ? ' text-orange-500'
                    : 'text-gray-400 hover:text-orange-400 animation'
                }`}
              >
                <span className="mr-2">{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-400 hover:text-orange-500 focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden transition-all duration-300 ${
          isMobileMenuOpen 
            ? 'max-h-60 opacity-100 border-b border-gray-800 bg-black' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <nav className="container mx-auto px-4 py-3 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`py-3 px-4 rounded-lg flex items-center transition-all duration-300 ${
                isActive(link.path)
                  ? 'bg-gray-800 text-orange-500'
                  : 'text-gray-400 hover:text-orange-400 hover:bg-gray-900/60'
              }`}
            >
              <span className="mr-3">{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;