const express = require('express')
const { authUser, registerUser, getUserProfile, updateUserProfile } = require('../controllers/userController.js');
const protect = require('../middleware/authMiddleware.js')
const router = express.Router();



router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
router.route('/').post(registerUser)



module.exports = router;