export class BaseError extends Error {
    statusCode: number;
    status: string;
    isOperational: boolean;
  
    constructor(message: string, statusCode: number) {
      super(message);
      this.statusCode = statusCode;
      this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
      this.isOperational = true;
  
      Error.captureStackTrace(this, this.constructor);
    }
}
    export class NotFoundError extends BaseError {
        constructor(message: string = 'Resource not found') {
          super(message, 404);
        }
      }
      
    export class ValidationError extends BaseError {
        constructor(message: string = 'Bad request') {
          super(message, 400);
        }
    }