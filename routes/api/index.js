const router = require('express').Router();
const userRoutes = require('./userRoutes');
const deckRoutes = require('./deckRoutes');
const cardRoutes = require('./cardRoutes');
const imageRoutes = require('./imageRouter');
const socketRoutes = require('./socketRoutes')

router.use('/users', userRoutes);       
router.use('/decks', deckRoutes);
router.use('/cards', cardRoutes);
router.use('/images', imageRoutes);
router.use('/sockets', socketRoutes);

module.exports = router;