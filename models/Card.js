const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Card extends Model {}

/* Card Properties: */
/*
  Unique ID - A unique ID in order to find a card.
  Card Name - A card name for player to recognize the card.
  Class - A potential class for identifying different card types.
  Rarity - A rarity score. If the attack score adds up to 8, it is a common card. If it adds up to 10, it is a scarce card. If it adds up to 12, it is a rare card.
  Top Attack - The attack value for the top space.
  Bottom Attack - The attack value for the bottom space.
  Right Attack - The attack value for the right space.
  Left Attack - The attack value for the left space.
  Image Path - The image path for the card avatar.
*/

/* Card Relationships: */
/*
  A card can BELONG to many decks.
  A card can BELONG to many users THROUGH the deck.
*/

Card.init({

});

model.exports = Card;