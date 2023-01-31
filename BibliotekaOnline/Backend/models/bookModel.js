const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Uzupełnij tytuł']
    },
    author: {
        type: String,
        required: [true, 'Uwzględnij autora']
    },
    genre: {
        type: String,
        required: [true, 'Podaj gatunek']
    },
    year: {
        type: Number,
        required: [true, 'Podaj rok wydania']
    },
    book: {
        type: String,
        required: [true, 'Dodaj książkę']
    }
})

module.exports = mongoose.model('Book', bookSchema);