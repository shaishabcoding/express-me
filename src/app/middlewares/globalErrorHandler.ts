/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
import { ErrorRequestHandler } from 'express';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import handleValidationError from '../../errors/handleValidationError';
import handleZodError from '../../errors/handleZodError';
import { errorLogger } from '../../shared/logger';
import { IErrorMessage } from '../../types/errors.types';
import { StatusCodes } from 'http-status-codes';
import ServerError from '../../errors/ServerError';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  config.server.node_env === 'development'
    ? console.log('🚨 globalErrorHandler ~~ ', error)
    : errorLogger.error('🚨 globalErrorHandler ~~ ', error);

  let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  let message = 'Something went wrong';
  let errorMessages: IErrorMessage[] = [];

  if (error.name === 'ZodError') {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error.name === 'TokenExpiredError') {
    statusCode = StatusCodes.UNAUTHORIZED;
    message = 'Session Expired';
    errorMessages = error?.message
      ? [
          {
            path: '',
            message:
              'Your session has expired. Please log in again to continue.',
          },
        ]
      : [];
  } else if (error.name === 'JsonWebTokenError') {
    statusCode = StatusCodes.UNAUTHORIZED;
    message = 'Invalid Token';
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: 'Your token is invalid. Please log in again to continue.',
          },
        ]
      : [];
  } else if (error instanceof ApiError || error instanceof ServerError) {
    statusCode = error.statusCode;
    message = error.message;
    errorMessages = error.message
      ? [
          {
            path: '',
            message: error.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error.message;
    errorMessages = error.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.server.node_env !== 'production' ? error?.stack : undefined,
  });
};

export default globalErrorHandler;
