const { Model } = require('sequelize/types');
const User = require('../models/User');

//METHODS

exports.getAllUsers = async (req, res, next) => {
  const users = await User.findAll();

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      data: users,
    },
  });
};

exports.createUser = async (req, res, next) => {
  const newUser = await User.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      data: newUser,
    },
  });
};

exports.getUserById = async (req, res, next) => {};

exports.updateUser = (req, res, next) => {};

exports.deleteUser = (req, res, next) => {};
