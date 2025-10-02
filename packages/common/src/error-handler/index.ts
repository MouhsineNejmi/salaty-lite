export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly details?: any;

  constructor(
    message: string,
    statusCode: number,
    isOperational = true,
    details?: any
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.details = details;
    Error.captureStackTrace(this);
  }
}

// Not Found Error
export class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(message, 404);
  }
}

// Validation error (use for zod/react-hook-form validation errors)
export class ValidationError extends AppError {
  constructor(message = 'Invalid request data', details?: any) {
    super(message, 400, true, details);
  }
}

// Bad Request Error
export class BadRequestError extends AppError {
  constructor(message = 'Bad request') {
    super(message, 400);
  }
}

// Conflict Error
export class ConflictError extends AppError {
  constructor(message = 'Resource already exists') {
    super(message, 409);
  }
}

// Authentication Error
export class AuthError extends AppError {
  constructor(message = 'Unauthorized') {
    super(message, 401);
  }
}

// Forbidden Error
export class ForbiddenError extends AppError {
  constructor(message = 'Forbidden access') {
    super(message, 403);
  }
}

// Rate Limit Error (If user exceeds API limits)
export class RateLimitError extends AppError {
  constructor(message = 'Too many requests, please try again!') {
    super(message, 429);
  }
}

// Database Error (for Mongoose/Postgres Errors)
export class DatabaseError extends AppError {
  constructor(message = 'Database error', details?: any) {
    super(message, 500, true, details);
  }
}

// Proxy Error
export class ServiceUnavailableError extends AppError {
  constructor(message = 'Service unavailable', details?: any) {
    super(message, 503, true, details);
  }
}
