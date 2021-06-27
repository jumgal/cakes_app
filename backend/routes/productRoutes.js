const express = require('express')
const { getCakes, getCakeById } = require('../controllers/productController.js')
const router = express.Router();

router.route('/').get(getCakes);
router.route('/:id').get(getCakeById)

module.exports = router;