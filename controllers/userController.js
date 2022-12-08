const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {User,Deck} = require('../models');

async function getUsers(req,res) {
    try {
        const userData = await User.findAll()
        const userJSONData = res.json(userData)
        return userJSONData        
    } catch (err) {
        console.log(err);
        return res.json({ msg: "an error occurred retrieving all user data", err,})                
    }
}

async function getSingleUser(req, res) {
    try {
        const userData = await User.findByPk(req.params.id,{
            include:[Deck]
        })
        const userJSONData = res.json(userData)
    } catch (err) {
        console.log(err);
        return res.json({msg: "An error occurred getting a specific user based on their id", err,})        
    }
}

// User Login 
async function postUserLogin(req,res) {
    User.findOne({
        where:{
            email:req.body.email
        }
    }).then(foundUser=>{
        if(!foundUser){
            return res.status(401).json({msg:"invalid username"})
        } else if(!bcrypt.compareSync(req.body.password,foundUser.password)){
            return res.status(401).json({msg:"invalid password"})
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
}

async function createUser(req,res) {
    try {
        const userData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        })
        const userJSONData = res.json(userData);
        return userJSONData
    } catch (err) {
        console.log(err);
        return res.status(500).json({msg: "An error occurred creating a new user", err})      
    }
}

async function updateUser(req,res) {
    try {
        const userData = await User.update(
            {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
            },
            {
                // TODO: depends on how we're saving user IDs
                where: {
                    userId: req.body.userId,
                }
            })
        const userJSONData = res.json(userData);
        return userJSONData
    } catch (err) {
        console.log(err);
        return res.status(500).json({msg: "An error occurred updating this user", err})        
    }
}

async function deleteUser(req,res) {
    try {
        const userData = await User.destroy({
             // TODO: depends on how we're saving user IDs
             where: {
                userId: req.params.userId,
            }
        })
        const userJSONData = res.json(userData);
        return userJSONData
    } catch (err) {
        console.log(err);
        return res.status(500).json({msg: "An error occurred deleting this user", err})           
    }   
}
  
async function readToken(req,res) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const userData = jwt.verify(token,process.env.JWT_SECRET)
        return res.json({user:userData})
    } catch (err) {
        return res.status(500).json({msg:err})
    }
}
  
module.exports = {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    postUserLogin,
    readToken,
    // getFriends,
    // getSingleFriend,
    // createFriend,
    // deleteFriend
}