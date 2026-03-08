const express = require('express')
const dotenv = require('dotenv')
const authRoutes = require('./routes/auth');
const movieRoutes = require('./routes/movies');

dotenv.config();

const app = express();

app.use(express.json())

app.use('/auth', authRoutes);

app.use('/movies', movieRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Bienvenido a Movie API' });
});

const PORT = process.env.PORT || 3000;

process.on('SIGTERM', () => process.exit(0));

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});