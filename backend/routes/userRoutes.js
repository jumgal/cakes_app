const express = require('express')
const router = express.Router();
const { authUser, registerUser, getUserProfile, updateUserProfile, getUsers, getUserById, deleteUser, updateUser } = require('../controllers/userController.js');
const protect = require('../middleware/authMiddleware')
const admin = require('../middleware/authAdmin')


router.route('/').post(registerUser).get(protect, admin, getUsers)
router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
router.route('/:id').delete(protect, admin, deleteUser).put(protect, admin, updateUser).get(protect, admin, getUserById)






module.exports = router;