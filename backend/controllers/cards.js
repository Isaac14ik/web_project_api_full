const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(500).send({ message: 'Error interno del servidor' }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: err.message });
      }
      res.status(500).send({ message: 'Error interno del servidor' });
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Tarjeta no encontrada' });
      }
      if (card.owner.toString() !== req.user._id) {
        return res.status(403).send({ message: 'No tienes permisos para borrar esta tarjeta' });
      }
      return Card.findByIdAndDelete(cardId)
        .then(() => res.send({ message: 'Tarjeta eliminada con éxito' }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'ID de tarjeta inválido' });
      }
      res.status(500).send({ message: 'Error interno del servidor' });
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Tarjeta no encontrada' });
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'ID de tarjeta inválido' });
      }
      res.status(500).send({ message: 'Error interno del servidor' });
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Tarjeta no encontrada' });
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'ID de tarjeta inválido' });
      }
      res.status(500).send({ message: 'Error interno del servidor' });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
