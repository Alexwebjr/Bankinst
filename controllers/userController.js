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

exports.getUserById = (req, res, next) => {};

exports.createUser = (req, res, next) => {};

exports.updateUser = (req, res, next) => {};

exports.deleteUser = (req, res, next) => {};
