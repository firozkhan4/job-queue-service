import { createTransport } from "nodemailer";
import "dotenv/config"

export const transporter = createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMPT_EMAIL,
    pass: process.env.SMPT_EMAIL_PASSWORD,
  },
});

transporter.verify().then(() => {
  console.log("Mailer Ready");
});
