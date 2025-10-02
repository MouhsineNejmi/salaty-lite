import rateLimit, { ipKeyGenerator } from 'express-rate-limit';
import config from '../config';

export const limiter = rateLimit({
  skip: (req, res) => {
    return config.node_env !== 'production';
  },
  windowMs: config.rate_limit_window * 60 * 1000,
  limit: (req: any) => (req.user ? 1000 : config.rate_limit_max_requests),
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
