const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const User = require('../models/User');
const AppError = require('../util/appError');
const catchAsync = require('../util/catchAsync');
//-----------------------------------------------
//HELPERS
const signToken = id =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user.id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt_Bankinst', token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};
//METHODS
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //1) Check if exist
  if (!email || !password) {
    return next(new AppError('Please provide email and pin', 400));
  }
  //2) Password if correct?
  const user = await User.findOne({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  //3) If it's ok, send token to client
  createSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  //1) Getting token and check
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt_Bankinst) {
    token = req.cookies.jwt_Bankinst;
  }

  if (!token) {
    return next(
      new AppError('Your are not logged in! Please log in to get access.', 401)
    );
  }

  //2) Verification token
  //*Use promisify to use promises as an async func
  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //3) Check if user still exists
  const currentUser = await User.findOne({ where: { id: decode.id } });

  if (!currentUser) {
    return next(
      new AppError(
        'The token belonging to this user does no longer exist.',
        401
      )
    );
  }

  //GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});

exports.logout = catchAsync(async (req, res, next) => {
  res.cookie('jwt_Bankinst', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    status: 'success',
  });
});
