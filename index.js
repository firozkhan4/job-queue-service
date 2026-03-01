import express from 'express'
import "dotenv/config"
import { emailQueue } from './queues/email.queue.js';
import { serve, setup } from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

const app = express()
const PORT = process.env.POR ?? 3000;

const options = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'Job Queue Service', version: '1.0.0' },
  },
  apis: ['./index.js'],
}

const swaggerSpec = swaggerJSDoc(options)
app.use(express.json())
app.use("/", serve, setup(swaggerSpec))


/**
 * @swagger
 * /api/add-email-job:
 *   post:
 *     summary: Add Email Job in Queue
 *     description: Add email job into Redis queue for background processing
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - to
 *               - subject
 *               - body
 *             properties:
 *               to:
 *                 type: string
 *               subject:
 *                 type: string
 *               body:
 *                 type: string
 *     responses:
 *       200:
 *         description: Job Added Successfully
 */
app.post("/api/add-email-job", async (req, res) => {
  const { to, subject, body } = req.body;

  try {

    // Validation (VERY IMPORTANT)
    if (!to || !subject || !body) {
      return res.status(200).json({
        status: "error",
        message: "Missing required fields"
      });
    }

    const job = await emailQueue.add(
      "send-email", // job name
      { to, subject, body },
      {
        attempts: 3, // retry automatically
        backoff: {
          type: "exponential",
          delay: 5000
        },
        removeOnComplete: true,
        removeOnFail: false
      }
    );

    return res.status(200).json({
      status: "ok",
      jobId: job.id
    });

  } catch (error) {
    console.error(error);
    return res.status(200).json({
      status: "error",
      message: error.message
    });

  }
});

app.listen(PORT, () => console.log(`Server is running on PORT:${PORT}`))
