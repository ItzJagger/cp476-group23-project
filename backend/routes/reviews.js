const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviewsController');
const authenticateToken = require('../middleware/auth');

// Public - read reviews
router.get('/game/:gameId', reviewsController.getGameReviews);
router.get('/user/:userId', reviewsController.getUserReviews);
router.get('/:id', reviewsController.getReviewById);

// Protected - write reviews
router.post('/game/:gameId', authenticateToken, reviewsController.createReview);
router.put('/:id', authenticateToken, reviewsController.updateReview);
router.delete('/:id', authenticateToken, reviewsController.deleteReview);

module.exports = router;