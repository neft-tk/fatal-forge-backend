const router = require('express').Router();
const controller = require('../../controllers/socketController')

router.route('/users')
.get(controller.GetConnectedUsers)

router.route('/game/:name')
.get(controller.CheckRoomName)

module.exports = router;