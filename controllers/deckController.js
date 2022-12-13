const { User, Deck, Card } = require('../models');

async function getDecks(req, res) {
  try {
    const decksData = await Deck.findAll({
      include: [
        {
          model: User
        },
        {
          model: Card
        }
      ]
    });
    return res.status(200).json(decksData);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: 'An error occurred retrieving all decks.'});
  };
};

async function getSingleDeck(req, res) {
  try {
    const deckData = await Deck.findByPk(req.params.deckId, {
      include: [
        {
          model: User
        },
        {
          model: Card
        }
      ],
    });
    return res.status(200).json(deckData);
  } catch (err) {
    console.log(err);
    return res.status(500).json({msg: "An error occurred retrieving a deck and it's cards based on the deck's id."});
  };
};

async function createDeck(req, res) {
  try {
    console.log('body', req.body)
    const cards = req.body.cardIds;

    const createDeckData = await Deck.create({
      deckName: req.body.deckName,
      backImage: req.body.backImage,
      UserId: req.body.userId
    });

    await createDeckData.addCards(cards)
    return res.status(200).json(createDeckData);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: 'An error creating deck for this user.'});
  };
};

async function updateDeck(req, res) {
  try {
    const updateDeckData = await Deck.update(
      {
        deckName: req.body.deckName,
        backImage: req.body.backImage,
      },
      {
        where: {
          id: req.params.deckId
        },
      }
    );
    return res.status(200).json(updateDeckData);
  } catch (err) {
    console.log(err);
    return res.status(500).json({msg: 'An error occurred updating a deck based on an id.'});
  };
};

async function deleteDeck(req, res) {
  try {
    const deleteDeckData = Deck.destroy({
      where: {
        id: req.params.deckId
      },
    });
    if (!deleteDeckData) {
      res.status(404).json({ msg: 'No deck data at this id.' });
      return;
    }
    return res.status(200).json(deleteDeckData);
  } catch (err) {
    console.log(err);
    res.status(500).json({msg: 'An error occurred deleting a deck based on an id.'});
  };
};

module.exports = {
  getDecks,
  getSingleDeck,
  createDeck,
  updateDeck,
  deleteDeck,
};
