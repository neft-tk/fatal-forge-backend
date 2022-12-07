const router = require('express').Router();

const { 
  getCards,
  getSingleCard
} = require('../../controllers/cardController');

// @ api/cards
router.route('/')
.get(getCards);

// @ api/cards/:cardId
router.route('/:cardId')
.get(getSingleCard);

module.exports = router;