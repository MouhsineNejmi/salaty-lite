import dotenv from 'dotenv';
dotenv.config();

import express, { type Request, type Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import config from './config';
import { limiter } from './middlewares/rate-limiter.middleware';
import logger from './config/logger';
import { proxyServices } from './config/services';

const app = express();

app.use(
  cors({
    origin: ['http://localhost:3000'],
    allowedHeaders: ['Authorization', 'Content-Type'],
    credentials: true,
  })
);
app.use(morgan('dev'));
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(cookieParser());
app.use(limiter);
app.set('trust proxy', 1);

app.get('/health', (req: Request, res: Response) => {
  res.send({ message: 'Welcome to Sallaty API Gateway' });
});

proxyServices(app);

const server = app.listen(config.port, () => {
  logger.info(`${config.service_name} running on port ${config.port}`);
});

server.on('error', console.error);
