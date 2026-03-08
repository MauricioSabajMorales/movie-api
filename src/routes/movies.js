const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const axios = require('axios');

const router = express.Router();

const favorites = {};

router.get('/', authMiddleware, (req, res) => {
  const movies = [
    { id: 1, title: 'The Godfather', year: 1972 },
    { id: 2, title: 'The Dark Knight', year: 2008 },
    { id: 3, title: 'Inception', year: 2010 },
  ];

  const search = req.query.search;

  const result = search
    ? movies.filter(m => m.title.toLowerCase().includes(search.toLowerCase()))
    : movies;

  res.json({ user: req.user.username, movies: result });
});

router.get('/profile', authMiddleware, (req, res) => {
  res.json({
    username: req.user.username,
    message: 'Este es tu perfil'
  });
});

router.post('/favorites', authMiddleware, (req, res) => {
  const username = req.user.username;
  const { movieId } = req.body;

  if (!favorites[username]) {
    favorites[username] = [];
  }

  if (favorites[username].includes(movieId)) {
    return res.status(400).json({ message: 'La película ya está en favoritos' });
  }

  favorites[username].push(movieId);
  res.status(201).json({ message: 'Agregada a favoritos', favorites: favorites[username] });
});

router.get('/favorites', authMiddleware, (req, res) => {
  const username = req.user.username;
  const userFavorites = favorites[username] || [];
  res.json({ username, favorites: userFavorites });
});

router.get('/search', authMiddleware, async (req, res) => {
  const { title } = req.query;

  if (!title) {
    return res.status(400).json({ message: 'Debes proporcionar un título' });
  }

  try {
    const response = await axios.get(`http://www.omdbapi.com/`, {
      params: {
        s: title,
        apikey: process.env.OMDB_API_KEY
      }
    });

    if (response.data.Response === 'False') {
      return res.status(404).json({ message: 'No se encontraron películas' });
    }

    res.json({ movies: response.data.Search });
  } catch (error) {
    res.status(500).json({ message: 'Error al consultar OMDB' });
  }
});

router.delete('/favorites/:movieId', authMiddleware, (req, res) => {
  const username = req.user.username;
  const movieId = parseInt(req.params.movieId);

  if (!favorites[username]) {
    return res.status(404).json({ message: 'No tenés favoritos' });
  }

  const index = favorites[username].indexOf(movieId);

  if (index === -1) {
    return res.status(404).json({ message: 'La película no está en favoritos' });
  }

  favorites[username].splice(index, 1);
  res.json({ message: 'Eliminada de favoritos', favorites: favorites[username] });
});

module.exports = router;