const express = require('express');
const router = express.Router();
const { User, Deck, Card } = require('../models');

router.get("/", (req,res) => {
    Card.findAll().then(cardData => {
        res.json(cardData)
    }).catch((err) => {
        console.log(err);
        res.json({ msg: "An error occurred retrieving all card data.", err})
    })
})

router.get("/:id", (req,res) => {
    Card.findByPk(req.params.id).then(cardData => {
        res.json(cardData)
    }).catch((err) => {
        console.log(err);
        res.json({ msg: "An error occurred retrieving one specific card based on id.", err})        
    })
})