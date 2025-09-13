'use strict';

const path = require('path');
const { User, Student } = require('../models');

const registerStudent = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      contactNumber,
      rollNumber,
      course,
      track
    } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    const user = await User.create({
      username: email.split('@')[0],
      email,
      password,
      firstName,
      lastName,
      contactNumber
    });

    const student = await Student.create({
      userId: user.id,
      rollNumber,
      course,
      track
    });

    const token = require('jsonwebtoken').sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    return res.status(201).json({
      user: user.toJSON(),
      student,
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ error: 'Registration failed' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const fields = {
      rollNumber: req.body.rollNumber,
      course: req.body.course,
      track: req.body.track,
      tenthPercentage: req.body.tenthPercentage,
      tenthYear: req.body.tenthYear,
      tenthBoard: req.body.tenthBoard,
      twelfthPercentage: req.body.twelfthPercentage,
      twelfthYear: req.body.twelfthYear,
      twelfthBoard: req.body.twelfthBoard,
      ugDegree: req.body.ugDegree,
      ugBranch: req.body.ugBranch,
      ugPercentage: req.body.ugPercentage,
      ugPastBacklogs: req.body.ugPastBacklogs,
      ugActiveBacklogs: req.body.ugActiveBacklogs,
      ugYear: req.body.ugYear,
      ugCollege: req.body.ugCollege,
      ugUniversity: req.body.ugUniversity,
      ugCity: req.body.ugCity,
      pgDegree: req.body.pgDegree,
      pgBranch: req.body.pgBranch,
      pgPercentage: req.body.pgPercentage,
      pgYear: req.body.pgYear,
      pgCollege: req.body.pgCollege,
      pgUniversity: req.body.pgUniversity,
      pgCity: req.body.pgCity
    };

    Object.keys(fields).forEach((k) => fields[k] === undefined && delete fields[k]);

    if (req.file) {
      fields.resumePath = path.join('/uploads/resumes', req.file.filename);
    }

    const [student] = await Student.findOrCreate({
      where: { userId },
      defaults: { userId }
    });

    await student.update(fields);

    const { firstName, lastName, contactNumber } = req.body;
    const user = await User.findByPk(userId);
    if (firstName !== undefined) user.firstName = firstName;
    if (lastName !== undefined) user.lastName = lastName;
    if (contactNumber !== undefined) user.contactNumber = contactNumber;
    await user.save();

    return res.json({ user: user.toJSON(), student });
  } catch (error) {
    console.error('Update profile error:', error);
    return res.status(500).json({ error: 'Profile update failed' });
  }
};

const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findByPk(userId, { attributes: { exclude: ['password'] } });
    const student = await Student.findOne({ where: { userId } });

    return res.json({ user, student });
  } catch (error) {
    console.error('Fetch profile error:', error);
    return res.status(500).json({ error: 'Failed to fetch profile' });
  }
};

module.exports = { registerStudent, updateProfile, getProfile };