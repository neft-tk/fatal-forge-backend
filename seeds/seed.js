const sequelize = require('../config/connection');
const { User, Deck, Card } = require('../models');

const userData = require('./UserData.json');
const deckData = require('./DeckData.json');
const cardData = require('./CardData.json');

const seedDatabase = async () => {
  await sequelize.query("SET FOREIGN_KEY_CHECKS = 0");
  await sequelize.sync({ force: true });

  // Seeds user data AND encrypts passwords.
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  

  // Seeds deck and card data.
  const decks = await Deck.bulkCreate(deckData);
  const cards = await Card.bulkCreate(cardData);
  
  // Seeds relationships between user and their friends (other users), decks, and cards.
  // TODO: Finish the seeding relationships.

  await sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
  process.exit(0);
};

seedDatabase();