const router = require('express').Router();

const { 
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  postUserLogin,
  readToken,
  getFriends,
  getSingleFriend,
  createFriend,
  deleteFriend,
} = require('../../controllers/userController');

// @ api/users
router.route('/')
.get(getUsers)
.post(createUser);

// @ api/users/login
router.route('/login')
.post(postUserLogin)

// @ api/users/readtoken
router.route('/readtoken')
.get(readToken)

// @ api/users/:userId
router.route('/:userId')
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser);

// @ api/users/:userId/friends
router.route('/:userId/friends')
.get(getFriends);

// @ api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
.get(getSingleFriend)
.post(createFriend)
.delete(deleteFriend);

module.exports = router;