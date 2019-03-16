"use strict"

const mongoose = require('mongoose');
const bookSchema = mongoose.Schema({
    title: String,
    description: String,
    images: String,
    price: Number
});

var Books = mongoose.model('Books', bookSchema)

module.exports = Books;