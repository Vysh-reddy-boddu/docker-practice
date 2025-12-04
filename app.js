const express = require('express');
const redis = require('redis');

const app = express();
const client = redis.createClient({ url: "redis://redis:6379" });

client.connect();

app.get('/', async (req, res) => {
  let visits = await client.incr('visits');
  res.send('Number of visits: ' + visits);
});

app.listen(3000, () => {
  console.log("App running on port 3000");
});
