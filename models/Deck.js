const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Deck extends Model {
  // TODO: Figure out how to calculate deck score. - Validate when we create a deck
}

/* Deck Properties: */
/*
  Unique ID - A unique ID in order to find a deck. AUTOMATICALLY DONE!
  Deck Name - A deck name for player to recognize the card.
  Back Image - The image name for the card back.

  // TODO: Add deck score later
  Deck Score - The value of all the attack scores added together - Implemeneted as a function.
*/

/* Deck Relationships: */
/*
  A deck BELONGS to ONE owner.
  A deck HAS MANY cards.
*/

Deck.init(
  {
    deckName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    backImage: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Basic'
    },
    imagePath:{
      type: DataTypes.VIRTUAL,
      get(){
        return `cardback/${this.backImage}.png`
      }
    }
  },
  {
    sequelize
  }
);

module.exports = Deck;