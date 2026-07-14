const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { login, createUser } = require('./controllers/users');
const auth = require('./middleware/auth');
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');
const errorHandler = require('./middleware/error-handler');
const { validateUserSignup, validateUserSignin } = require('./middleware/validation');

const app = express();
const { PORT = 3000 } = process.env;

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mestodb')
  .then(() => console.log('Conectado con éxito a MongoDB'))
  .catch((err) => console.log('Error al conectar a MongoDB:', err));

app.post('/signin', validateUserSignin, login);
app.post('/signup', validateUserSignup, createUser);

app.use(auth);

app.use('/users', userRoutes);
app.use('/cards', cardRoutes);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
