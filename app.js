const express = require('express');
const redis = require('redis');

const app = express();

const port = process.env.PORT || 3000;                 // PORT from env
const redisHost = process.env.REDIS_HOST || 'localhost';
const redisPort = process.env.REDIS_PORT || 6379;

const client = redis.createClient({
  url: `redis://${redisHost}:${redisPort}`
});

client.connect().catch(console.error);

app.get('/', async (req, res) => {
  let visits = await client.incr('visits');
  res.send('Number of visits: ' + visits);
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

