import { Queue } from "bullmq";
import { connection } from "../config/redis.js";

export const emailQueue = new Queue("email-queue", {
  connection,
  defaultJobOptions: {
    attempts: 5,
    backoff: {
      type: "exponential",
      delay: 5000,
    },
    removeOnComplete: true,
    removeOnFail: false,
  },
});
