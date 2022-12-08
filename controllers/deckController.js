const express = require('express');
const router = express.Router();
const {Card} = require('../models');
const Deck = require('../models/Deck');

async function getDecks(req,res) {
    try {
        const deckData = await Deck.findAll()
        const deckJSONData = res.json(deckData)
        return deckJSONData        
    } catch (err) {
        console.log(err);
        return res.json({ msg: "An error occurred retrieving all decks.", err})        
    }
}

async function getSingleDeck(req, res) {
    try {
        const deckData = await Deck.findByPk(req.params.id, {
            include: [Card]
        })
        const deckJSONData = res.json(deckData)        
    } catch (err) {
        console.log(err);
        return res.json({ msg: "An error occurred retrieving a deck and it's cards based on the deck's id", err}) 
    }
}

async function createDeck(req, res) {
    try {
        const deckData = await Deck.create({
            deckName: req.body.deckName,
            backImage: req.body.backImage,
            userId: req.body.userId,
        })
        const deckJSONData = res.json(deckData)        
    } catch (error) {
        console.log(err);
        return res.status(500).json({ msg: "error creating deck for this user", err} )        
    }
}

async function updateDeck(req, res) {
    try {
        const deckData = await Deck.update(
            {
                deckName: req.body.deckName,
                backImage: req.body.backImage,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        )
        const deckJSONData = res.json(deckData)
    } catch (err) {
        console.log(err);        
        return res.json({ msg:"An error occurred updating a deck based on an id.", err})        
    }
}

async function deleteDeck(req,res) {
    try {
        const deckData = Deck.destroy({
            where: {
                id: req.params.id,
            },
        })

        if (!deckData) {
            res.status(404).json({ msg: "No deck data at this id." });
            return
        }

        res.status(200).json(deckData);
    } catch (err) {
        res.status(500).json(err)        
    }
}

module.exports = {
    getDecks,
    getSingleDeck,
    createDeck,
    updateDeck,
    deleteDeck
}