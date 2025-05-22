import React, { useState, useEffect, useRef } from 'react';
import { Menu, Upload, BookmarkIcon, History, X, LogIn, User } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);  // Fixed typo here
  const [loggedIn, setLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('loggedIn') === 'true';
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const desktopDropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);

  const location = useLocation();
  const navigate = useNavigate();

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Sync loggedIn state with localStorage
  useEffect(() => {
    localStorage.setItem('loggedIn', String(loggedIn));
  }, [loggedIn]);

  // Close dropdown if clicked outside (desktop or mobile dropdown)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        (desktopDropdownRef.current && !desktopDropdownRef.current.contains(target)) &&
        (mobileDropdownRef.current && !mobileDropdownRef.current.contains(target))
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { label: 'Dashboard', path: '/dashboard', icon: <Upload size={20} /> },
    { label: 'Bookmarks', path: '/bookmarks', icon: <BookmarkIcon size={20} /> },
    { label: 'History', path: '/history', icon: <History size={20} /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    console.log('Logging out...');
    localStorage.removeItem('loggedIn');
    setLoggedIn(false);
    setDropdownOpen(false);
    setIsMobileMenuOpen(false);
    navigate('/auth');
  };

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
          <nav className="hidden md:flex space-x-1 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg flex items-center transition-all duration-300 ${
                  isActive(link.path)
                    ? 'text-orange-500'
                    : 'text-gray-400 hover:text-orange-400 animation'
                }`}
              >
                <span className="mr-2">{link.icon}</span>
                {link.label}
              </Link>
            ))}

            {/* Auth/Profile Section */}
            {!loggedIn ? (
              <Link
                to="/auth"
                className="px-4 py-2 rounded-lg flex items-center text-gray-400 hover:text-orange-400 transition"
              >
                <LogIn size={20} className="mr-2" />
                Signup
              </Link>
            ) : (
              <div className="relative" ref={desktopDropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="p-2 rounded-full hover:bg-gray-800 transition focus:outline-none"
                  aria-label="Profile menu"
                >
                  <User size={28} />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-gray-900 rounded shadow-lg py-2 z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-700 transition"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-700 transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
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

          {/* Mobile Auth/Profile */}
          {!loggedIn ? (
            <Link
              to="/auth"
              className="py-3 px-4 rounded-lg flex items-center text-gray-400 hover:text-orange-400 hover:bg-gray-900/60 transition"
            >
              <LogIn size={20} className="mr-3" />
              Signup
            </Link>
          ) : (
            <div className="relative" ref={mobileDropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center p-3 rounded-lg w-full hover:bg-gray-800 transition focus:outline-none"
                aria-label="Profile menu"
              >
                <User size={24} />
                <span className="ml-2 text-gray-400">Profile</span>
              </button>

              {dropdownOpen && (
                <div className="mt-2 w-full bg-gray-900 rounded shadow-lg py-2 z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-700 transition"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-700 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
