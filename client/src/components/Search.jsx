import React, { useState, useEffect } from "react";
import axios from "axios";
import { BiSolidArchiveIn } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import { PiNotepad } from "react-icons/pi";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    const fetchResults = async () => {
      if (query.trim() === "") {
        setResults([]);
        return;
      }

      setLoading(true);

      try {
        const res = await axios.get(
          `https://nodenest-ww5l.onrender.com/api/notes/note/search?keyword=${query}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("Token")}`,
            },
          }
        );
        setResults(res.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounce = setTimeout(fetchResults, 500);
    return () => clearTimeout(delayDebounce);
  }, [query]);

  const HandleArchive = async (noteId) => {
    try {
      const res = await axios.put(
        `https://nodenest-ww5l.onrender.com/api/notes/${noteId}/archive`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );
      console.log(res.data);
      setResults(results.filter((note) => note._id !== noteId));
    } catch (err) {
      alert(`Error: ${err.response?.data?.message || err.message}`);
    }
  };

  const HandleDelete = async (noteId) => {
    try {
      const res = await axios.put(
        `https://nodenest-ww5l.onrender.com/api/notes/${noteId}/trash`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );
      console.log(res.data);
      setResults(results.filter((note) => note._id !== noteId));
    } catch (err) {
      alert(`Error: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <div className="p-4 ">
      <h1 className="text-2xl flex justify-center font-bold mb-3">Search Notes</h1>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border bg-gray-900 border-sky-500 rounded-lg px-3 py-2 w-full outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="mt-6">
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : query.trim() !== "" && results.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-6">
            <PiNotepad className="text-5xl text-sky-300" />
            <p className="text-gray-500 text-sky-300 text-lg mt-2">
              No notes found!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((note) => (
              <div
                key={note._id}
                className="p-4 rounded-lg border border-sky-500 shadow-md"
                style={{ backgroundColor: note.backgroundColor }}
              >
                <h3 className="text-lg font-bold" style={{ color: note.textColor }}>
                  {note.title}
                </h3>
                <p
                  style={{
                    color: note.textColor,
                    fontSize: note.fontSize,
                    fontStyle: note.fontStyle,
                  }}
                >
                  {note.content}
                </p>

                <div className="flex justify-between items-center mt-3">
                  <p className="text-xs text-gray-300">
                    Created: {new Date(note.createdAt).toLocaleDateString()}
                  </p>
                  <div className="flex space-x-3">
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

export default Search;
