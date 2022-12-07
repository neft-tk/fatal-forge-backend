const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

// TODO: Image routes
// Image routes here?

router.use((req, res) => res.send('Wrong route!'));

module.exports = router;