const { Card } = require('../models');

async function getCards(req, res) {
  try {
    const cardsData = await Card.findAll();
    return res.status(200).json(cardsData);
  } catch (err) {
    console.log(err);
    return res.status(500).json({msg: 'An error occurred retrieving all card data.'});
  };
};

async function getSingleCard(req, res) {
  try {
    console.log(`This is the params: ${JSON.stringify(req.params.cardId)}`);
    const cardData = await Card.findByPk(req.params.cardId);
    return res.status(200).json(cardData);
  } catch (err) {
    console.log(err);
    return res.status(500).json({msg: 'An error occurred retrieving one specific card based on id.'});
  };
};

module.exports = {
  getCards,
  getSingleCard,
};
