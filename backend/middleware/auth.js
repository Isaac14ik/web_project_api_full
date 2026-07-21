const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(403).send({ message: 'Se requiere autorización' });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(
      token,
      process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'super-strong-secret-key'
    );
  } catch (err) {
    return res.status(403).send({ message: 'Se requiere autorización' });
  }

  req.user = payload;
  next();
};

module.exports = authMiddleware;
