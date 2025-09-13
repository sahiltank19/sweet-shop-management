// backend/app.js
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const sweetRoutes = require('./routes/sweetRoutes');
const studentRoutes = require('./routes/studentRoutes');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// Static serving for resumes
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/sweets', sweetRoutes);
app.use('/api/students', studentRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = app;