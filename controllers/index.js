const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken")

const userRoutes = require("./userController");
const deckRoutes = require("./deckController");
const cardRoutes = require("./cardController");

// TODO: Image routes
// @ public/images/cardsprite... Where should this go?

router.use("/api/users", userRoutes)
router.use("/api/decks", deckRoutes)
router.use("/api/cards", cardRoutes)


router.get("/", (req, res) => {
  res.send("Homepage placeholder")
})


router.get("/readtoken",(req,res)=>{
  const token =req.headers.authorization.split(" ")[1];
  try{

      const tokenData = jwt.verify(token,process.env.JWT_SECRET)
      console.log(tokenData)
  } catch(err){
      console.log("error")
      console.log(err);
      res.status(500).json({msg:"an error occurred!",err})
  }
  res.send("check your logs!")
})


module.exports = router