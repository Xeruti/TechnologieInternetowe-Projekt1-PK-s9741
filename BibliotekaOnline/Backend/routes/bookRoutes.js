const express = require('express')
const router = express.Router()


const { getBooks, addBook, updateBook, deleteBook, getBook } = require("../controllers/bookController")
const upload = require('../middleware/upload');

router.get('/', getBooks)

router.get('/book/:id', getBook)

router.post('/', upload.single('book'), addBook)

router.put('/:id', updateBook)

router.delete('/:id', deleteBook)

module.exports = router
