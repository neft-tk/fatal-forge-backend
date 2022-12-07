const express = require('express');
const router = express.Router();
const {Card} = require('../models');

router.get("/", (req,res) => {
    Deck.findAll().then(deckData => {
        res.json(deckData)
    }).catch((err) => {
        console.log(err);
        res.json({ msg: "An error occurred retrieving all decks.", err})
    })
})

router.get("/:id", (req, res) => {
    Deck.findByPk(req.params.id, {
        include: [Card]
    }).then(deckData => {
        res.json(deckData)
    }).catch((err) => {
        console.log(err);
        res.json({ msg: "An error occurred retrieving a deck and it's cards based on the deck's id", err})
    })
})

// TODO: waiting on model info
// router.put("/:id", (req, res) => {
//     Deck.update(
//         {

//         },
//         {
//             where: {
//                 id: req.params.id,
//             },
//         }
//     )
//     .then((updatedDeck) => {
//         res.json(updatedDeck);
//     })
//     .catch((err) => res.json({ msg:"An error occurred updating a deck based on an id.", err}))
// })


router.delete("/:id", async (req,res) => {
    try {
        const deckData = await Deck.destroy({
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
})
