import React from 'react';
import { useAuth } from '../context/AuthContext';  // Adjust path accordingly

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
      <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 rounded-3xl p-10 shadow-2xl max-w-md w-full text-white transform hover:scale-105 transition-transform duration-300">
        {/* Profile Header */}
        <div className="flex flex-col items-center space-y-4">
          {/* Initials Circle */}
          <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-purple-700 font-extrabold text-5xl select-none shadow-lg">
            {initials}
          </div>

          {/* Username & Role */}
          <h1 className="text-4xl font-bold tracking-wide">{username}</h1>
          <p className="text-lg uppercase font-semibold tracking-widest bg-white bg-opacity-20 px-4 py-1 rounded-full">
            {role}
          </p>

          {/* Status */}
          <p className="italic opacity-80 text-sm">{status}</p>

          {/* Bio */}
          <p className="mt-4 text-center text-base leading-relaxed opacity-90 px-6">
            {bio}
          </p>

          {/* Social Icons (simple placeholders) */}
          <div className="mt-6 flex space-x-6 text-white opacity-80 hover:opacity-100 transition-opacity duration-300">
            {/* ...your social icons SVG code here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
