// import { Ratelimit } from "@upstash/ratelimit";
// import { Redis } from "@upstash/redis";

// // Create a new ratelimiter, that allows 3 requests per 1 minute
// export const registerRateLimit = new Ratelimit({
//   redis: Redis.fromEnv(),
//   limiter: Ratelimit.slidingWindow(60, "1 m"), 
//   analytics: true,
//   prefix: "@upstash/ratelimit",
// });
