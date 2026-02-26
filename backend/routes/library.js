const express = require('express');
const router = express.Router();
const libraryController = require('../controllers/libraryController');

// GET /api/library - Get current user's game library
router.get('/', libraryController.getUserLibrary);

// GET /api/library/check/:gameId - Check if user owns a game
router.get('/check/:gameId', libraryController.checkOwnership);

// GET /api/library/:gameId - Get specific game from user's library
router.get('/:gameId', libraryController.getLibraryGame);

// POST /api/library/:gameId - Add game to user's library (purchase)
router.post('/:gameId', libraryController.addToLibrary);

// DELETE /api/library/:gameId - Remove game from library
router.delete('/:gameId', libraryController.removeFromLibrary);

module.exports = router;
