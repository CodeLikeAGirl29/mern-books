const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Book = require('./model/bookModel');
const bookRoutes = require('./routes/route.js')
const cors = require('cors')
dotenv.config();

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(
    cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type']
    })
);

// route
app.use("/books", bookRoutes);

app.get('/', (req, res) => {
    res.status(200)
    res.send("Welcome To Bookstore MERN")
})

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`App is listening to port: ${PORT}`)
        });
        console.log("App Connected To Database")
    })
    .catch((error) => {
        console.log(error)
    })

