const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require("bcrypt");

class User extends Model {}

/* User Properties: */
/*
  Unique ID - A unique ID in order to find a user. AUTOMATICALLY DONE!
  User Name - A user has a name that appears as their in-game/in-dashboard name.
  E-mail - An email is required to log in/sign up to the user's account.
  Password - A password is required for logging in to the user's account.
  Image Path - An image associated with the user.
  Name: User's actual name. Optional.
  Bio: A user biography. Optional.
  
  // DOWN THE LINE - 
  Color of faction.
*/

/* User Relationships: */
/*
  A user HAS MANY TO MANY friends, aka other users.
  A user HAS MANY decks.
  A user HAS MANY cards THROUGH it's decks.

  // DOWN THE LINE - 
  A user HAS UNIQUE setting options.
  A user HAS UNIQUE stats.
*/

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      }
    },
    imagePath: {
      type: DataTypes.VIRTUAL,
      get(){
        return `profile/${this.username}.png`
      }
    },
    name: {
      type: DataTypes.STRING
    },
    motto: {
      type: DataTypes.TEXT
    }
    /* Room for more User characteristics! */
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      }
    },
    sequelize
  }
);

module.exports = User;