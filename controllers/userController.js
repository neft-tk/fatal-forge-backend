const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const  {User, Deck, Card } = require('../models');

router.get("/", (req,res)=> {
    User.findAll().then(userData => {
        res.json(userData)
    }).catch((err) => {
        console.log(err);
        res.json({ msg: "an error occurred retrieving all user data", err,})        
    })
})

router.get("/:id", (req, res) => {
    User.findByPk(req.params.id,{
        include:[Deck]
    }).then(userData => {
        res.json(userData)
    }).catch((err) => {
        console.log(err);
        res.json({msg: "An error occurred getting a specific user based on their id", err,})        
    })
})

router.post("/login",(req,res)=>{
    User.findOne({
        where:{
            email:req.body.email
        }
    }).then(foundUser=>{
        if(!foundUser){
            return res.status(401).json({msg:"invalid login credentials"})
        } else if(!bcrypt.compareSync(req.body.password,foundUser.password)){
            return res.status(401).json({msg:"invalid login credentials"})
        } else {
            const token = jwt.sign({
                id:foundUser.id,
                email:foundUser.email
            },process.env.JWT_SECRET,{
                expiresIn:"2h"
            })
            return res.json({
                token,
                user:foundUser
            })
        }
    })
})