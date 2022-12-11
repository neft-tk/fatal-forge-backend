const router = require('express').Router();
const controller = require('../../controllers/socketController')

router.route('/users')
.get(controller.GetConnectedUsers)

router.route('/games/:name')
.get(controller.GetGameStateById)

router.route('/games')
.get(controller.GetAllGames)

module.exports = router;