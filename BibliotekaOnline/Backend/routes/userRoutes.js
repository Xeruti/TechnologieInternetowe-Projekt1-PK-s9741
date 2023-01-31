const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getUserData, updateUserData, getUserBooks } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/user', protect, getUserData)
router.put('/user', protect, updateUserData)
router.get('/userBooks', protect, getUserBooks)

module.exports = router