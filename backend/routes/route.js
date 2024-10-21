const express = require('express');
const { getAllBook, getBookById, createBook, updateBook, deleteBook } = require('../controllers/bookController');

const router = express.Router();

router.get('/',getAllBook);
router.get('/:id',getBookById);
router.post('/',createBook);
router.put('/:id', updateBook)
router.delete('/:id', deleteBook)

module.exports = router;