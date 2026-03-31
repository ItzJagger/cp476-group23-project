const db = require('../db/db');

// GET /api/games
exports.getAllGames = async (req, res) => {
    try {
        const [games] = await db.execute(`
            SELECT g.gameID, g.title, g.publish_date, g.price, g.purchase_count,
                   g.thumbnail, g.description, a.age AS age_rating,
                   GROUP_CONCAT(ge.genre SEPARATOR ', ') AS genres,
                   MAX(d.username) AS developer
            FROM game g
            LEFT JOIN agerating a ON g.age_rating = a.ageID
            LEFT JOIN genremap gm ON g.gameID = gm.gameID
            LEFT JOIN genre ge ON gm.genreID = ge.genreID
            LEFT JOIN developer d ON g.gameID = d.gameID
            GROUP BY g.gameID
        `);

        res.json({
            message: 'Games retrieved successfully',
            count: games.length,
            games
        });

    } catch (err) {
        console.error('Get all games error:', err);
        res.status(500).json({ error: 'Server error.' });
    }
};

// GET /api/games/search
exports.searchGames = async (req, res) => {
    const { query, genre } = req.query;

    try {
        let sql = `
            SELECT g.gameID, g.title, g.publish_date, g.price, g.purchase_count,
                   g.thumbnail, g.description, a.age AS age_rating,
                   GROUP_CONCAT(ge.genre SEPARATOR ', ') AS genres,
                   MAX(d.username) AS developer
            FROM game g
            LEFT JOIN agerating a ON g.age_rating = a.ageID
            LEFT JOIN genremap gm ON g.gameID = gm.gameID
            LEFT JOIN genre ge ON gm.genreID = ge.genreID
            LEFT JOIN developer d ON g.gameID = d.gameID
        `;
        const params = [];
        const conditions = [];

        if (query) {
            conditions.push('g.title LIKE ?');
            params.push(`%${query}%`);
        }

        if (genre) {
            conditions.push('ge.genre LIKE ?');
            params.push(`%${genre}%`);
        }

        if (conditions.length > 0) {
            sql += ' WHERE ' + conditions.join(' AND ');
        }

        sql += ' GROUP BY g.gameID';

        const [games] = await db.execute(sql, params);

        res.json({
            message: 'Search results',
            query: query || '',
            genre: genre || 'all',
            count: games.length,
            games
        });

    } catch (err) {
        console.error('Search games error:', err);
        res.status(500).json({ error: 'Server error.' });
    }
};

// GET /api/games/:id
exports.getGameById = async (req, res) => {
    const { id } = req.params;

    try {
        const [games] = await db.execute(`
            SELECT g.gameID, g.title, g.publish_date, g.price, g.purchase_count,
                   g.thumbnail, g.description, a.age AS age_rating,
                   GROUP_CONCAT(ge.genre SEPARATOR ', ') AS genres,
                   MAX(d.username) AS developer
            FROM game g
            LEFT JOIN agerating a ON g.age_rating = a.ageID
            LEFT JOIN genremap gm ON g.gameID = gm.gameID
            LEFT JOIN genre ge ON gm.genreID = ge.genreID
            LEFT JOIN developer d ON g.gameID = d.gameID
            WHERE g.gameID = ?
            GROUP BY g.gameID
        `, [id]);

        if (games.length === 0) {
            return res.status(404).json({ error: 'Game not found.' });
        }

        res.json({
            message: 'Game retrieved successfully',
            game: games[0]
        });

    } catch (err) {
        console.error('Get game by ID error:', err);
        res.status(500).json({ error: 'Server error.' });
    }
};

// POST /api/games
exports.createGame = async (req, res) => {
    const { gameID, title, publish_date, price, age_rating, thumbnail, description } = req.body;

    if (!gameID || !title) {
        return res.status(400).json({ error: 'gameID and title are required.' });
    }

    try {
        await db.execute(
            'INSERT INTO game (gameID, title, publish_date, price, purchase_count, age_rating, thumbnail, description) VALUES (?, ?, ?, ?, 0, ?, ?, ?)',
            [gameID, title, publish_date || null, price || 0, age_rating || null, thumbnail || null, description || null]
        );

        res.status(201).json({
            message: 'Game created successfully',
            game: { gameID, title, price, description }
        });

    } catch (err) {
        console.error('Create game error:', err);
        res.status(500).json({ error: 'Server error.' });
    }
};

// PUT /api/games/:id
exports.updateGame = async (req, res) => {
    const { id } = req.params;
    const { title, price, age_rating, thumbnail, description } = req.body;

    try {
        const [result] = await db.execute(
            'UPDATE game SET title = COALESCE(?, title), price = COALESCE(?, price), age_rating = COALESCE(?, age_rating), thumbnail = COALESCE(?, thumbnail), description = COALESCE(?, description) WHERE gameID = ?',
            [title || null, price || null, age_rating || null, thumbnail || null, description || null, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Game not found.' });
        }

        res.json({ message: 'Game updated successfully', gameID: parseInt(id) });

    } catch (err) {
        console.error('Update game error:', err);
        res.status(500).json({ error: 'Server error.' });
    }
};

// DELETE /api/games/:id
exports.deleteGame = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.execute('DELETE FROM game WHERE gameID = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Game not found.' });
        }

        res.json({ message: 'Game deleted successfully', deletedId: parseInt(id) });

    } catch (err) {
        console.error('Delete game error:', err);
        res.status(500).json({ error: 'Server error.' });
    }
};