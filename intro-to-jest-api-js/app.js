const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const mongoURI = 'mongodb://localhost:27017/testDB';

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
});

const BookModel = mongoose.model('Book', bookSchema);

app.post('/api/books', async (req, res) => {
  const newBook = new BookModel({
    title: req.body.title,
    author: req.body.author,
  });
  await newBook.save();
  res.status(201).send(newBook);
});

app.get('/api/books', async (req, res) => {
  const books = await BookModel.find();
  res.json(books);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = app;
