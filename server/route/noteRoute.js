const express = require('express');
const noteController = require('../controller/noteController');
const authToken = require('../middleware/authToken');
const router = express.Router();

router.post('/', authToken, noteController.createNote);
router.get('/', authToken, noteController.getNotes);
router.put('/:id', authToken, noteController.updateNote);
router.delete('./id', authToken, noteController.deleteNote);
router.get('/:id', authToken, noteController.getNote);
router.get('/note/search', authToken, noteController.searchNotes);
router.get('/note/archived',authToken, noteController.getArchivedNotes);
router.get('/note/trashed', authToken, noteController.getTrashedNotes);
router.put('/:id/archive', authToken, noteController.archiveNote);
router.put('/:id/unarchive', authToken, noteController.unarchiveNote);
router.put('/:id/trash', authToken, noteController.trashNote);
router.put('/:id/restore', authToken, noteController.restoreNote);


module.exports = router;