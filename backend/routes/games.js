const express = require('express');
const router = express.Router();
const gamesController = require('../controllers/gamesController');

// GET /api/games - Get all games
router.get('/', gamesController.getAllGames);

// GET /api/games/search - Search games (must be before /:id)
router.get('/search', gamesController.searchGames);

// GET /api/games/:id - Get single game
router.get('/:id', gamesController.getGameById);

// POST /api/games - Create new game (admin only)
router.post('/', gamesController.createGame);

// PUT /api/games/:id - Update game (admin only)
router.put('/:id', gamesController.updateGame);

// DELETE /api/games/:id - Delete game (admin only)
router.delete('/:id', gamesController.deleteGame);

module.exports = router;
