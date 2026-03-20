import express, { Application, Request, Response } from 'express';
import 'dotenv/config';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import caseRoutes from './routes/case.route';

// Routes
import testRoute from './routes/test.route';

// Middlewares
const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(morgan('dev'));
app.use(helmet());
app.use(cookieParser());
app.use('/api/cases', caseRoutes);

app.use('/api/test', testRoute);

app.get('/api', (req: Request, res: Response) => {
  return res.json({ message: 'API Available' });
});

// 404 Error handling middleware
app.use((req: Request, res: Response) => {
  res.status(404).json({
    message: `Path is incorrect -[${req.method}] ${req.originalUrl}`,
  });
});

// Global Error handling middleware (Must be last)
app.use((err: any, req: Request, res: Response, next: any) => {
  console.log('Error at: ', err.stack);

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

export default app;
