const path = require('path');
const express = require('express');
require('dotenv').config();

const sequelize = require('./util/database');
const ejs = require('ejs');
const cookieParser = require('cookie-parser');

const User = require('./models/User');
const Account = require('./models/Account');
const Movement = require('./models/Movement');
const userRouter = require('./routes/userRouter');
const accountRouter = require('./routes/accountRouter');
const movementRouter = require('./routes/movementRouter');
const viewRouter = require('./routes/viewRouter');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

//::::::====== STATIC ======::::::
app.use(express.static(path.join(__dirname, 'public'))); //static HTML

//::::::====== VIEWS ======::::::
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//::::::====== PARSER ======::::::
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

//::::::====== ROUTES ======::::::
app.use('/api/v1/users', userRouter);
app.use('/api/v1/accounts', accountRouter);
app.use('/api/v1/movements', movementRouter);
app.use('/', viewRouter);

// app.get('/', async (req, res) => {
//   res.render('login');
// });

//Error Route
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

//Error Handler
app.use(globalErrorHandler);

//::::::====== DB ======::::::
//Relations
User.hasMany(Account);
Account.belongsTo(User, {
  foreignKey: {
    allowNull: false,
  },
});
//----
Account.hasMany(Movement);
Movement.belongsTo(Account, {
  foreignKey: {
    allowNull: false,
  },
});
//Sync
sequelize
  .sync()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`App runing in http://localhost:${process.env.PORT}`);
    });
  })
  .catch(err => {
    console.log(err);
  });
//sequelize.sync({ force: true });
