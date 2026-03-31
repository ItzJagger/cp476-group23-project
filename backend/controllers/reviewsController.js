const db = require('../db/db');

// GET /api/reviews/game/:gameId
exports.getGameReviews = async (req, res) => {
    const { gameId } = req.params;

    try {
        const [reviews] = await db.execute(`
            SELECT r.purchaseID, r.contents, r.rating,
                   p.username, p.purchase_date,
                   g.title AS gameTitle
            FROM review r
            JOIN purchase p ON r.purchaseID = p.purchaseID
            JOIN game g ON p.gameID = g.gameID
            WHERE p.gameID = ?
            ORDER BY p.purchase_date DESC
        `, [gameId]);

        const avgRating = reviews.length > 0
            ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
            : null;

        res.json({
            message: 'Reviews retrieved successfully',
            gameId: parseInt(gameId),
            count: reviews.length,
            averageRating: avgRating ? parseFloat(avgRating) : null,
            reviews
        });

    } catch (err) {
        console.error('Get game reviews error:', err);
        res.status(500).json({ error: 'Server error.' });
    }
};

// GET /api/reviews/user/:username
exports.getUserReviews = async (req, res) => {
    const { userId } = req.params;

    try {
        const [reviews] = await db.execute(`
            SELECT r.purchaseID, r.contents, r.rating,
                   p.username, p.purchase_date, p.gameID,
                   g.title AS gameTitle, g.thumbnail
            FROM review r
            JOIN purchase p ON r.purchaseID = p.purchaseID
            JOIN game g ON p.gameID = g.gameID
            WHERE p.username = ?
            ORDER BY p.purchase_date DESC
        `, [userId]);

        res.json({
            message: 'User reviews retrieved successfully',
            username: userId,
            count: reviews.length,
            reviews
        });

    } catch (err) {
        console.error('Get user reviews error:', err);
        res.status(500).json({ error: 'Server error.' });
    }
};

// GET /api/reviews/:id  (by purchaseID)
exports.getReviewById = async (req, res) => {
    const { id } = req.params;

    try {
        const [rows] = await db.execute(`
            SELECT r.purchaseID, r.contents, r.rating,
                   p.username, p.purchase_date, p.gameID,
                   g.title AS gameTitle
            FROM review r
            JOIN purchase p ON r.purchaseID = p.purchaseID
            JOIN game g ON p.gameID = g.gameID
            WHERE r.purchaseID = ?
        `, [id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Review not found.' });
        }

        res.json({ message: 'Review retrieved successfully', review: rows[0] });

    } catch (err) {
        console.error('Get review by ID error:', err);
        res.status(500).json({ error: 'Server error.' });
    }
};

// POST /api/reviews/game/:gameId
exports.createReview = async (req, res) => {
    const { username } = req.user;
    const { gameId } = req.params;
    const { rating, contents } = req.body;

    if (!rating || rating < 1 || rating > 5) {
        return res.status(400).json({ error: 'Rating must be between 1 and 5.' });
    }

    try {
        // Check if user owns the game and get purchaseID
        const [purchases] = await db.execute(
            'SELECT purchaseID FROM purchase WHERE username = ? AND gameID = ?',
            [username, gameId]
        );

        if (purchases.length === 0) {
            return res.status(403).json({ error: 'You must own this game to review it.' });
        }

        const purchaseID = purchases[0].purchaseID;

        // Check if review already exists
        const [existing] = await db.execute(
            'SELECT purchaseID FROM review WHERE purchaseID = ?',
            [purchaseID]
        );

        if (existing.length > 0) {
            return res.status(409).json({ error: 'You have already reviewed this game.' });
        }

        // Insert review
        await db.execute(
            'INSERT INTO review (purchaseID, contents, rating) VALUES (?, ?, ?)',
            [purchaseID, contents || null, rating]
        );

        // Increment review_count on profile
        await db.execute(
            'UPDATE profile SET review_count = review_count + 1 WHERE username = ?',
            [username]
        );

        res.status(201).json({
            message: 'Review created successfully',
            review: { purchaseID, gameId: parseInt(gameId), rating, contents }
        });

    } catch (err) {
        console.error('Create review error:', err);
        res.status(500).json({ error: 'Server error.' });
    }
};

// PUT /api/reviews/:id  (id = purchaseID)
exports.updateReview = async (req, res) => {
    const { username } = req.user;
    const { id } = req.params;
    const { rating, contents } = req.body;

    if (rating && (rating < 1 || rating > 5)) {
        return res.status(400).json({ error: 'Rating must be between 1 and 5.' });
    }

    try {
        const [rows] = await db.execute(
            'SELECT r.purchaseID FROM review r JOIN purchase p ON r.purchaseID = p.purchaseID WHERE r.purchaseID = ? AND p.username = ?',
            [id, username]
        );

        if (rows.length === 0) {
            return res.status(403).json({ error: 'Review not found or not authorized.' });
        }

        await db.execute(
            'UPDATE review SET rating = COALESCE(?, rating), contents = COALESCE(?, contents) WHERE purchaseID = ?',
            [rating || null, contents || null, id]
        );

        res.json({ message: 'Review updated successfully', purchaseID: parseInt(id) });

    } catch (err) {
        console.error('Update review error:', err);
        res.status(500).json({ error: 'Server error.' });
    }
};

// DELETE /api/reviews/:id  (id = purchaseID)
exports.deleteReview = async (req, res) => {
    const { username } = req.user;
    const { id } = req.params;

    try {
        const [rows] = await db.execute(
            'SELECT r.purchaseID FROM review r JOIN purchase p ON r.purchaseID = p.purchaseID WHERE r.purchaseID = ? AND p.username = ?',
            [id, username]
        );

        if (rows.length === 0) {
            return res.status(403).json({ error: 'Review not found or not authorized.' });
        }

        await db.execute('DELETE FROM review WHERE purchaseID = ?', [id]);

        await db.execute(
            'UPDATE profile SET review_count = review_count - 1 WHERE username = ?',
            [username]
        );

        res.json({ message: 'Review deleted successfully', deletedId: parseInt(id) });

    } catch (err) {
        console.error('Delete review error:', err);
        res.status(500).json({ error: 'Server error.' });
    }
};