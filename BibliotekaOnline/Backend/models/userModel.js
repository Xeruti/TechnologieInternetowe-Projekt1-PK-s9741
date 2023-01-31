const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Podaj nazwę użytkownika'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Dodaj email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Dodaj hasło'],
        unique: true
    },
    books: [{ type : mongoose.Schema.Types.ObjectId, ref: 'Book'}]
})

module.exports = mongoose.model('User', userSchema)