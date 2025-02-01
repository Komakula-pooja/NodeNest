const Note = require('../model/noteModel');
const { validateNote } = require('../utils/validation');

const createNote = async (note) => {
  try {
    validateNote(note);
    const newNote = await Note.create(note); 
    return { success: 'Note created successfully', noteId: newNote._id };
  } catch (error) {
    console.error('Error creating note:', error);
    throw error;
  }
};

const getNotes = async (userId) => {
  try {
    const notes = await Note.find({ userId, isArchived:false, isTrashed:false});
    return notes;
  } catch (error) {
    console.error('Error fetching notes:', error);
    throw error;
  }
};

const getNote = async (noteId) => {
    try {
      return await Note.findById(noteId);
    } catch (error) {
      console.error('Error fetching note:', error);
      throw error;
    }
};

const updateNote = async (noteId, noteData) => {
  try {
    const updatedNote = await Note.findByIdAndUpdate(noteId, noteData, { new: true });
    return updatedNote;
  } catch (error) {
    console.error('Error updating note:', error);
    throw error;
  }
};

const deleteNote = async (noteId) => {
  try {
    await Note.findByIdAndDelete(noteId);
    return { success: 'Note deleted successfully' };
  } catch (error) {
    console.error('Error deleting note:', error);
    throw error;
  }
};

const searchNotes = async (userId, query) => {
    try {
        if (typeof query !== 'string' || query.trim() === '') {
            throw new Error('Query parameter is required');
        }
        
        console.log('Searching for query:',userId, query);
        const notes = await Note.find({
            userId,
            isArchived: false,
            isTrashed: false,
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { content: { $regex: query, $options: 'i' } }  
            ]
        });
    
        return notes;
    } catch (error) {
      console.error('Error searching notes:', error);
      throw error;
    }
};

const archiveNote = async (noteId) => {
    try {
      const archived= await Note.findByIdAndUpdate(noteId, { isArchived: true }, { new: true });
      return archived;
    } catch (error) {
      console.error('Error archiving note:', error);
      throw error;
    }
};

const unarchiveNote = async (noteId) => {
    try {
      const unarchived= await Note.findByIdAndUpdate(noteId, { isArchived: false }, { new: true });
      return unarchived;
    } catch (error) {
      console.error('Error unarchiving note:', error);
      throw error;
    }
};

const getArchivedNotes = async (userId) => {
    try {
      const archived=await Note.find({ userId, isArchived: true });
      return archived;
    } catch (error) {
      console.error('Error fetching archived notes:', error);
      throw error;
    }
};

const trashNote = async (noteId) => {
    try {
      return await Note.findByIdAndUpdate(noteId, { isTrashed: true, trashedAt: new Date() }, { new: true });
    } catch (error) {
      console.error('Error moving note to trash:', error);
      throw error;
    }
};
  
const restoreNote = async (noteId) => {
    try {
      return await Note.findByIdAndUpdate(noteId, { isTrashed: false, trashedAt: null }, { new: true });
    } catch (error) {
      console.error('Error restoring note:', error);
      throw error;
    }
};
  
const getTrashedNotes = async (userId) => {
    try {
      return await Note.find({ userId, isTrashed: true });
    } catch (error) {
      console.error('Error fetching trashed notes:', error);
      throw error;
    }
};
  
const deleteOldTrashedNotes = async () => {
    try {
      const dateThreshold = new Date();
      dateThreshold.setDate(dateThreshold.getDate() - 30);
      await Note.deleteMany({ isTrashed: true, trashedAt: { $lte: dateThreshold } });
      console.log('Old trashed notes deleted successfully');
    } catch (error) {
      console.error('Error deleting old trashed notes:', error);
    }
};

module.exports = {
    createNote, getNotes, getNote, updateNote, deleteNote,
    archiveNote, unarchiveNote, getArchivedNotes,
    trashNote, restoreNote, getTrashedNotes, deleteOldTrashedNotes, searchNotes
};

