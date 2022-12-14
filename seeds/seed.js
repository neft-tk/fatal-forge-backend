const sequelize = require('../config/connection');
const { User, Deck, Card } = require('../models');

const userData = require('./UserData.json');
const deckData = require('./DeckData.json');
const cardData = require('./CardData.json');

const seedDatabase = async () => {
  await sequelize.query("SET FOREIGN_KEY_CHECKS = 0");
  await sequelize.sync({ force: true });

  // Seeds user data AND encrypts passwords. NOTE: Order is preserved from JSON file if seeded this way (important for user to user relationship).
  const userJoe = await User.create(userData[0], {
    individualHooks: true,
    returning: true,
  });

  const userErik = await User.create(userData[1], {
    individualHooks: true,
    returning: true,
  });

  const userVictor = await User.create(userData[2], {
    individualHooks: true,
    returning: true,
  });

  const userJonathan = await User.create(userData[3], {
    individualHooks: true,
    returning: true,
  });

  const userGrid = await User.create(userData[4], {
    individualHooks: true,
    returning: true,
  });

  const userDane = await User.create(userData[5], {
    individualHooks: true,
    returning: true,
  });

  const userJesse = await User.create(userData[6], {
    individualHooks: true,
    returning: true,
  });

  const userRyan = await User.create(userData[7], {
    individualHooks: true,
    returning: true,
  });

  // Seeds deck and card data.
  const decks = await Deck.bulkCreate(deckData);
  const cards = await Card.bulkCreate(cardData);

  // Seeds relationships between user and their friends (other users), decks, and cards.
  // Seeding 20 random cards into the 6 seeded decks.
  for (let i = 0; i < decks.length; i++) {
    const thisDeck = decks[i];
    const cardsForDeck = await deckBuild();
    const cardsForDeckArray = Array.from(cardsForDeck);
    await thisDeck.addCards(cardsForDeckArray);
  };

  // Seeding friends into users.
  await userJoe.addFavoriteUser(2);
  await userJoe.addFavoriteUser(3);
  await userErik.addFavoriteUser(1);
  await userErik.addFavoriteUser(3);
  await userVictor.addFavoriteUser(1);
  await userVictor.addFavoriteUser(2);
  await userJonathan.addFavoriteUser(3);

  await sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
  process.exit(0);
};

const deckBuild = async () => {
  let deckSet = new Set(); 
  while(deckSet.size < 20) {
    const newCardId = Math.floor((Math.random() * 42) + 1);
    deckSet.add(newCardId);
  };

  return deckSet
};

seedDatabase();