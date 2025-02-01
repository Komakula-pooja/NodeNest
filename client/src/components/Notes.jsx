import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
import { BiSolidArchiveIn } from "react-icons/bi";
import { PiNotepad } from "react-icons/pi";
import { FiCheckCircle } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';

const Notes = () => {
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [fontSize, setFontSize] = useState('16px');
  const [fontStyle, setFontStyle] = useState('normal');
  const [textColor, setTextColor] = useState('#ffffff');
  const [backgroundColor, setBackgroundColor] = useState('#3A5278');
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(""); 
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://nodenest-ww5l.onrender.com/api/notes', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('Token')}`
        }
      });
      console.log(response.data);
      setNotes(response.data);
    } catch (err) {
      console.error("Error fetching notes:", err);
    } finally {
      setLoading(false);
    } 
  };

  const HandleArchive = async (noteId) => {
        try{
          const res = await axios.put(`https://nodenest-ww5l.onrender.com/api/notes/${noteId}/archive`,
            {},
            {
              headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('Token')}`
              }
            }
          );
          console.log(res.data);
          fetchNotes();
        }catch(err){
          alert(`Error: ${err.message}`);
        }
  }

  const HandleDelete = async (noteId) => {
    // console.log('Authorization', `Bearer ${localStorage.getItem('Token')}`);
    // console.log(noteId);
    try{
      const res = await axios.put(`https://nodenest-ww5l.onrender.com/api/notes/${noteId}/trash`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('Token')}`
          }
        }
      );
      console.log(res.data);
      fetchNotes();
    }catch(err){
      alert(`Error: ${err.message}`);
    }
  }

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
     const newNote = { title, content, fontSize, fontStyle, textColor, backgroundColor };
    try {
      const result=await axios.post('https://nodenest-ww5l.onrender.com/api/notes', 
        newNote,  
        {
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('Token')}`
          }
        }
      );
      console.log(result.data.noteId);
      setError("");
      fetchNotes();
      showToast('Note Created Successfully!');
      setIsNoteOpen(false);
      setTitle('');
      setContent('');
    } catch (err) {
      if (err.response && err.response.data.error) {
        setError(err.response.data.error);
      } else {
      setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="p-6">
      {toast && (
        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-white shadow-md p-4 rounded-lg flex items-center space-x-3">
          <FiCheckCircle className="text-green-600 text-xl" />
          <p className="text-black">{toast}</p>
          <button onClick={() => setToast(null)}>
            <IoMdClose className="text-gray-600 text-lg hover:text-black" />
          </button>
        </div>
      )}

      {!isNoteOpen && (
        <div className='flex justify-center items-center'>
          <button
            onClick={() => setIsNoteOpen(true)}
            className="border border-sky-500 hover:bg-sky-800 text-white px-4 py-2 rounded-lg"
          >
            Create Note
          </button>
        </div>
      )}

      {isNoteOpen && (
        <div className="bg-gray-800 p-6 rounded-lg mt-4">
          <h2 className="text-xl font-bold mb-4">Create a New Note</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label className="block text-sm font-medium">Title:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium">Content:</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                style={{ fontSize, fontStyle, color: textColor, backgroundColor }}
                required
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
              />
            </div>
            <div className="flex space-x-4 mb-2">
              <div>
                <label className="block text-sm font-medium">Font Size:</label>
                <select value={fontSize} onChange={(e) => setFontSize(e.target.value)} className="bg-gray-700 p-2 border border-gray-600 rounded">
                  <option value="12px">12px</option>
                  <option value="14px">14px</option>
                  <option value="16px">16px</option>
                  <option value="18px">18px</option>
                  <option value="20px">20px</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Font Style:</label>
                <select value={fontStyle} onChange={(e) => setFontStyle(e.target.value)} className="bg-gray-700 p-2 border border-gray-600 rounded">
                  <option value="normal">Normal</option>
                  <option value="italic">Italic</option>
                  <option value="bold">Bold</option>
                </select>
              </div>
            </div>
            <div className="flex space-x-4 mb-4">
              <div>
                <label className="block text-sm font-medium">Text Color:</label>
                <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium">Background Color:</label>
                <input type="color" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} className="w-full" />
              </div>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex justify-between">
              <button type="submit" className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg">Save Note</button>
              <button type="button" onClick={() => setIsNoteOpen(false)} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg">Close</button>
            </div>
          </form>
        </div>
      )}

      <div className="mt-6">
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : notes.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-6">
            <PiNotepad className='text-5xl text-sky-300' />
            <p className="text-gray-500 text-sky-300 text-lg mt-2">No notes found. Create a new one!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.map((note, index) => (
              <div key={index} className="p-4 rounded-lg border border-sky-500 shadow-md" style={{ backgroundColor: note.backgroundColor }}>
                <h3 className="text-lg font-bold" style={{ color: note.textColor }}>{note.title}</h3>
                <p style={{ color: note.textColor, fontSize: note.fontSize, fontStyle: note.fontStyle }}>{note.content}</p>

                <div className="flex justify-between items-center mt-3">
                <p className='text-xs text-gray-300'>Created: {new Date(note.createdAt).toLocaleDateString()}</p>
                <div className='flex space-x-3'>
                  <button
                    onClick={() => HandleArchive(note._id)}
                    className="text-gray-300 hover:text-blue-400 transition-colors"
                    title="Archive"
                  >
                    <BiSolidArchiveIn className="text-2xl" />
                  </button>
                  <button
                    onClick={() => HandleDelete(note._id)} 
                    className="text-gray-300 hover:text-blue-400 transition-colors"
                    title="Delete"
                  >
                    <FaTrash className="text-xl" />
                  </button>
                </div>
              </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;
