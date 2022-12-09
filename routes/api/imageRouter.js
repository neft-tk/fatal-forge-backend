const router = require('express').Router();

const { 
  getSingleImage
} = require('../../controllers/imageController');

// @ api/images/:pathName
router.route('/*')
.get(getSingleImage);

module.exports = router;