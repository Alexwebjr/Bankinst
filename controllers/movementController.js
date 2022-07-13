const Movement = require('../models/Movement');
const factory = require('./factory');

//METHODS
exports.createMovement = factory.createOne(Movement);

exports.getAllMovements = factory.getAll(Movement);

exports.getMovementById = factory.getOne(Movement);

exports.updateMovement = factory.updateOne(Movement);

exports.deleteMovement = factory.deleteOne(Movement);
