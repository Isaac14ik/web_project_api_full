const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../user');

const createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;

  if (!password) {
    return res.status(400).send({ message: 'La contraseña es obligatoria' });
  }

  bcrypt.hash(password, 10)
    .then((hashedPassword) => {
      return User.create({
        name,
        about,
        avatar,
        email,
        password: hashedPassword,
      });
    })
    .then((user) => {
      const userObject = user.toObject();
      delete userObject.password;
      res.status(201).send(userObject);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: err.message });
      }
      if (err.code === 11000) {
        return res.status(409).send({ message: 'El correo electrónico ya está registrado' });
      }
      res.status(500).send({ message: 'Error interno del servidor' });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: 'El correo y la contraseña son obligatorios' });
  }

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(401).send({ message: 'Correo electrónico o contraseña incorrectos' });
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return res.status(401).send({ message: 'Correo electrónico o contraseña incorrectos' });
          }

          const token = jwt.sign(
            { _id: user._id },
            'super-strong-secret-key',
            { expiresIn: '7d' }
          );

          res.send({ token });
        });
    })
    .catch((err) => {
      res.status(500).send({ message: 'Error interno del servidor' });
    });
};

module.exports = {
  createUser,
  login,
};
