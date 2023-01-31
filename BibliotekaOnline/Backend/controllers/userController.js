const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const registerUser = asyncHandler( async (req,res) => {
    const { username, email, password } = req.body

    if(!username || !email || !password) {
        res.status(400)
        throw new Error('Wypełnij wszystkie wymagane pola')
    }

    const userExsists = await User.findOne({email})

    if(userExsists){
        res.status(400)
        throw new Error('Użytkownik z takim emailem już istnieje')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        username,
        email,
        password: hashedPassword
    })

    if(user){
        res.status(201).json({
            _id:user.id,
            username:user.username,
            email:user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Złe dane użytkownika')
    }
})

const loginUser = asyncHandler( async (req,res) => {
    const { email,password } = req.body

    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id:user.id,
            username:user.username,
            email:user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Zły email lub hasło')
    }
})

const getUserData = asyncHandler( async (req,res) => {
    const { _id, username, email, books } = await User.findById(req.user.id)

    res.status(200).json({
        id:_id,
        username,
        email,
        books
    })
})

const getUserBooks = asyncHandler( async (req,res) => {
    const { books } = await User.findById(req.user.id)

    res.status(200).json({
        books
    })
})

const updateUserData = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(400)
        throw new Error('User not found')
    }

    const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body,{ new:true})

    res.status(200).json(updatedUser)
})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    })
}

module.exports = {
    registerUser,
    loginUser,
    getUserData,
    updateUserData,
    getUserBooks
}