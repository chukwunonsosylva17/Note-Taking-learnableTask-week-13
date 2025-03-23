import dotenv from "dotenv";
import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet"
import { requestLogger } from './middlewares/logging.middleware';
import userRouter from './routes/auth.route'
import noteRouter from "./routes/note.route";
import indexRouter from './routes/index.route';
import categoriesRouter from './routes/category.route';
import { NotFoundError } from "./utils/errorHandler";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { loggerMiddleware } from "./middlewares/logging.middleware";


dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(requestLogger);
app.use(loggerMiddleware);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/', indexRouter);
app.use("/api/notes", noteRouter);
app.use('/api/categories', categoriesRouter)
app.use("/api/users", userRouter);


// Global Route Error Handling 
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError(`Cannot find ${req.originalUrl} on this server`));
});

app.use((
  err: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  console.error(`[${new Date().toISOString()}] Error: ${err.message}`);

  const statusCode = err instanceof NotFoundError ? 404 :
    err.name === 'ValidationError' ? 400 :
      500;

  res.status(statusCode).json({
    status: 'error',
    message: err.message,
    ...(process.env.NODE_ENV === 'development' && {
      stack: err.stack,
      errorType: err.name
    })
  });
});


app.use(errorHandler as (err: Error, req: Request, res: Response, next: NextFunction) => void);


export default app;