// backend/controllers/sweetController.js
const { Sweet } = require('../models');

const createSweet = async (req, res) => {
  try {
    const sweet = await Sweet.create(req.body);
    res.status(201).send(sweet);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getAllSweets = async (req, res) => {
  try {
    const sweets = await Sweet.findAll();
    res.send(sweets);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const searchSweets = async (req, res) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;
    const where = {};

    if (name) where.name = { [Op.like]: `%${name}%` };
    if (category) where.category = category;
    if (minPrice) where.price = { ...where.price, [Op.gte]: parseFloat(minPrice) };
    if (maxPrice) where.price = { ...where.price, [Op.lte]: parseFloat(maxPrice) };

    const sweets = await Sweet.findAll({ where });
    res.send(sweets);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const updateSweet = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Sweet.update(req.body, { where: { id } });
    
    if (!updated) {
      return res.status(404).send({ error: 'Sweet not found' });
    }
    
    const updatedSweet = await Sweet.findByPk(id);
    res.send(updatedSweet);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const deleteSweet = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Sweet.destroy({ where: { id } });
    
    if (!deleted) {
      return res.status(404).send({ error: 'Sweet not found' });
    }
    
    res.send({ message: 'Sweet deleted successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const purchaseSweet = async (req, res) => {
  try {
    const { id } = req.params;
    const sweet = await Sweet.findByPk(id);
    
    if (!sweet) {
      return res.status(404).send({ error: 'Sweet not found' });
    }
    
    if (sweet.quantity < 1) {
      return res.status(400).send({ error: 'Sweet out of stock' });
    }
    
    sweet.quantity -= 1;
    await sweet.save();
    res.send(sweet);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const restockSweet = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    
    if (!quantity || quantity < 1) {
      return res.status(400).send({ error: 'Invalid quantity' });
    }
    
    const sweet = await Sweet.findByPk(id);
    
    if (!sweet) {
      return res.status(404).send({ error: 'Sweet not found' });
    }
    
    sweet.quantity += parseInt(quantity, 10);
    await sweet.save();
    res.send(sweet);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  createSweet,
  getAllSweets,
  searchSweets,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet
};