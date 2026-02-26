// Games Controller - Handles game catalog operations

// GET /api/games
exports.getAllGames = (req, res) => {
    // TODO: Fetch all games from database
    // - Support pagination
    // - Support search/filter
    
    const games = [
        { id: 1, title: 'Sample Game 1', price: 50, genre: 'Action', description: 'An exciting action game' },
        { id: 2, title: 'Sample Game 2', price: 30, genre: 'RPG', description: 'An epic role-playing adventure' },
        { id: 3, title: 'Sample Game 3', price: 40, genre: 'Strategy', description: 'A challenging strategy game' }
    ];
    
    res.json({
        message: 'Games retrieved successfully',
        count: games.length,
        games: games
    });
};

// GET /api/games/:id
exports.getGameById = (req, res) => {
    const { id } = req.params;
    
    // TODO: Fetch single game from database
    
    res.json({
        message: 'Game retrieved successfully',
        game: {
            id: parseInt(id),
            title: 'Sample Game',
            price: 50,
            genre: 'Action',
            description: 'An exciting action game',
            releaseDate: '2024-01-15',
            developer: 'Sample Studio'
        }
    });
};

// POST /api/games (Admin only)
exports.createGame = (req, res) => {
    const { title, price, genre, description } = req.body;
    
    // TODO: Create new game in database
    // - Validate admin permissions
    
    res.status(201).json({
        message: 'Game created successfully',
        game: {
            id: 4,
            title: title || 'New Game',
            price: price || 0,
            genre: genre || 'Unknown',
            description: description || ''
        }
    });
};

// PUT /api/games/:id (Admin only)
exports.updateGame = (req, res) => {
    const { id } = req.params;
    const { title, price, genre, description } = req.body;
    
    // TODO: Update game in database
    
    res.json({
        message: 'Game updated successfully',
        game: {
            id: parseInt(id),
            title: title || 'Updated Game',
            price: price || 0,
            genre: genre || 'Unknown',
            description: description || ''
        }
    });
};

// DELETE /api/games/:id (Admin only)
exports.deleteGame = (req, res) => {
    const { id } = req.params;
    
    // TODO: Delete game from database
    
    res.json({
        message: 'Game deleted successfully',
        deletedId: parseInt(id)
    });
};

// GET /api/games/search
exports.searchGames = (req, res) => {
    const { query, genre } = req.query;
    
    // TODO: Search games in database
    
    res.json({
        message: 'Search results',
        query: query || '',
        genre: genre || 'all',
        games: []
    });
};
