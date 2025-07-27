// backend/middleware/auth.js
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const auth = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ 
      error: 'Authentication required',
      details: 'No valid authorization token provided'
    });
  }

  try {
    const token = authHeader.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.scope('withPassword').findByPk(decoded.id);

    if (!user?.isActive) {
      throw new Error('User not found or account inactive');
    }

    req.user = user;
    req.token = token;
    user.lastLogin = new Date();
    await user.save();
    next();
  } catch (error) {
    const status = error.name === 'TokenExpiredError' ? 403 : 401;
    const message = error.name === 'TokenExpiredError' 
      ? 'Session expired. Please login again'
      : error.name === 'JsonWebTokenError'
        ? 'Invalid token'
        : 'Please authenticate';

    res.status(status).json({ 
      error: message,
      details: error.message 
    });
  }
};

const adminAuth = async (req, res, next) => {
  try {
    await auth(req, res, next);
    if (req.user.role !== 'admin') {
      throw new Error('Admin privileges required');
    }
    next();
  } catch (error) {
    res.status(403).json({ 
      error: 'Access denied',
      details: error.message 
    });
  }
};

const roleAuth = (roles = []) => {
  return async (req, res, next) => {
    try {
      await auth(req, res, () => {});
      if (roles.length && !roles.includes(req.user.role)) {
        throw new Error(`Required roles: ${roles.join(', ')}`);
      }
      next();
    } catch (error) {
      res.status(403).json({ 
        error: 'Access denied',
        details: error.message 
      });
    }
  };
};

module.exports = { auth, adminAuth, roleAuth };