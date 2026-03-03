import "dotenv/config"
import { connection } from "../config/redis.js"

export const rateLimit = async (req, res, next) => {

  try {
    const MAX_RATELIMIT = Number(process.env.MAX_RATELIMIT) ?? 100
    const key = "rateLimit:jqs"
    const result = await connection.incr(key)

    if (result === 1) {
      await connection.expire(key, 86400)
    }

    if (result > MAX_RATELIMIT) {
      const ttl = await connection.ttl(key)
      return res.status(200).json({ status: "error", message: "To Many Request", ttl })
    }

    next()

  } catch (error) {
    console.error({ error })
    next()
  }
}
