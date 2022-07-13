const User = require('../models/User');
const Account = require('../models/Account');
const catchAsync = require('../util/catchAsync');
const AppError = require('../util/appError');
const factory = require('./factory');

//METHODS
exports.createUser = factory.createOne(User);

exports.getAllUsers = factory.getAll(User);

exports.getUserById = factory.getOne(User);

exports.updateUser = factory.updateOne(User);

exports.deleteUser = factory.deleteOne(User);

//OTHERS
exports.getUserAccounts = catchAsync(async (req, res, next) => {
  let { id } = req.params;

  const user = await User.findOne({ where: { id } });

  if (!user) {
    return next(new AppError('Please provide a valid id', 400));
  }

  const accounts = await user.getAccounts();

  res.status(200).json({
    status: 'success',
    results: accounts.length,
    data: {
      data: accounts,
    },
  });
});

exports.getUserAccountById = catchAsync(async (req, res, next) => {
  let { id, accountId } = req.params;

  const user = await User.findOne({ where: { id } });

  if (!user) {
    return next(new AppError('Please provide a valid id', 400));
  }

  const account = await user.getAccounts({ where: { id: accountId } });

  if (!account) {
    return next(new AppError('There is not an Account with this id', 400));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: account,
    },
  });
});
