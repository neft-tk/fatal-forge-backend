const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Deck } = require('../models');

async function getUsers(req, res) {
  try {
    const usersData = await User.findAll({
      include: [
        {
          model: User,
          as: 'FavoriteUser',
        },
        {
          model: Deck,
        },
      ],
    });
    return res.status(200).json(usersData);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ msg: 'An error occurred retrieving all user data.' });
  }
}

async function getSingleUser(req, res) {
  try {
    const userData = await User.findByPk(req.params.userId, {
      include: [
        {
          model: User,
          as: 'FavoriteUser',
        },
        {
          model: Deck,
        },
      ],
    });
    return res.status(200).json(userData);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({
        msg: 'An error occurred getting a specific user based on their id.',
      });
  }
}

// User Login
async function postUserLogin(req, res) {
  try {
    // console.log("Server side:");
    // console.log(req.body.email);
    const foundUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!foundUser) {
      return res.status(401).json({ msg: 'invalid login credentials' });
    } else if (!bcrypt.compareSync(req.body.password, foundUser.password)) {
      return res.status(401).json({ msg: 'invalid login credentials' });
    } else {
      const token = jwt.sign(
        {
          id: foundUser.id,
          email: foundUser.email,
          username: foundUser.username,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '14d',
        }
      );
      return res.status(200).json({ token, user: foundUser });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: 'A login error has occurred.' });
  }
}

// User Signup
async function createUser(req, res) {
  try {
    const createUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    const token = jwt.sign(
      {
        id: createUserData.username,
        email: createUserData.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '14d',
      }
    );
    const createUserDeck = await Deck.create({
      "deckName": "Starter Deck",
      "UserId": createUserData.id
    });
    const cardsForDeck = await deckBuild();
    const cardsForDeckArray = Array.from(cardsForDeck);
    createUserDeck.addCards(cardsForDeckArray);
    return res.status(200).json({ token, user: createUserData });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ msg: 'An error occurred creating a new user.' });
  }
}

async function updateUser(req, res) {
  try {
    const updateUserData = await User.update(
      {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      },
      {
        // TODO: depends on how we're saving user IDs
        where: {
          id: req.params.userId,
        },
      }
    );
    return res.status(200).json(updateUserData);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ msg: 'An error occurred updating this user.' });
  }
}

async function deleteUser(req, res) {
  try {
    const deleteUserData = await User.destroy({
      // TODO: depends on how we're saving user IDs
      where: {
        id: req.params.userId,
      },
    });
    return res.status(200).json({ msg: 'User deleted.' });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ msg: 'An error occurred deleting this user.' });
  }
}

async function readToken(req, res) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const userData = jwt.verify(token, process.env.JWT_SECRET);
    return res.json({ user: userData });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ msg: 'An error occured while reading the JWT.' });
  }
}

async function getFriends(req, res) {
  try {
    const friendsData = await User.findByPk(req.params.userId, {
      include: [
        {
          model: User,
          as: 'FavoriteUser',
        },
      ],
      attributes: {
        exclude: ['id', 'email', 'password', 'createdAt', 'updatedAt'],
      },
    });
    return res.status(200).json(friendsData);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ msg: 'An error occurred retrieving all user friends data.' });
  }
}

async function getSingleFriend(req, res) {
  try {
    const friendsData = await User.findByPk(req.params.userId, {
      include: [
        {
          model: User,
          as: 'FavoriteUser',
        },
      ],
      attributes: {
        exclude: ['id', 'email', 'password', 'createdAt', 'updatedAt'],
      },
    });
    console.log(req.params.friendId);
    const favoriteUsers = friendsData.FavoriteUser;
    for (let i = 0; i < favoriteUsers.length; i++) {
      const element = favoriteUsers[i];
      console.log(i);
      console.log(element.dataValues.id);
      if (element.dataValues.id == req.params.friendId) {
        return res.status(200).json(element.dataValues);
      }
    }
    return res
      .status(404)
      .json({ msg: 'No friend with this id is associated with this user.' });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ msg: 'An error occurred retrieving user friend data.' });
  }
}

async function createFriend(req, res) {
  try {
    const userData = await User.findByPk(req.params.userId);
    const createdFriend = await userData.addFavoriteUser(req.params.friendId);
    // TODO: Confirm user and friend exist!
    console.log(createdFriend);
    return res.status(201).json({ msg: 'Friend added.' });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ msg: 'An error occurred adding the friend.' });
  }
}

async function deleteFriend(req, res) {
  try {
    const userData = await User.findByPk(req.params.userId);
    const deletedFriend = await userData.removeFavoriteUser(
      req.params.friendId
    );
    // TODO: Confirm user and friend exist!
    console.log(deletedFriend);
    return res.status(200).json({ msg: 'Friend deleted.' });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ msg: 'An error occurred removing the friend.' });
  }
}

// Utility functino for creating a deck with 20 random cards.
const deckBuild = async () => {
  let deckSet = new Set(); 
  while(deckSet.size < 20) {
    const newCardId = Math.floor((Math.random() * 42) + 1);
    deckSet.add(newCardId);
  };

  return deckSet
};

module.exports = {
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
};
