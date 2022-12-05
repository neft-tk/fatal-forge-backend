const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Deck extends Model {}

/* Deck Properties: */
/*
  Unique ID - A unique ID in order to find a deck.
  Deck Name - A deck name for player to recognize the card.
  Image Path - The image path for the card back.
  Deck Score - The value of all the attack scores added together - Implemeneted as a function.
*/

/* Deck Relationships: */
/*
  A deck BELONGS to ONE owner.
  A deck HAS MANY cards.
*/

Deck.init({

});

model.exports = Deck;