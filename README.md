# Movie API 🎬

REST API with JWT authentication for movie and favorites management.

## Technologies
- Node.js
- Express
- JWT (JSON Web Tokens)
- bcryptjs
- dotenv
- axios
- OMDB API

## Installation

1. Clone the repository
```bash
git clone <repository-url>
cd movie-api
```

2. Install dependencies
```bash
npm install
```

3. Create `.env` file based on `.env.example`
```bash
cp .env.example .env
```

4. Fill in the variables in `.env`
```
PORT=3001
JWT_SECRET=your_secret_here
OMDB_API_KEY=your_api_key_here
```

5. Start the server
```bash
npm run dev
```

## Endpoints

### Authentication
| Method | Route | Description |
|--------|-------|-------------|
| POST | /auth/register | Register a new user |
| POST | /auth/login | Login and get JWT token |

### Movies
| Method | Route | Description |
|--------|-------|-------------|
| GET | /movies | List all movies |
| GET | /movies?search=title | Search movies by title |
| GET | /movies/profile | Get user profile |
| GET | /movies/search?title=title | Search movies on OMDB |
| POST | /movies/favorites | Add movie to favorites |
| GET | /movies/favorites | Get user favorites |
| DELETE | /movies/favorites/:id | Remove movie from favorites |

## Authentication
All movie endpoints require a JWT token in the header:
```
Authorization: Bearer <token>
```

## Testing
The Postman collection includes positive and negative test cases for all endpoints, with automation scripts including pre-request and post-response scripts.

## Screenshots

### Collection Runner
![Collection Runner](images/runner-image.png)

### All Tests Passing
![Tests](images/tests-executed-image.png)