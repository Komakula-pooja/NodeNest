const noteService = require('../service/noteService');

const createNote = async (req, res) => {
  try {
    const userId = req.user; 
    const noteData = { ...req.body, userId };

    const result = await noteService.createNote(noteData);  
    res.status(201).json(result); 
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const getNotes = async (req, res) => {
  try {
    const userId = req.user;
    const notes = await noteService.getNotes(userId);
    res.status(200).json(notes);
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const getNote = async (req, res) => {
  try {
    const note = await noteService.getNote(req.params.id);
    res.status(200).json(note);
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const updateNote = async (req, res) => {
  try {
    const noteId = req.params.id;  
    const noteData = req.body;  
    const updatedNote = await noteService.updateNote(noteId, noteData);
    res.status(200).json(updatedNote); 
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const deleteNote = async (req, res) => {
  try {
    const noteId = req.params.id; 
    const result = await noteService.deleteNote(noteId);
    res.status(200).json(result); 
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const searchNotes = async (req, res) => {
  try {
    const userId = req.user;
    const query = req.query.keyword;
    console.log('Search query:', query); 
    if (!query) {
      return res.status(400).json({ error: "Search query is required" });
    }
    const notes = await noteService.searchNotes(userId,query);
    res.status(200).json(notes);
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const archiveNote = async (req, res) => {
  try {
    const note = await noteService.archiveNote(req.params.id);
    res.status(200).json(note);
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const unarchiveNote = async (req, res) => {
  try {
    const note = await noteService.unarchiveNote(req.params.id);
    res.status(200).json(note);
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const getArchivedNotes = async (req, res) => {
  try {
    const userId =req.user;
    //console.log("Fetching notes for user:", userId);
    if (!userId) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const notes = await noteService.getArchivedNotes(userId);
    res.status(200).json(notes);
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const trashNote = async (req, res) => {
  try {
    const note = await noteService.trashNote(req.params.id);
    res.status(200).json(note);
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const restoreNote = async (req, res) => {
  try {
    const note = await noteService.restoreNote(req.params.id);
    res.status(200).json(note);
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const getTrashedNotes = async (req, res) => {
  try {
    const userId =req.user;
    const notes = await noteService.getTrashedNotes(userId);
    res.status(200).json(notes);
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

module.exports = {
  createNote, getNotes, getNote, updateNote, deleteNote,
  archiveNote, unarchiveNote, getArchivedNotes,
  trashNote, restoreNote, getTrashedNotes, searchNotes
};

