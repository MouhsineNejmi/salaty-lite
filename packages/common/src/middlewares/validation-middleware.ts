import { Request, Response, NextFunction } from 'express';
import { ZodObject } from 'zod';
import { ValidationError } from '../error-handler';

export const validate =
  (schema: ZodObject) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      // Pass all error details to ValidationError
      const details = result.error.issues.map((e) => ({
        path: e.path,
        message: e.message,
      }));
      return next(new ValidationError('Invalid request data', details));
    }

    // Replace request body with the validated and parsed data
    req.body = result.data;
    next();
  };
