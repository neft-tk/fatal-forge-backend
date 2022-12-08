const express = require('express');
const router = express.Router();
const {User,Deck,Card} = require('../models');

async function getCards(req,res)  {
    try {
        const cardData = await Card.findAll()
        const cardJSONData = res.json(cardData)
        return cardJSONData    
    } catch (err) {
        console.log(err);
        return res.json({ msg: "An error occurred retrieving all card data.", err})    
    }
}

async function getSingleCard(req,res) {
    try {
        const cardData = await Card.findByPk(req.params.id);
        const cardJSONData = res.json(cardData)
    } catch (err) {
        console.log(err);
        return res.json({ msg: "An error occurred retrieving one specific card based on id.", err})            
    }    
}

module.exports = {
    getCards,
    getSingleCard
}