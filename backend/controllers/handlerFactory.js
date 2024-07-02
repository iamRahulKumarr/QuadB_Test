const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    return res.status(201).json({
      status: 'success',
      data: doc,
    });
  });

exports.getAll = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.find(req.query).populate(popOptions);

    return res.status(200).json({
      status: 'success',
      data: doc,
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findById(req.params.id).populate(popOptions);

    if (!doc) {
      return next(new AppError('Cant find document with that ID.', 404));
    }

    return res.status(200).json({
      status: 'success',
      data: doc,
    });
  });

exports.updateOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate(popOptions);

    if (!doc) {
      return next(new AppError('Cant find document with that ID.', 404));
    }

    return res.status(200).json({
      status: 'success',
      data: doc,
    });
  });

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('Cant find document with that ID.', 404));
    }
    return res.status(204).json({
      status: 'success',
      data: null,
    });
  });
