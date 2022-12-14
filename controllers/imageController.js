const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

async function getSingleImage(req, res) {
  const pathName = req.params[0];
  const fullPath = path.join(__dirname, `../public/images/${pathName}`)
  console.log(fullPath);

  try {
    if(fs.existsSync(fullPath)) {
      console.log("Image found.");
      return res.status(200).sendFile(fullPath);
    } else {
      console.log("Sending Default.");
      return res.status(404).sendFile(path.join(__dirname, `../public/images/profile/Default-Profile.png`));
    }
    
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: 'Error retriving an image.'});
  };
};

module.exports = {
  getSingleImage
};