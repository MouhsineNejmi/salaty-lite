import express, { Request, Response } from 'express';

const app = express();

app.get('/api', (req: Request, res: Response) => {
  res.send({ message: 'Welcome to Sallaty API Gateway' });
});

const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});

server.on('error', console.error);
