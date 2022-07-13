const Account = require('../models/Account');
const factory = require('./factory');

//METHODS
exports.createAccount = factory.createOne(Account);

exports.getAllAccounts = factory.getAll(Account);

exports.getAccountById = factory.getOne(Account);

exports.updateAccount = factory.updateOne(Account);

exports.deleteAccount = factory.deleteOne(Account);
