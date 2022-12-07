const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken")

const userRoutes = require("./userController");
const deckRoutes = require("./deckController");
const cardRoutes = require("./cardController");

// TODO: Image routes
// @ public/images/cardback... Where should this go?

// TODO: Image routes
// @ public/images/cardsprite... Where should this go?

router.get("/", (req, res) => {
  res.send("Homepage placeholder")
})

router.use("/api/users", userRoutes)
router.use("/api/decks", deckRoutes)
router.use("/api/cards", cardRoutes)

module.exports = router