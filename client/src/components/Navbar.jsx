import React, { useState } from 'react';
import { LuNotepadText } from 'react-icons/lu';
import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [showLogout, setShowLogout] = useState(false); 
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 border-b border-sky-500 flex items-center justify-between px-4 py-4 sm:px-6 lg:px-16 z-50 shadow-md bg-gray-800">
      <h1 className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl flex items-center text-blue-300">
        NoteNest
        <span className="px-2 md:px-3 text-blue-600 text-2xl sm:text-3xl lg:text-5xl">
          <LuNotepadText />
        </span>
      </h1>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <div
            className="p-2 rounded-full hover:bg-gray-700 cursor-pointer"
            onClick={() => setShowLogout(!showLogout)} 
          >
            <FaSignOutAlt className="text-2xl text-blue-300" />
          </div>

          {showLogout && (
            <button
              className="absolute right-0 mt-2 px-4 py-2 bg-blue-700 text-white rounded-lg shadow-md hover:bg-blue-900 transition-colors"
              onClick={() => {
                localStorage.removeItem('Token');
                setShowLogout(false);
                navigate('/login');
                console.log('Logged out!');
              }}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;