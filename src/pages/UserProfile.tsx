import React from 'react';
import { useAuth } from '../context/AuthContext';

interface UserProfileProps {
  role?: string;
  status?: string;
  bio?: string;
}

const UserProfile: React.FC<UserProfileProps> = ({
  role = 'Member',
  status = 'Active user',
  bio = "Passionate about technology, always eager to learn and grow.",
}) => {
  const { user } = useAuth();
  const username = user?.username ?? 'User';

  const getInitials = (name: string | undefined) => {
    if (!name || typeof name !== 'string') return 'U';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  const initials = getInitials(username);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-black to-blue-900 px-4">
      <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 rounded-3xl p-8 sm:p-10 shadow-2xl max-w-md w-full
                      transform hover:scale-105 transition-transform duration-300
                      sm:max-w-lg
                      ">
        {/* Profile Header */}
        <div className="flex flex-col items-center space-y-4">
          {/* Initials Circle */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white flex items-center justify-center
                          text-purple-700 font-extrabold text-4xl sm:text-5xl select-none shadow-lg">
            {initials}
          </div>

          {/* Username & Role */}
          <h1 className="text-3xl sm:text-4xl font-bold tracking-wide text-center break-words">{username}</h1>
          <p className="text-sm sm:text-lg uppercase font-semibold tracking-widest bg-white bg-opacity-20 px-4 py-1 rounded-full">
            {role}
          </p>

          {/* Status */}
          <p className="italic opacity-80 text-xs sm:text-sm">{status}</p>

          {/* Bio */}
          <p className="mt-4 text-center text-sm sm:text-base leading-relaxed opacity-90 px-4 sm:px-6">
            {bio}
          </p>

          {/* Social Icons */}
          <div className="mt-6 flex space-x-6 text-white opacity-80 hover:opacity-100 transition-opacity duration-300">
            {/* Placeholder SVG icons */}
            <svg
              className="w-6 h-6 sm:w-7 sm:h-7 cursor-pointer"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 001.88-2.38 8.59 8.59 0 01-2.73 1.04 4.28 4.28 0 00-7.29 3.9A12.13 12.13 0 013 4.9a4.28 4.28 0 001.33 5.72 4.22 4.22 0 01-1.94-.54v.05a4.28 4.28 0 003.44 4.2 4.28 4.28 0 01-1.93.07 4.29 4.29 0 004 3 8.6 8.6 0 01-5.33 1.83A8.75 8.75 0 012 19.54a12.1 12.1 0 006.56 1.92c7.88 0 12.2-6.53 12.2-12.2l-.01-.56A8.72 8.72 0 0024 5.27a8.46 8.46 0 01-2.54.7z" />
            </svg>

            <svg
              className="w-6 h-6 sm:w-7 sm:h-7 cursor-pointer"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 2.04c-5.5 0-10 4.48-10 10.02 0 4.41 2.87 8.15 6.84 9.48.5.1.68-.22.68-.48 0-.23-.01-.83-.01-1.63-2.78.6-3.37-1.35-3.37-1.35-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.05 1.53 1.05.9 1.55 2.36 1.1 2.94.84.09-.65.35-1.1.63-1.35-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.26-.45-1.28.1-2.67 0 0 .84-.27 2.75 1.02A9.58 9.58 0 0112 6.8c.85.01 1.71.12 2.51.35 1.9-1.29 2.74-1.02 2.74-1.02.56 1.39.21 2.41.11 2.67.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .26.18.59.69.49A10.01 10.01 0 0022 12.06c0-5.54-4.5-10.02-10-10.02z" />
            </svg>

            <svg
              className="w-6 h-6 sm:w-7 sm:h-7 cursor-pointer"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M7.75 2A5.75 5.75 0 002 7.75v8.5A5.75 5.75 0 007.75 22h8.5A5.75 5.75 0 0022 16.25v-8.5A5.75 5.75 0 0016.25 2h-8.5zm8.45 3.2a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4zM12 7.75a4.25 4.25 0 110 8.5 4.25 4.25 0 010-8.5z" />
              <circle cx="12" cy="12" r="2.5" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
