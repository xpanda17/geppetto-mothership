import _ from 'lodash';
import express from 'express';
import { z } from 'zod';
import sequelize from '#config/db';
import logger from '#utils/logger';

import userRoutesV1 from '#routes/v1/user';

const app = express();
app.use(express.json());

// Routes
app.use('/v1/users', userRoutesV1);

app.get('/healthz', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  let statusCode;
  let message;

  if (err instanceof z.ZodError) {
    statusCode = 422;
    message = 'Validation Error';
  } else {
    statusCode = err.status;
    message = err.message || 'Internal Server Error';
  }

  if (_.isNil(statusCode)) {
    statusCode = 500;
    logger.error(`Unexpected error occurs: ${JSON.stringify(err.stack)}`);
  }

  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: message,
    // Only show stack trace in development
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

const PORT = process.env.PORT || 8000;

sequelize.sync().then(() => {
  app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
});
