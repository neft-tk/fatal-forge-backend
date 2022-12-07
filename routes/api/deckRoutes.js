const router = require('express').Router();

const { 
  getDecks,
  getSingleDeck,
  createDeck,
  updateDeck,
  deleteDeck
} = require('../../controllers/deckController');

// @ api/decks
router.route('/')
.get(getDecks)
.post(createDeck);

// @ api/decks/:deckId
router.route('/:deckId')
.get(getSingleDeck)
.put(updateDeck)
.delete(deleteDeck);

module.exports = router;