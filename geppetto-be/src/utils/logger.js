import winston from 'winston';

const { combine, timestamp, printf, colorize, json } = winston.format;

// Custom format for local development console
const consoleFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} ${level}: ${stack || message}`;
});

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      winston.format.errors({ stack: true }), // Capture stack traces
      process.env.NODE_ENV === 'production' ? json() : combine(colorize(), consoleFormat)
  ),
  transports: [
    new winston.transports.Console(),
    // Optional: Save errors to a file inside the Docker container
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

export default logger;
