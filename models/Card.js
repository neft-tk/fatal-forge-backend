const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Card extends Model {
  rarityScore() {
    const score = this.topAttack + this.bottomAttack + this.rightAttack + this.leftAttack;

    // TODO: Only console logging for now, create ranking system based on score and return that!
    console.log(score);
  };
};

/* Card Properties: */
/*
  Unique ID - A unique ID in order to find a card. AUTOMATICALLY DONE!
  Card Name - A card name for player to recognize the card.
  Class - A potential class for identifying different card types.
  Top Attack - The attack value for the top space.
  Bottom Attack - The attack value for the bottom space.
  Right Attack - The attack value for the right space.
  Left Attack - The attack value for the left space.

  // TODO: Add a rarity system.
  Rarity - A rarity score. If the attack score adds up to 8, it is a common card. If it adds up to 10, it is a scarce card. If it adds up to 12, it is a rare card.
*/

/* Card Relationships: */
/*
  A card can BELONG TO MANY decks.
  A card can BELONG to many users THROUGH the deck.
*/

Card.init(
  {
    cardName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    class: {
      type: DataTypes.STRING,
      allowNull: false
    },
    topAttack: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    bottomAttack: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    rightAttack: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    leftAttack: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize
  }
);

module.exports = Card;