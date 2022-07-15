const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');
const router = express.Router();

//-------ROUTE--------

router.route('/').get(viewController.getIndex);

router.route('/login').get(viewController.getLoginForm);

router
  .route('/overview')
  .get(authController.protect, viewController.getOverview);

// router
//   .route('/:id')
//   .get(viewController.getViewById)
//   .patch(viewController.updateView)
//   .delete(viewController.deleteView);

module.exports = router;
