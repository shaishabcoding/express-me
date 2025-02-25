import { StatusCodes } from 'http-status-codes';
import ServerError from '../../errors/ServerError';

export default function getEnv<T>(key: string, defaultValue: unknown = '') {
  const envKey = key.toSnakeCase().toUpperCase();
  const value = process.env[envKey];

  if (!value && !defaultValue)
    throw new ServerError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      `Environment variable ${envKey} is required`,
    );

  if (Array.isArray(defaultValue))
    return (value ? value.split(',') : defaultValue) as T[];

  if (typeof defaultValue === 'number') return value ? +value : defaultValue;

  return value ?? defaultValue;
}
