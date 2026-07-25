const router = require('express').Router();
const { getCards, createCard, deleteCard, likeCard, dislikeCard } = require('../controllers/cards');
const { validateCardBody, validateIdParam } = require('../middleware/validation');

router.get('/', getCards);
router.post('/', validateCardBody, createCard);
router.delete('/:cardId', validateIdParam, deleteCard);
router.put('/:cardId/likes', validateIdParam, likeCard);
router.delete('/:cardId/likes', validateIdParam, dislikeCard);

module.exports = router;
