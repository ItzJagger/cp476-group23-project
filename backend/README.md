# Game Library API - Backend

Backend server for the CP476 Group 23 Game Library and Review Platform.

## Getting Started

### Prerequisites
- Node.js (v14 or higher)

### Installation

```bash
cd backend
npm install
```

### Running the Server

```bash
node server.js
```

Server runs at **http://localhost:3000**

---

## API Endpoints

### Authentication (`/api/auth`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/logout` | Logout user |
| GET | `/api/auth/me` | Get current logged in user |

**Register/Login body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "username": "player1"
}
```

---

### Games (`/api/games`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/games` | Get all games |
| GET | `/api/games/search?query=xxx` | Search games |
| GET | `/api/games/:id` | Get single game by ID |
| POST | `/api/games` | Create new game (admin) |
| PUT | `/api/games/:id` | Update game (admin) |
| DELETE | `/api/games/:id` | Delete game (admin) |

---

### User Library (`/api/library`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/library` | Get current user's game library |
| GET | `/api/library/:gameId` | Get specific game from library |
| GET | `/api/library/check/:gameId` | Check if user owns a game |
| POST | `/api/library/:gameId` | Add game to library (purchase) |
| DELETE | `/api/library/:gameId` | Remove game from library |

---

### Reviews (`/api/reviews`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/reviews/game/:gameId` | Get all reviews for a game |
| GET | `/api/reviews/user/:userId` | Get all reviews by a user |
| GET | `/api/reviews/:id` | Get single review |
| POST | `/api/reviews/game/:gameId` | Create review for a game |
| PUT | `/api/reviews/:id` | Update a review |
| DELETE | `/api/reviews/:id` | Delete a review |

**Create/Update review body:**
```json
{
  "rating": 5,
  "comment": "Great game!"
}
```

---

## Project Structure

```
backend/
├── server.js              # Main entry point
├── package.json           # Dependencies
├── routes/
│   ├── auth.js            # Auth route definitions
│   ├── games.js           # Games route definitions
│   ├── library.js         # Library route definitions
│   └── reviews.js         # Reviews route definitions
└── controllers/
    ├── authController.js      # Auth logic
    ├── gamesController.js     # Games logic
    ├── libraryController.js   # Library logic
    └── reviewsController.js   # Reviews logic
```

---

## Current Status

All endpoints return **stub/dummy data**. 

### TODO
- [ ] Add database (MySQL/MongoDB)
- [ ] Implement JWT authentication
- [ ] Connect controllers to database
- [ ] Add input validation
- [ ] Add error handling middleware

---

## Contributors
- Jackson Blellock
- Muhammad Imran
- Kayleigh Zelichowski
