const express = require('express');
const router = express.Router();
const jwt =require("jsonwebtoken")

const userRoutes = require("./userController");
const deckRoutes = require("./deckController");
const cardRoutes = require("./cardController");

router.get("/", (req, res) => {
  res.send("Homepage placeholder")
})

router.use("/api/users", userRoutes)
router.use("/api/decks", deckRoutes)
router.use("/api/cards", cardRoutes)

module.exports = router