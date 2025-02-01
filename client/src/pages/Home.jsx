import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Notes from '../components/Notes';
import Archive from '../components/Archive';
import Trash from '../components/Trash';
import Search from '../components/Search';
import { FaBars, FaStickyNote, FaArchive, FaTrash, FaSearch } from 'react-icons/fa';

const Home = () => {
  const [activePage, setActivePage] = useState('notes'); 
  const [isNavOpen, setIsNavOpen] = useState(false); 

  const renderActivePage = () => {
    switch (activePage) {
      case 'notes':
        return <Notes />;
      case 'archive':
        return <Archive />;
      case 'trash':
        return <Trash />;
      case 'search':
        return <Search />;
      default:
        return <Notes />;
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex h-screen">
        {!isNavOpen && (
          <button
            className="sm:hidden fixed top-20 left-4 p-2 bg-gray-700 text-white rounded-lg z-50 transition-opacity duration-300"
            onClick={() => setIsNavOpen(true)}
          >
            <FaBars />
          </button>
        )}

        <div
          className={`w-3/4 sm:w-1/4 bg-gray-800 text-white p-4 fixed sm:relative h-full transform ${
            isNavOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'
          } transition-transform duration-300 ease-in-out z-40`}
        >
          <ul>
            <li
              className={`p-2 cursor-pointer flex items-center space-x-2 hover:bg-gray-700 rounded-lg mb-2 ${
                activePage === 'notes' ? 'bg-gray-700 border border-sky-500' : ''
              }`}
              onClick={() => {
                setActivePage('notes');
                setIsNavOpen(false);
              }}
            >
              <FaStickyNote className="text-xl" />
              <span>Notes</span>
            </li>
            <li
              className={`p-2 cursor-pointer flex items-center space-x-2 hover:bg-gray-700 rounded-lg mb-2 ${
                activePage === 'archive' ? 'bg-gray-700 border border-sky-500' : ''
              }`}
              onClick={() => {
                setActivePage('archive');
                setIsNavOpen(false);
              }}
            >
              <FaArchive className="text-xl" />
              <span>Archive</span>
            </li>
            <li
              className={`p-2 cursor-pointer flex items-center space-x-2 hover:bg-gray-700 rounded-lg mb-2 ${
                activePage === 'trash' ? 'bg-gray-700 border border-sky-500' : ''
              }`}
              onClick={() => {
                setActivePage('trash');
                setIsNavOpen(false);
              }}
            >
              <FaTrash className="text-xl" />
              <span>Trash</span>
            </li>
            <li
              className={`p-2 cursor-pointer flex items-center space-x-2 hover:bg-gray-700 rounded-lg mb-2 ${
                activePage === 'search' ? 'bg-gray-700 border border-sky-500' : ''
              }`}
              onClick={() => {
                setActivePage('search');
                setIsNavOpen(false);
              }}
            >
              <FaSearch className="text-xl" />
              <span>Search</span>
            </li>
          </ul>
        </div>

        <div className="w-full sm:w-3/4 bg-gray-900 text-white p-4">
          {renderActivePage()}
        </div>
      </div>
    </div>
  );
};

export default Home;