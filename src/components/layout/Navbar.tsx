import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, Upload, BookmarkIcon, History, X, LogIn } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

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

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync login state on localStorage change (for multi-tab)
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


  // Close all menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setDesktopDropdownOpen(false);
    setMobileDropdownOpen(false);
  }, [location.pathname]);

  // Close dropdown if clicked outside
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

  // Keyboard handlers for dropdown buttons
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
    { label: 'History', path: '/history', icon: <History size={20} /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setDesktopDropdownOpen(false);
    setMobileDropdownOpen(false);
    navigate('/auth');
  }, [navigate]);

  const initial = "U";

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
                  ref={desktopDropdownBtnRef}
                  onClick={() => setDesktopDropdownOpen(!desktopDropdownOpen)}
                  onKeyDown={handleDesktopKeyDown}
                  className="p-2 rounded-full hover:bg-gray-800 transition focus:outline-none"
                  aria-haspopup="true"
                  aria-expanded={desktopDropdownOpen}
                  aria-label="Profile menu"
                >
                  <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-black font-bold">
                    {initial}
                  </div>
                </button>

                <div
                  className={`absolute right-0 mt-2 w-40 bg-gray-900 rounded shadow-lg py-2 z-50 transform transition-all duration-200 origin-top-right
                  ${desktopDropdownOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}
                  role="menu"
                  aria-hidden={!desktopDropdownOpen}
                >
                  <Link
                    to="/profile" 
                    className="block px-4 py-2 hover:bg-gray-700 transition"
                    onClick={() => setDesktopDropdownOpen(false)}
                    role="menuitem"
                    tabIndex={desktopDropdownOpen ? 0 : -1}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-700 transition"
                    role="menuitem"
                    tabIndex={desktopDropdownOpen ? 0 : -1}
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-400 hover:text-orange-500 focus:outline-none"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96 opacity-100 border-b border-gray-800 bg-black' : 'max-h-0 opacity-0'
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
                ref={mobileDropdownBtnRef}
                onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                onKeyDown={handleMobileKeyDown}
                className="flex items-center p-3 rounded-lg w-full hover:bg-gray-800 transition focus:outline-none"
                aria-haspopup="true"
                aria-expanded={mobileDropdownOpen}
                aria-label="Profile menu"
              >
                <div className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center text-black font-bold">
                  {initial}
                </div>
                <span className="ml-2 text-gray-400">Profile</span>
              </button>

              <div
                className={`mt-2 w-full bg-gray-900 rounded shadow-lg py-2 z-50 transform transition-all duration-200 origin-top
                ${mobileDropdownOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}
                role="menu"
                aria-hidden={!mobileDropdownOpen}
              >
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-700 transition"
                  onClick={() => setMobileDropdownOpen(false)}
                  role="menuitem"
                  tabIndex={mobileDropdownOpen ? 0 : -1}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-700 transition"
                  role="menuitem"
                  tabIndex={mobileDropdownOpen ? 0 : -1}
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
