import express, { Request, Response } from 'express';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 4001;

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send({ message: 'Welcome to Auth Service' });
});

app.listen(port, () => {
  console.log(`Listening http://${host}:${port}/api`);
});
