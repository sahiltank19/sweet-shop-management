'use strict';
const path = require('path');
const fs = require('fs');
const { User, Student, sequelize } = require('../models');

const registerStudent = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const {
      firstName,
      lastName,
      contactNumber,
      email,
      password,
      rollNumber,
      course,
      track
    } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (await User.findOne({ where: { email } })) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    const user = await User.create({
      username: email.split('@')[0],
      email,
      password,
      first_name: firstName,
      last_name: lastName,
      contact_number: contactNumber,
      role: 'user'
    }, { transaction: t });

    await Student.create({
      userId: user.id,
      roll_number: rollNumber,
      course,
      track: course === 'MSc.CS' ? track : null
    }, { transaction: t });

    await t.commit();
    return res.status(201).json({ message: 'Registered successfully' });
  } catch (error) {
    await t.rollback();
    console.error('Student registration failed:', error);
    return res.status(500).json({ error: 'Registration failed' });
  }
};

const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
      include: [{ model: Student, as: 'student' }]
    });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const student = user.student || {};
    const response = {
      id: user.id,
      email: user.email,
      firstName: user.first_name || '',
      lastName: user.last_name || '',
      contactNumber: user.contact_number || '',
      role: user.role,
      course: student.course || '',
      track: student.track || '',
      roll_number: student.roll_number || '',
      tenth_percentage: student.tenth_percentage,
      tenth_year: student.tenth_year,
      tenth_board: student.tenth_board,
      twelfth_percentage: student.twelfth_percentage,
      twelfth_year: student.twelfth_year,
      twelfth_board: student.twelfth_board,
      ug_degree: student.ug_degree,
      ug_branch: student.ug_branch,
      ug_percentage: student.ug_percentage,
      ug_past_backlogs: student.ug_past_backlogs,
      ug_active_backlogs: student.ug_active_backlogs,
      ug_year: student.ug_year,
      ug_college: student.ug_college,
      ug_university: student.ug_university,
      ug_city: student.ug_city,
      pg_degree: student.pg_degree,
      pg_branch: student.pg_branch,
      pg_percentage: student.pg_percentage,
      pg_year: student.pg_year,
      pg_college: student.pg_college,
      pg_university: student.pg_university,
      pg_city: student.pg_city,
      resume_path: student.resume_path || ''
    };

    return res.json(response);
  } catch (error) {
    console.error('Fetch profile failed:', error);
    return res.status(500).json({ error: 'Unable to fetch profile' });
  }
};

const updateProfile = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const userId = req.user.id;
    const {
      firstName,
      lastName,
      contactNumber,
      roll_number,
      course,
      track,
      tenth_percentage,
      tenth_year,
      tenth_board,
      twelfth_percentage,
      twelfth_year,
      twelfth_board,
      ug_degree,
      ug_branch,
      ug_percentage,
      ug_past_backlogs,
      ug_active_backlogs,
      ug_year,
      ug_college,
      ug_university,
      ug_city,
      pg_degree,
      pg_branch,
      pg_percentage,
      pg_year,
      pg_college,
      pg_university,
      pg_city
    } = req.body;

    const user = await User.findByPk(userId, { transaction: t });
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.first_name = firstName ?? user.first_name;
    user.last_name = lastName ?? user.last_name;
    user.contact_number = contactNumber ?? user.contact_number;
    await user.save({ transaction: t });

    const student = await Student.findOne({ where: { userId }, transaction: t });
    if (!student) {
      await Student.create({ userId }, { transaction: t });
    }
    const target = await Student.findOne({ where: { userId }, transaction: t });
    Object.assign(target, {
      roll_number,
      course,
      track: course === 'MSc.CS' ? track : null,
      tenth_percentage,
      tenth_year,
      tenth_board,
      twelfth_percentage,
      twelfth_year,
      twelfth_board,
      ug_degree,
      ug_branch,
      ug_percentage,
      ug_past_backlogs,
      ug_active_backlogs,
      ug_year,
      ug_college,
      ug_university,
      ug_city,
      pg_degree,
      pg_branch,
      pg_percentage,
      pg_year,
      pg_college,
      pg_university,
      pg_city
    });

    if (req.file) {
      target.resume_path = `/uploads/${req.file.filename}`;
    }
    await target.save({ transaction: t });

    await t.commit();
    return res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    await t.rollback();
    console.error('Update profile failed:', error);
    return res.status(500).json({ error: 'Profile update failed' });
  }
};

module.exports = { registerStudent, getProfile, updateProfile };

