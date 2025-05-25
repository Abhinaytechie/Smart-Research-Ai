import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Menu, Upload, BookmarkIcon, NotebookIcon, X, LogIn } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Adjust this import path

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [loggedIn, setLoggedIn] = useState(() => !!localStorage.getItem('token'));
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);

  const desktopDropdownRef = useRef<HTMLDivElement>(null);
  const desktopDropdownBtnRef = useRef<HTMLButtonElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownBtnRef = useRef<HTMLButtonElement>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const username = user?.username ?? 'User';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => setLoggedIn(!!localStorage.getItem('token'));
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    const handleLogin = () => setLoggedIn(true);
    window.addEventListener('login', handleLogin);
    return () => window.removeEventListener('login', handleLogin);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setDesktopDropdownOpen(false);
    setMobileDropdownOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        desktopDropdownOpen &&
        desktopDropdownRef.current &&
        !desktopDropdownRef.current.contains(target) &&
        desktopDropdownBtnRef.current &&
        !desktopDropdownBtnRef.current.contains(target)
      ) {
        setDesktopDropdownOpen(false);
        desktopDropdownBtnRef.current.focus();
      }
      if (
        mobileDropdownOpen &&
        mobileDropdownRef.current &&
        !mobileDropdownRef.current.contains(target) &&
        mobileDropdownBtnRef.current &&
        !mobileDropdownBtnRef.current.contains(target)
      ) {
        setMobileDropdownOpen(false);
        mobileDropdownBtnRef.current.focus();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [desktopDropdownOpen, mobileDropdownOpen]);

  const handleDesktopKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setDesktopDropdownOpen((open) => !open);
    } else if (e.key === 'Escape') {
      setDesktopDropdownOpen(false);
      desktopDropdownBtnRef.current?.focus();
    }
  };

  const handleMobileKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setMobileDropdownOpen((open) => !open);
    } else if (e.key === 'Escape') {
      setMobileDropdownOpen(false);
      mobileDropdownBtnRef.current?.focus();
    }
  };

  const navLinks = [
    { label: 'Dashboard', path: '/dashboard', icon: <Upload size={20} /> },
    { label: 'Bookmarks', path: '/bookmarks', icon: <BookmarkIcon size={20} /> },
    { label: 'Notes', path: '/notes', icon: <NotebookIcon size={20} /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setDesktopDropdownOpen(false);
    setMobileDropdownOpen(false);
    navigate('/auth');
  }, [navigate]);

  const getInitials = (name: string | undefined) => {
    if (!name || typeof name !== 'string') return 'U';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  const initial = useMemo(() => getInitials(username), [username]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center select-none">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center mr-2">
              <span className="text-black font-bold text-xl">R</span>
            </div>
            <span className="text-white font-semibold text-xl hidden md:block">
              Research<span className="text-orange-500">AI</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-2 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg flex items-center transition-colors duration-300 focus:outline-none focus:ring-orange-500 ${
                  isActive(link.path)
                    ? 'text-orange-500 border-b-2 border-orange-500'
                    : 'text-gray-400 hover:text-orange-400'
                }`}
              >
                <span className="mr-2">{link.icon}</span>
                {link.label}
              </Link>
            ))}

            {!loggedIn ? (
              <Link
                to="/auth"
                className="px-4 py-2 rounded-lg flex items-center text-gray-400 hover:text-orange-400 transition focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <LogIn size={20} className="mr-2" />
                Signup
              </Link>
            ) : (
              <div className="relative" ref={desktopDropdownRef}>
                <button
                  ref={desktopDropdownBtnRef}
                  onClick={() => setDesktopDropdownOpen(!desktopDropdownOpen)}
                  onKeyDown={handleDesktopKeyDown}
                  className="p-2 rounded-full hover:bg-gray-800 transition focus:outline-none focus:ring-2 focus:ring-orange-500"
                  aria-haspopup="true"
                  aria-expanded={desktopDropdownOpen}
                  aria-label="Profile menu"
                  title={`Logged in as ${username}`}
                >
                  <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-black font-bold select-none shadow-md">
                    {initial}
                  </div>
                </button>

                <div
                  className={`absolute right-0 mt-2 w-40 bg-gray-900 rounded-lg shadow-lg py-2 z-50 transition-transform duration-200 origin-top-right ${
                    desktopDropdownOpen
                      ? 'scale-100 opacity-100'
                      : 'scale-95 opacity-0 pointer-events-none'
                  }`}
                  role="menu"
                  aria-hidden={!desktopDropdownOpen}
                >
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-700 transition"
                    onClick={() => setDesktopDropdownOpen(false)}
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
              </div>
            )}
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-white hover:text-orange-400 hover:bg-gray-800 transition duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <nav
          className={`md:hidden fixed top-16 left-0 right-0 bottom-0 bg-black/90 backdrop-blur-sm flex flex-col space-y-1 py-4 px-6 z-40 transform transition-transform duration-300 ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          aria-label="Mobile navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors duration-200 ${
                isActive(link.path)
                  ? 'bg-orange-600 text-white'
                  : 'text-gray-400 hover:bg-gray-700 hover:text-orange-400'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="mr-3">{link.icon}</span>
              {link.label}
            </Link>
          ))}

          {!loggedIn ? (
            <Link
              to="/auth"
              className="flex items-center px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-700 hover:text-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <LogIn size={20} className="mr-3" />
              Signup
            </Link>
          ) : (
            <div className="relative" ref={mobileDropdownRef}>
              <button
                ref={mobileDropdownBtnRef}
                onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                onKeyDown={handleMobileKeyDown}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-700 hover:text-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                aria-haspopup="true"
                aria-expanded={mobileDropdownOpen}
                aria-label="Profile menu"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-black font-bold select-none shadow-md mr-3">
                    {initial}
                  </div>
                  <span>{username}</span>
                </div>
                <svg
                  className={`transform transition-transform duration-200 ${
                    mobileDropdownOpen ? 'rotate-180' : ''
                  }`}
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>

              <div
                className={`mt-2 bg-gray-900 rounded-lg shadow-lg py-2 z-50 transition-transform duration-200 origin-top-right ${
                  mobileDropdownOpen
                    ? 'scale-100 opacity-100'
                    : 'scale-95 opacity-0 pointer-events-none'
                }`}
                role="menu"
                aria-hidden={!mobileDropdownOpen}
              >
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-700 transition"
                  onClick={() => {
                    setMobileDropdownOpen(false);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-700 transition"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
