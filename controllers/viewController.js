const User = require('../models/User');
const Account = require('../models/Account');
const Movement = require('../models/Movement');
const AppError = require('../util/appError');
const catchAsync = require('../util/catchAsync');

//::::::::: Login :::::::::
exports.getLoginForm = catchAsync(async (req, res, next) => {
  res.status(200).render('login', {
    title: 'Log into your account',
  });
});

//::::::::: Index :::::::::
exports.getIndex = catchAsync(async (req, res) => {
  res.render('index');
});

exports.getOverview = catchAsync(async (req, res, next) => {
  //1. Get Account / Movements
  const user = await User.findOne({ where: { id: req.user.id } });

  const accounts = await user.getAccounts({ include: Movement });
  if (!accounts) {
    return next(new AppError("You don' have an account!", 404));
  }

  const account = accounts[0].dataValues;
  const movements = account.movements
    .filter(x => x.status == true)
    .map(x => x.dataValues);

  res.status(200).render('overview', {
    user,
    account,
    movements,
  });
});

// exports.postMovement = catchAsync(async (req, res, next) => {
//   //1. Get Account / Movements
//   const account = await Account.findOne({ where: { id: 1 } });

//   const newMovement = await account.createMovement({
//     type: 'deposit',
//     amount: 50.0,
//   });

//   getOverview();
// });
