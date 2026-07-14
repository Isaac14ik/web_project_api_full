const router = require('express').Router();
const { deleteCard } = require('../controllers/cards');

router.delete('/:cardId', deleteCard);

module.exports = router;
