const express = require('express');
const router = express.Router();
const path = require('path');

async function getSingleImage(req, res) {
  try {
    const imageName = req.params.pathName;
    return res.status(200).sendFile(path.join(__dirname, `../public/images/cardsprite/${imageName}.png`));
  } catch (err) {
    console.log(err);
    return res.status(500).json({msg: 'An error occurred retrieving that image.'});
  };
};

module.exports = {
  getSingleImage
};