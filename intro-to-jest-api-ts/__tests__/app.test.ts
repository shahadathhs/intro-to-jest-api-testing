import request from 'supertest';
import app from '../src/app';

describe('API Endpoints', () => {
  let server: any;

  beforeAll((done) => {
    server = app.listen(4000, () => {
      console.log('Test server running on port 4000');
      done();
    });
  });

  afterAll((done) => {
    server.close(done);
  });

  it('should return a list of books', async () => {
    const response = await request(server).get('/api/books');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should create a new book', async () => {
    const newBook = {
      title: 'Test Book',
      author: 'Test Author',
    };

    const response = await request(server).post('/api/books').send(newBook);
    expect(response.status).toBe(201);
    expect(response.body.title).toBe(newBook.title);
    expect(response.body.author).toBe(newBook.author);
  });
});
