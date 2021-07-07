const express = require('express')
const { getCakes, getCakeById, deleteCake, createCake, updateCake, createCakeReview, getTopCakes } = require('../controllers/productController.js')
const router = express.Router();
const protect = require('../middleware/authMiddleware')
const admin = require('../middleware/authAdmin')

router.route('/').get(getCakes).post(protect, admin, createCake)
router.route('/:id').get(getCakeById).delete(protect, admin, deleteCake).put(protect, admin, updateCake)
router.get('./top', getTopCakes)
router.route('/:id/reviews').post(protect, createCakeReview)

module.exports = router;