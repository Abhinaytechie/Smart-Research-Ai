import React from 'react';

interface UserProfileProps {
  username: string;
  role?: string;
  status?: string;
  bio?: string;

}

const UserProfile: React.FC<UserProfileProps> = ({
  username,
  role = 'Member',
  status = 'Active user',
  bio = "Passionate about technology, always eager to learn and grow.",
 
}) => {
  const getInitials = (name: string) => {
    if (!name) return 'U';
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
            <a href="#" aria-label="Twitter" className="hover:text-cyan-400">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M8 19c7.732 0 11.954-6.416 11.954-11.954 0-.182 0-.362-.013-.542A8.545 8.545 0 0022 4.569a8.336 8.336 0 01-2.357.646 4.113 4.113 0 001.805-2.268 8.204 8.204 0 01-2.605.996 4.102 4.102 0 00-6.988 3.741 11.646 11.646 0 01-8.457-4.288 4.095 4.095 0 001.269 5.471A4.073 4.073 0 012 8.386v.051a4.105 4.105 0 003.29 4.02 4.095 4.095 0 01-1.853.07 4.103 4.103 0 003.83 2.85A8.233 8.233 0 012 17.536a11.615 11.615 0 006.29 1.84"/></svg>
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-blue-400">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5S0 4.881 0 3.5 1.11 1 2.5 1 4.98 2.119 4.98 3.5zM0 8h5v16H0V8zm7.5 0h4.62v2.26h.06c.64-1.21 2.2-2.48 4.53-2.48 4.84 0 5.73 3.18 5.73 7.31V24H17v-7.56c0-1.8-.03-4.12-2.5-4.12-2.5 0-2.87 1.95-2.87 3.96V24H7.5V8z"/></svg>
            </a>
            <a href="#" aria-label="GitHub" className="hover:text-gray-300">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12 0a12 12 0 00-3.8 23.39c.6.11.82-.26.82-.58v-2.1c-3.34.72-4.04-1.61-4.04-1.61-.55-1.38-1.35-1.75-1.35-1.75-1.1-.75.08-.74.08-.74 1.22.09 1.87 1.25 1.87 1.25 1.08 1.84 2.83 1.31 3.52 1 .11-.79.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.46-2.39 1.21-3.23-.12-.3-.52-1.5.11-3.12 0 0 .99-.32 3.25 1.23a11.2 11.2 0 015.92 0c2.26-1.55 3.25-1.23 3.25-1.23.64 1.62.24 2.82.12 3.12.76.84 1.21 1.92 1.21 3.23 0 4.62-2.8 5.65-5.48 5.95.43.37.82 1.1.82 2.22v3.29c0 .32.21.7.82.58A12 12 0 0012 0z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
