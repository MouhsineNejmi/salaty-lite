import express, { type Request, type Response } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { rateLimit, ipKeyGenerator } from 'express-rate-limit';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import axios from 'axios';

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
app.set('trust proxy', 1);

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: (req: any) => (req.user ? 1000 : 100),
  message: { error: 'Too many requests, please try again later!' },
  standardHeaders: true,
  legacyHeaders: true,
  keyGenerator: (req, res) => {
    // Use API key (or some other identifier) for authenticated users
    if (typeof req.query.apiKey === 'string') {
      return req.query.apiKey;
    }

    // fallback to IP for unauthenticated users
    // return req.ip -> vulnerable
    return ipKeyGenerator(req.ip as string); // better
  },
});

app.use(limiter);

app.get('/api-gateway-health', (req: Request, res: Response) => {
  res.send({ message: 'Welcome to Sallaty API Gateway' });
});

app.use('/', createProxyMiddleware({ target: 'http://localhost:4001' }));

const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});

server.on('error', console.error);
