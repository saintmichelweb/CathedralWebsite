import express from "express";
import { Request, Response, NextFunction } from "express";
import cors from "cors";
import "dotenv/config";
import setupSwagger from "./setup/swaggerSetup";
import setupMiddlewares from "./setup/middlewaresSetup";
import setupRoutes from "./setup/routesSetup";
import setupServer from "./setup/serverSetup";
import { readEnv } from "./setup/readEnv";
import {
  tryInitializeDatabase,
  // tryInitializeS3,
} from "./setup/serviceInitializersSetup";
import ms from "ms";
import logger from "./services/logger";

const HOSTNAME: string = readEnv("HOST", "localhost") as string;
const PORT: number = readEnv("PORT", 3000, true) as number;
const allowedOrigins = ['http://localhost:5173', 'http://localhost:3550','http://localhost:3551'];


const app = express();
app.use(express.json());
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow the origin
    } else {
      callback(new Error('Not allowed by CORS')); // Reject the origin
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // If you're using cookies or authorization headers
}));

// Serve static files and set additional headers for /api/image
app.use('/api/image', (req, res, next) => {
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin'); // Allows loading images across origins
  next();
});
app.use('/api/image', express.static('upload/images'));

// Error handling middleware for CORS
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err.message === 'Not allowed by CORS') {
    res.status(403).json({ error: 'CORS policy does not allow access from this origin.' });
  } else {
    next(err);
  }
});



setupMiddlewares(app);
setupSwagger(app);
setupRoutes(app);

// check JWT_EXPIRES_IN is valid
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? "1d";
if (ms(JWT_EXPIRES_IN) === undefined) {
  logger.error(`JWT_EXPIRES_IN is invalid: ${JWT_EXPIRES_IN}`);
  process.exit(1);
}

setupServer(
  app, 
  HOSTNAME, 
  PORT, 
  // tryInitializeS3, 
  tryInitializeDatabase
)
