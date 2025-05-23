import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User } from '../types';
import { LogOut } from 'lucide-react';  // optional icon for logout button

const ProfileMenu: React.FC = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  if (!user) return null; // no user, no profile icon

  const toggleDropdown = () => setOpen(prev => !prev);

  return (
    <div className="relative inline-block text-left">
      {/* Profile icon */}
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-700 text-white focus:outline-none"
        aria-haspopup="true"
        aria-expanded={open}
      >
        {/* You can replace this with user initials or profile pic */}
        <span>{user.username.charAt(0).toUpperCase()}</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
          role="menu"
        >
          <div className="py-1">
            {/* Profile info or link can go here if you want */}
            <button
              onClick={() => {
                logout();
                setOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
              role="menuitem"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
