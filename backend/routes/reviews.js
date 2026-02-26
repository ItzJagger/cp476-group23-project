const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviewsController');

// GET /api/reviews/game/:gameId - Get all reviews for a game
router.get('/game/:gameId', reviewsController.getGameReviews);

// GET /api/reviews/user/:userId - Get all reviews by a user
router.get('/user/:userId', reviewsController.getUserReviews);

// GET /api/reviews/:id - Get single review
router.get('/:id', reviewsController.getReviewById);

// POST /api/reviews/game/:gameId - Create a review for a game
router.post('/game/:gameId', reviewsController.createReview);

// PUT /api/reviews/:id - Update a review
router.put('/:id', reviewsController.updateReview);

// DELETE /api/reviews/:id - Delete a review
router.delete('/:id', reviewsController.deleteReview);

module.exports = router;
