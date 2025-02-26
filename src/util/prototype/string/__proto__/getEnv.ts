/* eslint-disable no-unused-vars */
import { StatusCodes } from 'http-status-codes';
import ServerError from '../../../../errors/ServerError';

declare global {
  interface String {
    getEnv<T>(defaultValue?: T): T;
  }
}

String.prototype.getEnv = function <T>(defaultValue?: T): T {
  const key = this.toSnakeCase().toUpperCase();
  const value = process.env[key];

  if (value === undefined) {
    if (defaultValue === undefined)
      throw new ServerError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        `Environment variable ${key} is required`,
      );

    return defaultValue;
  }

  if (typeof defaultValue === 'boolean')
    return (value.toLowerCase() === 'true') as T;

  if (typeof defaultValue === 'number') {
    const num = Number(value);
    if (isNaN(num))
      throw new ServerError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        `Environment variable ${key} must be a valid number`,
      );

    return num as T;
  }

  if (Array.isArray(defaultValue))
    return value.split(',').map(item => item.trim()) as T;

  return value as T;
};

export {};
