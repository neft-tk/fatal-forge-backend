const router = require('express').Router();

const { 
  getSingleImage
} = require('../../controllers/imageController');

// @ api/images/:pathName
router.route('/:pathName')
.get(getSingleImage);

module.exports = router;