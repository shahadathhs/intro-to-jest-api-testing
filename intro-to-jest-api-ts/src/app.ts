import express, { Application, Request, Response } from 'express';
import mongoose, { Schema, Document } from 'mongoose';

const app: Application = express();
app.use(express.json());

// MongoDB connection
const mongoURI = 'mongodb://localhost:27017/testDB';
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

interface IBook extends Document {
  title: string;
  author: string;
}

const bookSchema: Schema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
});

const BookModel = mongoose.model<IBook>('Book', bookSchema);

app.post('/api/books', async (req: Request, res: Response) => {
  const newBook = new BookModel(req.body);
  await newBook.save();
  res.status(201).send(newBook);
});

app.get('/api/books', async (req: Request, res: Response) => {
  const books = await BookModel.find();
  res.json(books);
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
