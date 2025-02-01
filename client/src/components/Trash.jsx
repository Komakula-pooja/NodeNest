import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrashRestore } from "react-icons/fa";
import { TbTrashOff } from "react-icons/tb";

const Trash = () => {
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] =useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/api/notes/note/trashed', {
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

  const HandleRestore = async (noteId) => {
    try{
      const res = await axios.put(`http://localhost:3000/api/notes/${noteId}/restore`,
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

  return (
    <div className="mt-6">
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : notes.length === 0 ? (

        <div className="flex flex-col text-gray-500 items-center justify-center mt-6">
          <TbTrashOff className='text-sky-300 text-5xl'/>
          <p className="text-sky-300 text-lg mt-2">Trash is Empty.</p>
        </div>
      ) : (
        <>
        <h1 className='text-3xl text-sky-400 flex font-bold justify-center '>Trash</h1>
        <p className='flex justify-center text-sky-300 border-sky-500 text-sm sm:text-lg text-bold mb-5'>Notes in the trash are deleted after 30 days..</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note, index) => (
            <div key={index} className="p-4 border border-sky-500 rounded-lg shadow-md" style={{ backgroundColor: note.backgroundColor }}>
              <h3 className="text-lg font-bold" style={{ color: note.textColor }}>{note.title}</h3>
              <p style={{ color: note.textColor, fontSize: note.fontSize, fontStyle: note.fontStyle }}>{note.content}</p>

              <div className="flex justify-between items-center mt-3">
              <p className='text-xs text-gray-300'>Updated: {new Date(note.updatedAt).toLocaleDateString()}</p>

              <div className='flex space-x-3'>
                <button
                  onClick={() => HandleRestore(note._id)}
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                  title="Unarchive"
                >
                  <FaTrashRestore className="text-xl" />
                </button>
              </div>
            </div>
          </div>
          ))}
        </div>
      </>
      )}
    </div>
  )
}

export default Trash
