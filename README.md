# 🚀 Job Queue System with BullMQ + Redis

A scalable **background job processing system** built using **Node.js, Express, BullMQ, and Redis** to efficiently handle asynchronous tasks such as email notifications, report generation, and other long-running operations.

This project demonstrates production-oriented backend engineering practices by separating API request handling from background processing using a queue-based architecture.

---

## 📌 Overview

Modern applications should avoid executing heavy or time-consuming tasks directly inside API requests. This project implements a **Redis-backed queue system** that processes jobs asynchronously using dedicated workers.

Instead of blocking API responses, tasks are pushed into a queue and executed independently, improving:

- Performance
- Scalability
- Reliability
- Fault tolerance

---

## ✨ Features

- ✅ Asynchronous background job processing.
- ✅ Email job queue implementation.
- ✅ Retry mechanism with exponential backoff.
- ✅ Job prioritization support.
- ✅ Concurrency control for workers.
- ✅ Redis-based rate limiting.
- ✅ Swagger API documentation.
- ✅ Error handling and logging.
- ✅ Docker-ready setup.

---

## 🏗 Architecture

```

Client Request
↓
Express API Server
↓
BullMQ Queue (Redis)
↓
Worker Process
↓
Email Sender / Background Task

````

### Components

- **API Server**
  - Accepts HTTP requests.
  - Adds jobs to Redis queue.

- **Redis**
  - Message broker and persistent job storage.

- **Worker**
  - Consumes jobs and processes tasks asynchronously.

---

## 🧰 Tech Stack

- Node.js
- Express.js
- BullMQ
- Redis
- Swagger (API Documentation)
- Docker (Optional)
- Nodemailer (Email Service)

---

## ⚙️ Installation

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/job-queue-system.git
cd job-queue-system
````

---

### 2️⃣ Install Dependencies

```bash
npm install
```

---

### 3️⃣ Setup Environment Variables

Create `.env` file:

```env
PORT=3000

REDIS_HOST=localhost
REDIS_PORT=6379

SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_email@example.com
SMTP_PASS=password
```

---

### 4️⃣ Run Redis (Local Docker Option)

```bash
docker run -d -p 6379:6379 redis
```

---

## ▶️ Running the Application

### Start API Server

```bash
npm run dev
```

### Start Worker (Background Processor)

```bash
npm run worker
```

API and worker should run as separate processes.

---

## 📬 API Endpoint

### Add Email Job

```
POST /api/add-email-job
```

#### Request Body

```json
{
  "to": "example@gmail.com",
  "subject": "Hello",
  "body": "Test email from queue"
}
```

#### Response

```json
{
  "status": "ok",
  "jobId": "12"
}
```

---

## 🔁 Job Processing Features

* Automatic retries on failure.
* Exponential backoff strategy.
* Failed job tracking.
* Optional job cleanup after completion.

---

## 📖 Swagger Documentation

Access API documentation:

```
http://localhost:3000/
```

Test endpoints directly from Swagger UI.

---

## 🐳 Docker Support (Optional)

Example Docker run:

```bash
docker compose up --build
```

Useful for consistent development environments.

---

## 📂 Suggested Project Structure

```
src/
├── config/
│   └── redis.js
├── queues/
│   └── emailQueue.js
├── workers/
│   └── emailWorker.js
├── services/
│   └── emailService.js
├── routes/
│   └── emailRoutes.js
├── app.js
└── server.js
```

---

## 🧪 Use Cases

* Email notification systems.
* Background report generation.
* Queue-based API workloads.
* Rate limiting systems.
* Batch data processing.

---

## 🚀 Future Improvements

* Dashboard monitoring.
* Queue metrics tracking.
* Distributed worker scaling.
* Dead letter queue support.

---

## 🤝 Contributing

Contributions are welcome. Please open an issue or submit a pull request.

---

## 📄 License

MIT License.

---

## 👨‍💻 Author

Firoz Khan
