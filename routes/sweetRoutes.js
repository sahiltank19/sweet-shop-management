// backend/routes/sweetRoutes.js
const express = require('express');
const router = express.Router();
const { auth, adminAuth } = require('../middleware/auth');
const {
  createSweet,
  getAllSweets,
  searchSweets,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet
} = require('../controllers/sweetController');

router.post('/', auth, adminAuth, createSweet);
router.get('/', auth, getAllSweets);
router.get('/search', auth, searchSweets);
router.put('/:id', auth, adminAuth, updateSweet);
router.delete('/:id', auth, adminAuth, deleteSweet);
router.post('/:id/purchase', auth, purchaseSweet);
router.post('/:id/restock', auth, adminAuth, restockSweet);

module.exports = router;