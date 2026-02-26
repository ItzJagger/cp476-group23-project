// Library Controller - Handles user's game library operations

// GET /api/library
exports.getUserLibrary = (req, res) => {
    // TODO: Get user ID from JWT token
    // TODO: Fetch user's games from database
    
    const userGames = [
        { id: 1, title: 'Owned Game 1', purchasedAt: '2024-01-10', hoursPlayed: 25 },
        { id: 2, title: 'Owned Game 2', purchasedAt: '2024-02-15', hoursPlayed: 10 }
    ];
    
    res.json({
        message: 'Library retrieved successfully',
        count: userGames.length,
        games: userGames
    });
};

// GET /api/library/:gameId
exports.getLibraryGame = (req, res) => {
    const { gameId } = req.params;
    
    // TODO: Check if user owns this game
    // TODO: Fetch game details with user-specific data
    
    res.json({
        message: 'Library game retrieved successfully',
        game: {
            id: parseInt(gameId),
            title: 'Owned Game',
            purchasedAt: '2024-01-10',
            hoursPlayed: 25,
            lastPlayed: '2024-03-01',
            userReview: null
        }
    });
};

// POST /api/library/:gameId
exports.addToLibrary = (req, res) => {
    const { gameId } = req.params;
    
    // TODO: Get user ID from JWT token
    // TODO: Check if user has enough tokens
    // TODO: Add game to user's library
    // TODO: Deduct tokens from user
    
    res.status(201).json({
        message: 'Game added to library successfully',
        gameId: parseInt(gameId),
        remainingTokens: 50
    });
};

// DELETE /api/library/:gameId
exports.removeFromLibrary = (req, res) => {
    const { gameId } = req.params;
    
    // TODO: Remove game from user's library
    // Note: Might not want to implement this, or make it admin-only
    
    res.json({
        message: 'Game removed from library',
        gameId: parseInt(gameId)
    });
};

// GET /api/library/check/:gameId
exports.checkOwnership = (req, res) => {
    const { gameId } = req.params;
    
    // TODO: Check if current user owns this game
    
    res.json({
        gameId: parseInt(gameId),
        owned: true,
        purchasedAt: '2024-01-10'
    });
};
