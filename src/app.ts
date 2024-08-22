import express from "express";
import dotenv from "dotenv";
import compression from "compression";
import helmet from "helmet";
import { configureCors } from "./config/cors.config";
import { errorHandler } from "./middleware/errorHandler.middleware";
import cookieParser from "cookie-parser";
import { rateLimit } from "express-rate-limit";

// required routes
import { UserRouter } from "./routes/user.route";
import { AuthRouter } from "./routes/auth.route";
import { BlogPostRouter } from "./routes/blogPost.route";

import { apiRequestLogger } from "./lib/utils/logger.utils";

const dotenvConfig = dotenv.config();
if (dotenvConfig.error) {
  console.error("Error loading .env file: ", dotenvConfig.error);
  process.exit(1); // Terminate the application if .env is not loaded
}

const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000, // one hours
  message:
    "We have received too many requests from this address. Please try again later.",
  legacyHeaders: false,
});

const app = express();

app.use(configureCors());

app.use(compression());

app.use(helmet());

// Allows for JWT's to be read
app.use(cookieParser());

app.use("/api", limiter);

// Allows req.body and req.query params to be accessed
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//----log all res and errors-----//
app.use(apiRequestLogger);

//-----API Routes-----//
app.use("/api/v1/user", UserRouter);
app.use("/api/v1/blog-post", BlogPostRouter);
app.use("/api/v1/auth", AuthRouter);

//-----middleware for handling errors-----//
app.use(errorHandler);

export { app };
