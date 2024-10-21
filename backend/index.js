const express = require('express');
const { PORT, mongoDBUrl } = require('./config');
const mongoose = require('mongoose');
const Book = require('./model/bookModel');
const bookRoutes = require('./routes/route.js')
const cors = require('cors')

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

mongoose.connect(mongoDBUrl)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`)
        });
        console.log("App Connected To Database")
    })
    .catch((error) => {
        console.log(error)
    })

