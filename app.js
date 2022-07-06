const path = require('path');
const express = require('express');
require('dotenv').config();

const sequelize = require('./util/database');
const User = require('./models/User');
const Account = require('./models/Account');
const Movement = require('./models/Movement');
const app = express();

//--------------------
//Static files
app.use(express.static(path.join(__dirname, 'public'))); //static HTML

//midd
app.get('/', async (req, res) => {
  res.sendFile('index.html');
});

//Sync DB
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
