const express = require('express');
const accountController = require('../controllers/accountController');
const authController = require('../controllers/authController');
const router = express.Router();

//-------ROUTE--------

router
  .route('/')
  .get(accountController.getAllAccounts)
  .post(authController.protect, accountController.createAccount);

router
  .route('/:id')
  .get(authController.protect, accountController.getAccountById)
  .patch(authController.protect, accountController.updateAccount)
  .delete(authController.protect, accountController.deleteAccount);

module.exports = router;
