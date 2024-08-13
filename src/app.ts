import express from "express";
import dotenv from "dotenv";
import compression from "compression";
import helmet from "helmet";
import { configureCors } from "./config/cors.config";
import { errorHandler } from "./middleware/errorHandler.middleware";

// required routes
import { UserRouter } from "./routes/user.route";
import { apiRequestLogger } from "./lib/utils/logger.utils";

const dotenvConfig = dotenv.config();
if (dotenvConfig.error) {
  console.error("Error loading .env file: ", dotenvConfig.error);
  process.exit(1); // Terminate the application if .env is not loaded
}

const app = express();

app.use(configureCors());

app.use(compression());

app.use(helmet());

// Allows req.body and req.query params to be accessed
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//----log all res and errors-----//
app.use(apiRequestLogger);

//-----API Routes-----//
app.use("/api/v1/user", UserRouter);

//-----middleware for handling errors-----//
app.use(errorHandler);

export { app };
