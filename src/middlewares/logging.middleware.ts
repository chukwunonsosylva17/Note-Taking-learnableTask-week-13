import { Request, Response, NextFunction } from 'express';

interface RequestLog {
  method: string;
  path: string;
  timestamp: Date;
}

export const requestLogger = (req: Request, _res: Response, next: NextFunction) => {
  console.log(`API Request: [${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
};

export const loggerMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  console.log(`[${Date.now()}] ${req.method} ${req.originalUrl}`);
  next();
};
