import { RedisClientType, createClient } from "redis";

export const redis: RedisClientType = createClient({
  url: "redis://127.0.0.1:6379",
});

// redis.on("error", (err) => console.log("Redis Client Error", err));

const setupCache = async () => {
  if (!redis.isReady) {
    await redis.connect();
  }
};

setupCache();
