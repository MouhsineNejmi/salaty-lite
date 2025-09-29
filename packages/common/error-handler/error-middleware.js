"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const _1 = require("./");
const errorMiddleware = (err, req, res, next) => {
    if (err instanceof _1.AppError) {
        console.log(`Error ${req.method} ${req.url} - ${err.message}`);
        return res.status(err.statusCode).json({
            status: 'error',
            message: err.message,
            ...(err.details && { details: err.details }),
        });
    }
    console.log('Unhadled error: ', err);
    return res.status(500).json({
        error: 'Something went wrong, please try again!',
    });
};
exports.errorMiddleware = errorMiddleware;
//# sourceMappingURL=error-middleware.js.map