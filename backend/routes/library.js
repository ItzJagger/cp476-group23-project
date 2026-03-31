const express = require('express');
const router = express.Router();
const libraryController = require('../controllers/libraryController');
const authenticateToken = require('../middleware/auth');

// All library routes require authentication
router.use(authenticateToken);

// GET /api/library
router.get('/', libraryController.getUserLibrary);

// GET /api/library/check/:gameId
router.get('/check/:gameId', libraryController.checkOwnership);

// GET /api/library/:gameId
router.get('/:gameId', libraryController.getLibraryGame);

// POST /api/library/:gameId - purchase game
router.post('/:gameId', libraryController.addToLibrary);

// DELETE /api/library/:gameId
router.delete('/:gameId', libraryController.removeFromLibrary);

module.exports = router;