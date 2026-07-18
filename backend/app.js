require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const { login, createUser } = require('./controllers/users');
const auth = require('./middleware/auth');
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');
const errorHandler = require('./middleware/error-handler');
const { validateUserSignup, validateUserSignin } = require('./middleware/validation');
const { requestLogger, errorLogger } = require('./middleware/logger');

const app = express();
const { PORT = 3000 } = process.env;

app.use(express.json());
app.use(cors());
app.options('*', cors());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => console.log('Conectado con éxito a MongoDB'))
  .catch((err) => console.log('Error al conectar a MongoDB:', err));

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('El servidor va a caer');
  }, 0);
});

app.post('/signin', validateUserSignin, login);
app.post('/signup', validateUserSignup, createUser);

app.use(auth);

app.use('/users', userRoutes);
app.use('/cards', cardRoutes);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
