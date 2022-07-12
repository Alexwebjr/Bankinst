const express = require('express');
const accountController = require('../controllers/accountController');
const authController = require('../controllers/authController');
const router = express.Router();

//-------ROUTE--------

router
  .route('/')
  .get(accountController.getAllAccounts)
  .post(accountController.createAccount);

router
  .route('/:id')
  .get(accountController.getAccountById)
  .patch(accountController.updateAccount)
  .delete(accountController.deleteAccount);

module.exports = router;
