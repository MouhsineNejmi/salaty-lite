import express, { type Request, type Response } from 'express';
import cookieParser from 'cookie-parser';
import { errorMiddleware } from '@salaty/common';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send({ message: 'Welcome to Auth Service!' });
});

app.use(errorMiddleware);

const port = process.env.PORT || 4001;
const server = app.listen(port, () => {
  console.log(`Auth Service is running at http://localhost:${port}/api`);
});

server.on('error', (err) => {
  console.log('Server Error: ', err);
});
