import { createClient } from 'redis';

const redisClient = createClient({
  url: `redis://${process.env.REDIS_URL}:${process.env.CONTAINER_REDIS_PORT}`
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

await redisClient.connect();

export default redisClient;
