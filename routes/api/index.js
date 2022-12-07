const router = require('express').Router();
const userRoutes = require('./userRoutes');
const deckRoutes = require('./deckRoutes');
const cardRoutes = require('./cardRoutes');

router.use('/users', userRoutes);
router.use('/decks', deckRoutes);
router.use('/cards', cardRoutes);

module.exports = router;