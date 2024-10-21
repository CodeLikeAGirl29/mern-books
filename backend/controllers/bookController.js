const Book = require("../model/bookModel");
const timestamps = new Date().toISOString();

const createBook = async (req, res) => {
  try {
    const { title, author, publishYear } = req.body;
    
    if (!title || !author || !publishYear) {
      return res.status(400).send({ message: "Fill All Data" });
    }

    const newBook = {
      title,
      author,
      publishYear,
    };

    const book = await Book.create(newBook);
    res.status(200).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const getAllBook = async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).json({
      count: books.length,
      data: books,
      timestamps: timestamps,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    
    if (!book) {
      return res.status(404).send({ message: "Book Not Found" });
    }

    res.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const { title, author, publishYear } = req.body;
    
    if (!title || !author || !publishYear) {
      return res.status(400).send({ message: "Fill All Data" });
    }

    const { id } = req.params;
    const book = await Book.findByIdAndUpdate(id, req.body, { new: true });

    if (!book) {
      return res.status(404).send({ message: "Book Not Found" });
    }

    res.status(200).json({ data: book });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ message: "Invalid Book ID" });
      }
    if (!book) {
      return res.status(404).send({ message: "Book Not Found" });
    }

    res.status(200).send({ message: "Book Successfully Deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

module.exports = { createBook, getAllBook, getBookById, updateBook, deleteBook };
