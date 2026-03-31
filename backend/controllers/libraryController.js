const db = require('../db/db');

// GET /api/library
exports.getUserLibrary = async (req, res) => {
    const { username } = req.user;

    try {
        const [games] = await db.execute(`
            SELECT g.gameID, g.title, g.thumbnail, g.description, g.price,
                   p.purchase_date,
                   r.rating, r.contents AS review
            FROM purchase p
            JOIN game g ON p.gameID = g.gameID
            LEFT JOIN review r ON p.purchaseID = r.purchaseID
            WHERE p.username = ?
            ORDER BY p.purchase_date DESC
        `, [username]);

        res.json({
            message: 'Library retrieved successfully',
            count: games.length,
            games
        });

    } catch (err) {
        console.error('Get library error:', err);
        res.status(500).json({ error: 'Server error.' });
    }
};

// GET /api/library/:gameId
exports.getLibraryGame = async (req, res) => {
    const { username } = req.user;
    const { gameId } = req.params;

    try {
        const [rows] = await db.execute(`
            SELECT g.gameID, g.title, g.thumbnail, g.description, g.price,
                   g.publish_date, p.purchase_date, p.purchaseID,
                   r.rating, r.contents AS review
            FROM purchase p
            JOIN game g ON p.gameID = g.gameID
            LEFT JOIN review r ON p.purchaseID = r.purchaseID
            WHERE p.username = ? AND p.gameID = ?
        `, [username, gameId]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Game not found in your library.' });
        }

        res.json({
            message: 'Library game retrieved successfully',
            game: rows[0]
        });

    } catch (err) {
        console.error('Get library game error:', err);
        res.status(500).json({ error: 'Server error.' });
    }
};

// POST /api/library/:gameId  (purchase a game)
exports.addToLibrary = async (req, res) => {
    const { username } = req.user;
    const { gameId } = req.params;

    try {
        // Check if user already owns the game
        const [owned] = await db.execute(
            'SELECT purchaseID FROM purchase WHERE username = ? AND gameID = ?',
            [username, gameId]
        );

        if (owned.length > 0) {
            return res.status(409).json({ error: 'You already own this game.' });
        }

        // Get game price
        const [games] = await db.execute(
            'SELECT price FROM game WHERE gameID = ?',
            [gameId]
        );

        if (games.length === 0) {
            return res.status(404).json({ error: 'Game not found.' });
        }

        const price = games[0].price;

        // Get user credits
        const [profiles] = await db.execute(
            'SELECT credits FROM profile WHERE username = ?',
            [username]
        );

        const credits = profiles[0].credits;

        if (credits < price) {
            return res.status(400).json({ error: 'Insufficient credits.', credits, price });
        }

        // Get next purchaseID
        const [maxID] = await db.execute('SELECT MAX(purchaseID) AS maxID FROM purchase');
        const newPurchaseID = (maxID[0].maxID || 999) + 1;

        // Insert purchase
        await db.execute(
            'INSERT INTO purchase (purchaseID, username, gameID, purchase_date) VALUES (?, ?, ?, NOW())',
            [newPurchaseID, username, gameId]
        );

        // Deduct credits and increment purchase_count
        await db.execute(
            'UPDATE profile SET credits = credits - ? WHERE username = ?',
            [price, username]
        );

        await db.execute(
            'UPDATE game SET purchase_count = purchase_count + 1 WHERE gameID = ?',
            [gameId]
        );

        res.status(201).json({
            message: 'Game purchased successfully',
            gameId: parseInt(gameId),
            remainingCredits: credits - price
        });

    } catch (err) {
        console.error('Add to library error:', err);
        res.status(500).json({ error: 'Server error.' });
    }
};

// DELETE /api/library/:gameId
exports.removeFromLibrary = async (req, res) => {
    const { username } = req.user;
    const { gameId } = req.params;

    try {
        const [result] = await db.execute(
            'DELETE FROM purchase WHERE username = ? AND gameID = ?',
            [username, gameId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Game not found in your library.' });
        }

        res.json({ message: 'Game removed from library', gameId: parseInt(gameId) });

    } catch (err) {
        console.error('Remove from library error:', err);
        res.status(500).json({ error: 'Server error.' });
    }
};

// GET /api/library/check/:gameId
exports.checkOwnership = async (req, res) => {
    const { username } = req.user;
    const { gameId } = req.params;

    try {
        const [rows] = await db.execute(
            'SELECT purchaseID, purchase_date FROM purchase WHERE username = ? AND gameID = ?',
            [username, gameId]
        );

        if (rows.length === 0) {
            return res.json({ gameId: parseInt(gameId), owned: false });
        }

        res.json({
            gameId: parseInt(gameId),
            owned: true,
            purchaseID: rows[0].purchaseID,
            purchasedAt: rows[0].purchase_date
        });

    } catch (err) {
        console.error('Check ownership error:', err);
        res.status(500).json({ error: 'Server error.' });
    }
};