const User = require("./User.js");
const Deck = require("./Deck.js");
const Card = require("./Card.js");

// A user has a many to many relationship with other users who are their friends.
User.belongsToMany(User, {
  through: "UserUser",
  as: "FavoriteUser"
});

// A user has many decks.
User.hasMany(Deck, {
  onDelete: 'CASCADE'
});

// A deck belongs to one owner.
Deck.belongsTo(User);

// A deck has many cards.
Deck.belongsToMany(Card, {
  through: "CardDeck"
});

// A card can belong to many decks (same card in different decks).
Card.belongsToMany(Deck, {
  through: "CardDeck"
});

module.exports = { User, Deck, Card };
