const User = require("./User.js");
const Deck = require("./Deck.js");
const Card = require("./Card.js");

// A user has a many to many relationship with other users who are their friends.
User.belongsToMany(User, {
  through: "UserUser",
  as: "FriendedUser"
});

// TODO: Other relationships