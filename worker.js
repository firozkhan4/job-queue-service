import "dotenv/config"
import { Worker } from "bullmq";
import { transporter } from "./config/mailer.js";
import { connection } from "./config/redis.js";

const worker = new Worker("email-queue", async (job) => {

  const { to, subject, body } = job.data;

  const mailOptions = {
    from: process.env.SMPT_EMAIL,
    to,
    subject,
    text: body,
  };

  const info = await transporter.sendMail(mailOptions);

  console.log("Email Sent:", info.messageId);
}, { connection, concurrency: 5, });

worker.on("completed", job => {
  console.log(`Completed ${job.id}`);
});

worker.on("failed", (job, err) => {
  console.error(`Failed ${job?.id}`, err);
});
