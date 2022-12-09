const router = require('express').Router();
const userRoutes = require('./userRoutes');
const deckRoutes = require('./deckRoutes');
const cardRoutes = require('./cardRoutes');
const socketRoutes = require('./socketRoutes')

router.use('/users', userRoutes);
router.use('/decks', deckRoutes);
router.use('/cards', cardRoutes);
router.use('/socket', socketRoutes)

module.exports = router;