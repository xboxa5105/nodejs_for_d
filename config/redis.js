import dotenv from 'dotenv'
dotenv.config()
import redis from 'redis'
import logger from './winston';

const client = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST)


client.on('error', function (err) {
  logger.error(`Redis error : ${err}`);
});

export default client