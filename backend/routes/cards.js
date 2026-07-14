const router = require('express').Router();
const { deleteCard } = require('../controllers/cards');
const { validateIdParam } = require('../middleware/validation');

router.delete('/:cardId', validateIdParam, deleteCard);

module.exports = router;
