import "dotenv/config"
import IORedis from "ioredis";

export const connection = new IORedis(process.env.REDIS_HOST, {
  maxRetriesPerRequest: null
});

connection.on("connect", () => {
  console.log("Redis Connected");
});
