const User = require('../models/User');
const catchAsync = require('../util/catchAsync');
const AppError = require('../util/appError');

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

exports.createUser = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      data: newUser,
    },
  });
});

exports.getUserById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({ where: { id } });

  user.password = undefined;

  res.status(201).json({
    status: 'success',
    data: {
      data: user,
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({ where: { id } });

  if (!user) {
    return next(new AppError('Please provide a valid id', 400));
  }

  user.set(req.body);

  const newUser = await user.save();

  res.status(200).json({
    status: 'success',
    data: {
      data: newUser,
    },
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({ where: { id } });

  if (!user) {
    return next(new AppError('Please provide a valid id', 400));
  }

  await user.destroy();

  res.status(204).json({
    status: 'success',
  });
});
