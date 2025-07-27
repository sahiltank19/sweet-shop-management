// backend/tests/sweet.test.js
const request = require('supertest');
const app = require('../app');
const { User, Sweet } = require('../models');
const jwt = require('jsonwebtoken');

describe('Sweet Controller', () => {
  let userToken;
  let adminToken;
  
  beforeAll(async () => {
    await User.destroy({ where: {} });
    await Sweet.destroy({ where: {} });
    
    // Create test user
    const user = await User.create({
      username: 'testuser',
      email: 'user@example.com',
      password: 'password123',
      role: 'user'
    });
    
    // Create test admin
    const admin = await User.create({
      username: 'adminuser',
      email: 'admin@example.com',
      password: 'password123',
      role: 'admin'
    });
    
    userToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    adminToken = jwt.sign({ id: admin.id }, process.env.JWT_SECRET);
    
    // Create test sweets
    await Sweet.bulkCreate([
      { name: 'Chocolate Bar', category: 'Chocolate', price: 1.99, quantity: 10 },
      { name: 'Gummy Bears', category: 'Gummy', price: 2.49, quantity: 5 },
      { name: 'Lollipop', category: 'Hard Candy', price: 0.99, quantity: 0 }
    ]);
  });

  describe('GET /api/sweets', () => {
    it('should return all sweets for authenticated user', async () => {
      const response = await request(app)
        .get('/api/sweets')
        .set('Authorization', `Bearer ${userToken}`);
      
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(3);
    });
  });

  describe('POST /api/sweets', () => {
    it('should allow admin to create a new sweet', async () => {
      const response = await request(app)
        .post('/api/sweets')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'New Candy',
          category: 'Test',
          price: 3.99,
          quantity: 15
        });
      
      expect(response.status).toBe(201);
      expect(response.body.name).toBe('New Candy');
    });

    it('should not allow regular user to create sweet', async () => {
      const response = await request(app)
        .post('/api/sweets')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          name: 'User Candy',
          category: 'Test',
          price: 1.99,
          quantity: 5
        });
      
      expect(response.status).toBe(403);
    });
  });

  describe('POST /api/sweets/:id/purchase', () => {
    it('should allow user to purchase sweet', async () => {
      const sweets = await Sweet.findAll();
      const sweetId = sweets[0].id;
      
      const response = await request(app)
        .post(`/api/sweets/${sweetId}/purchase`)
        .set('Authorization', `Bearer ${userToken}`);
      
      expect(response.status).toBe(200);
      expect(response.body.quantity).toBe(9); // Original was 10
    });

    it('should not allow purchase if out of stock', async () => {
      const outOfStockSweet = await Sweet.findOne({ where: { quantity: 0 } });
      
      const response = await request(app)
        .post(`/api/sweets/${outOfStockSweet.id}/purchase`)
        .set('Authorization', `Bearer ${userToken}`);
      
      expect(response.status).toBe(400);
    });
  });

  // Additional tests for other endpoints...
});