import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
import { BiSolidArchiveOut } from "react-icons/bi";
import { GrArchive } from "react-icons/gr";

const Archive=() => {
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] =useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/api/notes/note/archived', {
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

  const HandleUnArchive = async (noteId) => {
    try{
      const res = await axios.put(`http://localhost:3000/api/notes/${noteId}/unarchive`,
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
    const res = await axios.put(`http://localhost:3000/api/notes/${noteId}/trash`,
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

        <div className="flex flex-col items-center justify-center mt-6">
          <GrArchive className='text-5xl text-sky-300' />
          <p className="text-sky-300 text-lg mt-2">No notes found. Create a new one!</p>
        </div>
      ) : (
        <>
        <h1 className='text-3xl text-sky-400 flex font-bold justify-center mb-5'>Archive</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note, index) => (
            <div key={index} className="p-4 border border-sky-500 rounded-lg shadow-md" style={{ backgroundColor: note.backgroundColor }}>
              <h3 className="text-lg font-bold" style={{ color: note.textColor }}>{note.title}</h3>
              <p style={{ color: note.textColor, fontSize: note.fontSize, fontStyle: note.fontStyle }}>{note.content}</p>

              <div className="flex justify-between items-center mt-3">
              <p className='text-xs text-gray-300'>Updated: {new Date(note.updatedAt).toLocaleDateString()}</p>
              <div className='flex space-x-3'>
                <button
                  onClick={() => HandleUnArchive(note._id)}
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                  title="Unarchive"
                >
                  <BiSolidArchiveOut className="text-2xl" />
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
        </>
      )}
    </div>
  )
}

export default Archive
