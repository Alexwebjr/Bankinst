const AppError = require('../util/appError');
const catchAsync = require('../util/catchAsync');

exports.createOne = Model =>
  catchAsync(async (req, res, next) => {
    const newDoc = await Model.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        data: newDoc,
      },
    });
  });

exports.getAll = Model =>
  catchAsync(async (req, res, next) => {
    let docs = await Model.findAll();

    res.status(200).json({
      status: 'success',
      results: docs.length,
      data: {
        data: docs,
      },
    });
  });

exports.getOne = Model =>
  catchAsync(async (req, res, next) => {
    const { id } = req.params;

    let doc = await Model.findOne({ where: { id } });

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.updateOne = Model =>
  catchAsync(async (req, res, next) => {
    const { id } = req.params;

    let doc = await Model.findOne({ where: { id } });

    if (!doc) {
      return next(new AppError('Please provide a valid id', 400));
    }

    doc.set(req.body);

    const newDoc = await doc.save();

    res.status(200).json({
      status: 'success',
      data: {
        data: newDoc,
      },
    });
  });

exports.deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const doc = await Model.findOne({ where: { id } });

    if (!doc) {
      return next(new AppError('Please provide a valid id', 400));
    }

    await doc.destroy();

    res.status(204).json({
      status: 'success',
    });
  });
