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
exports.getOverview = catchAsync(async (req, res, next) => {
  //1. Get Account / Movements
  const user = await User.findOne({ where: { id: 3 } });

  const accounts = await user.getAccounts({ include: Movement });
  const account = accounts[0].dataValues;
  const movements = account.movements
    .filter(x => x.status == true)
    .map(x => x.dataValues);

  console.log(user);

  if (!accounts) {
    return next(new AppError("You don' have an account!", 404));
  }

  res.status(200).render('overview', {
    user,
    account,
    movements,
  });
});
