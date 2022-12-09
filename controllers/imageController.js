const express = require('express');
const router = express.Router();
const path = require('path');

async function getSingleImage(req, res) {
  try {
    const pathName = req.params[0];
    const fullPath = path.join(__dirname, `../public/images/${pathName}`)
    console.log(fullPath);
    return res.status(200).sendFile(fullPath);
  } catch (err) {
    console.log(err);
    return res.status(500).json({msg: 'An error occurred retrieving that image.'});
  };
};

module.exports = {
  getSingleImage
};