const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
const Product = require("../models/product.model");

require("dotenv").config();

/* Connecting to the database before each test. */
beforeEach(async () => {
  /* 
    Make sure this api string is not the real db string. 
    Because api testing do real api integration. 
    So testing will add unnecessary data in db.
    Thus, we need to use a mock db.
  */
  const mongodbURL = "mongodb://localhost:27017/apiTesting";
  await mongoose.connect(mongodbURL);
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

/* Testing routes for products. */
describe("Testing routes for products", () => {
  /* Make sure this matches with requirements */
  /* Make sure this matches with requirements */
  /* Make sure this matches with requirements */
  const product = {
    // _id must be an MongoDB ObjectId
    _id: new mongoose.Types.ObjectId(),
    name: "Product 1",
    price: 1000,
    description: "Description 1",
  };
  /*
  In get method first test run might fail if there is no product in db.
  so we need to create a product in db before testing.
  or do a second test run to get the product from db.
  */
  describe("GET /api/products", () => {
    it("should return all products", async () => {
      const res = await request(app).get("/api/products");

      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
  });

  describe("GET /api/products/:id", () => {
    it("should return a product", async () => {
      // first create a product with an _id should be a ObjectId
      const createdProduct = await Product.create(product);
      // then get the product by _id
      const res = await request(app).get(`/api/products/${createdProduct._id}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.name).toBe(createdProduct.name);
    });
  });

  describe("POST /api/products", () => {
    it("should create a product", async () => {
      const res = await request(app).post("/api/products").send({
        name: "Product 2",
        price: 1009,
        description: "Description 2",
      });

      expect(res.statusCode).toBe(201);
      expect(res.body.name).toBe("Product 2");
    });
  });

  describe("PUT /api/products/:id", () => {
    it("should update a product", async () => {
      const res = await request(app)
        // use _id from the created product in previous test
        .patch(`/api/products/${product._id}`)
        .send({
          name: "Product 3",
          price: 104,
          description: "Description 4",
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.price).toBe(104);
    });
  });

  describe("DELETE /api/products/:id", () => {
    it("should delete a product", async () => {
      const res = await request(app)
        // use _id from the created product in previous test
        .delete(`/api/products/${product._id}`);

      expect(res.statusCode).toBe(200);
    });
  });
});
