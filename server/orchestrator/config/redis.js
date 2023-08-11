require("dotenv").config();
const Redis = require("ioredis");
const redis = new Redis({
  port: 18664, // Redis port
  host: "redis-18664.c1.ap-southeast-1-1.ec2.cloud.redislabs.com", // Redis host
  username: "default", // needs Redis >= 6
  password: process.env.password,
  db: 0, // Defaults to 0
});

module.exports = redis;
