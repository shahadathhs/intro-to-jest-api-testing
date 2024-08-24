const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
let server;

beforeEach((done) => {
  server = app.listen(3000, () => {
    console.log('Test server running on port 3000');
    done();
  });
});

afterEach((done) => {
  server.close(() => {
    console.log('Test server closed');
    done();
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('API tests', () => {
  it('should return all books', async () => {
    const response = await request(server).get('/api/books');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expect.any(Array));
  });

  it('should create a new book', async () => {
    const newBook = { title: 'Test Book', author: 'Test Author' };
    const response = await request(server)
      .post('/api/books')
      .send(newBook);
    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe('Test Book');
    expect(response.body.author).toBe('Test Author');
  });
});
