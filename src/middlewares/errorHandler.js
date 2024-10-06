import mongoose, { MongooseError } from "mongoose";
import { AppError } from "../utils/index.js";
const isDev = process.env.NODE_ENV === "development";

const errorHandler = (err, req, res, next) => {
  let error = err;

  // If Not Thrown by AppError - Not a custom Error instance
  const statusCode =
    error.statusCode || error instanceof mongoose.mongo.MongoError ? 400 : 500;

  if (!(error instanceof AppError)) {
    // Default Error
    let message = error.message || "Something went wrong!";
    error = new AppError(statusCode, message, error?.errors);
  }
  // Mongoose Duplicate Fields Error - 11000
  if (err.code === 11000) {
    const message = `${Object.keys(err.keyValue)}: ${Object.values(
      err.keyValue
    )} is already exists`;
    error = new AppError(statusCode, message, error?.errors || [], err.stack);
  }

  const response = {
    ...error,
    message: error.message,
    ...(isDev ? { stack: error.stack } : {}),
  };
  return res.status(error.statusCode).json(response);
};

export { errorHandler };
