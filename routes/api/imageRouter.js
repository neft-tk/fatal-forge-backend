const router = require('express').Router();

const { 
  getImages,
  getSingleImage
} = require('../../controllers/imageController');

// @ api/image
router.route('/')
.get(getImages);

// @ api/image/:pathName
router.route('/:pathName')
.get(getSingleImage);

module.exports = router;