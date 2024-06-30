const AppError = require('../utils/AppError');

const handleDuplicateError = () => {
  return new AppError('Email already exists.', 400);
};
const handleValidationError = (error) => {
  const keys = Object.keys(error.errors);
  return new AppError(error.errors[keys[0]].message, 400);
};

const sendProdError = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
const sendDevError = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

module.exports = (err, req, res, next) => {
  err.status = err.status || 'error';
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === 'development') {
    sendDevError(err, res);
  }
  if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.name = err.name;
    error.message = err.message;

    if (error.name === 'ValidationError') {
      error = handleValidationError(error);
    }

    if (error.code === 11000) {
      error = handleDuplicateError();
    }

    sendProdError(error, res);
  }
};
