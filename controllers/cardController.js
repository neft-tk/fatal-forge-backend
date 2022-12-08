const express = require('express');
const router = express.Router();
const { User, Deck, Card } = require('../models');


module.exports = {

    getCards(req,res) {
       Card.findAll().then(cardData => {
           res.json(cardData)
       }).catch((err) => {
           console.log(err);
           res.json({ msg: "An error occurred retrieving all card data.", err})
       })
    },

    getSingleCard(req,res) {
        Card.findByPk(req.params.id).then(cardData => {
            res.json(cardData)
        }).catch((err) => {
            console.log(err);
            res.json({ msg: "An error occurred retrieving one specific card based on id.", err})        
        })
    }

}