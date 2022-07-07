const express = require('express');
const movementController = require('../controllers/movementController');
const authController = require('../controllers/authController');
const router = express.Router();

//-------ROUTE--------

router
  .route('/')
  .get(movementController.getAllMovements)
  .post(movementController.createMovement);

router
  .route('/:id')
  .get(movementController.getMovementById)
  .patch(movementController.updateMovement)
  .delete(movementController.deleteMovement);
