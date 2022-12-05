const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model {}

/* User Properties: */
/*
  Unique ID - A unique ID in order to find a user.
  User Name - A user has a name that appears as their in-game/in-dashboard name.
  E-mail - An email is required to log in/sign up to the user's account.
  Password - A password is required for logging in to the user's account.
  Avatar - An image associated with the user.
  
  // DOWN THE LINE - 
  Color of faction.
*/

/* User Relationships: */
/*
  A user HAS MANY friends, aka other users.
  A user HAS MANY decks.
  A user HAS MANY cards THROUGH it's decks.

  // DOWN THE LINE - 
  A user HAS UNIQUE setting options.
  A user HAS UNIQUE stats.
*/

User.init({

});

model.exports = User;