const Card = require('../card');

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

module.exports = {
  deleteCard,
};
