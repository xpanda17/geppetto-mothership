import express from 'express';
import sequelize from '#config/db';
import logger from '#utils/logger';

import userRoutesV1 from '#routes/v1/user';

const app = express();
app.use(express.json());

// Global Error Handler
app.use((err, req, res, next) => {
  logger.error(`Unexpected error occurs: ${JSON.stringify(err.stack)}`);

  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
  });
});

// Routes
app.use('/v1/users', userRoutesV1);

app.get('/healthz', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

const PORT = process.env.PORT || 8000;

sequelize.sync().then(() => {
  app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
});
