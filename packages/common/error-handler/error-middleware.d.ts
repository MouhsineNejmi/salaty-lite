import { Request, Response, NextFunction } from 'express';
import { AppError } from './';
export declare const errorMiddleware: (err: AppError, req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>>;
//# sourceMappingURL=error-middleware.d.ts.map