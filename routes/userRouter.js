const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const router = express.Router();

//-------ROUTE--------

router.post('/login', authController.login);
router.get('/logout', authController.logout);

router
  .route('/')
  .get(authController.protect, userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(authController.protect, userController.getUserById)
  .patch(authController.protect, userController.updateUser)
  .delete(authController.protect, userController.deleteUser);

//Accounts
router
  .route('/:id/accounts/')
  .get(authController.protect, userController.getUserAccounts);

router
  .route('/:id/accounts/:accountId')
  .get(authController.protect, userController.getUserAccountById);
//   .patch(authController.protect, userController.updateUser)
//   .delete(authController.protect, userController.deleteUser);

module.exports = router;
