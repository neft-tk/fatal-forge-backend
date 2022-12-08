const User = require("./User.js");
const Deck = require("./Deck.js");
const Card = require("./Card.js");

// A user has a many to many relationship with other users who are their friends.
User.belongsToMany(User, {
  through: "UserUser",
  as: "FriendedUser"
});

// A user has many decks.
User.hasMany(Deck, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

// A deck belongs to one owner.
Deck.belongsTo(User, {
  foreignKey: 'user_id'
});

// A deck has many cards.
Deck.hasMany(Card, {
  foreignKey: 'deck_id',
  onDelete: 'CASCADE'
});

// A card can belong to many decks (same card in different decks).
Card.belongsToMany(Deck, {
  through: "CardDeck"
});

module.exports = { User, Deck, Card };