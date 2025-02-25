import cors from 'cors';
import express from 'express';
import { StatusCodes } from 'http-status-codes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import router from './routes';
import { Morgan } from './shared/morgen';
import cookieParser from 'cookie-parser';
import ServerError from './errors/ServerError';
import serveResponse from './shared/serveResponse';
import config from './config';

const app = express();

app.use(Morgan.successHandler);
app.use(Morgan.errorHandler);

app.use(
  cors({
    origin: config.allowed_origins,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/v1', router);

app.use(express.static('uploads'));

app.get('/', (_req, res) => {
  serveResponse(res, {
    message: 'Hello World',
  });
});

app.use(() => {
  throw new ServerError(StatusCodes.NOT_FOUND, 'Route not found');
});

app.use(globalErrorHandler);

export default app;
