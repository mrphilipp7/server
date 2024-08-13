import { Request, Response, NextFunction } from "express";
import { createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import fs from "fs";
import path from "path";

const { combine, label, timestamp, printf } = format;

const loggingDir = "logs";
const httpLoggingDir = path.join(loggingDir, "http");
const errorLoggingDir = path.join(loggingDir, "errors");

if (!fs.existsSync(loggingDir)) fs.mkdirSync(loggingDir);
if (!fs.existsSync(httpLoggingDir)) fs.mkdirSync(httpLoggingDir);
if (!fs.existsSync(errorLoggingDir)) fs.mkdirSync(errorLoggingDir);

const timestampFormat = "MMM-DD-YYYY HH:mm:ss";

const appLogFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  format: combine(
    label({ label: "server" }),
    timestamp({ format: timestampFormat }),
    appLogFormat
  ),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: "logs/error-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      level: "error",
      maxFiles: "14d",
      dirname: errorLoggingDir,
    }),
    new DailyRotateFile({
      filename: "logs/http-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      level: "http",
      maxFiles: "14d",
      dirname: httpLoggingDir,
    }),
  ],
});

const apiRequestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  // Log details about incoming request
  logger.http(`Request received - Method: ${req.method}, URL: ${req.url}`);

  // Capture the end of the request/response lifecycle
  res.on("finish", () => {
    const duration = Date.now() - start;

    // Log details about response
    logger.http(
      `Response sent - Status: ${res.statusCode}, Duration: ${duration}ms`
    );
  });

  next();
};

export { logger, apiRequestLogger };
