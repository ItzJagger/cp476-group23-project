const express = require('express');
const cors = require('cors');

// Import routes
const authRoutes = require('./routes/auth');
const gamesRoutes = require('./routes/games');
const libraryRoutes = require('./routes/library');
const reviewsRoutes = require('./routes/reviews');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
    res.json({ 
        message: 'Game Library API - CP476 Group 23',
        endpoints: {
            auth: '/api/auth',
            games: '/api/games',
            library: '/api/library',
            reviews: '/api/reviews'
        }
    });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/games', gamesRoutes);
app.use('/api/library', libraryRoutes);
app.use('/api/reviews', reviewsRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
