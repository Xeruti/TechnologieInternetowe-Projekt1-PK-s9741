const asyncHandler = require('express-async-handler')

const Book = require('../models/bookModel')

const getBooks = asyncHandler(async (req, res) => {

    const books = await Book.find()

    res.status(200).json(books);
})

const getBook = asyncHandler(async (req, res) => {

    const book = await Book.findById(req.params.id)

    res.status(200).json(book);
})

const addBook = asyncHandler(async (req, res) => {
    const book = await Book.create({
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        year: req.body.year,
        book: req.file.filename
    })

    res.status(200).json(book)
})

const updateBook = asyncHandler(async (req, res) => {

    const book = await Book.findById(req.params.id)

    if(!book) {
        res.status(400)
        throw new Error('Book not found')
    }

    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body,{ new:true})

    res.status(200).json(updatedBook)
})

const deleteBook = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id)

    if(!book) {
        res.status(400)
        throw new Error('Book not found')
    }

    await book.remove()

    res.status(200).json(`Book ${req.params.id} deleted`)
})

module.exports = {
    getBooks,
    getBook,
    addBook,
    updateBook,
    deleteBook
}