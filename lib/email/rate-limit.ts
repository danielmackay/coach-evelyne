// Simple in-memory rate limiter for development
// For production, use @upstash/ratelimit with Redis or Vercel's built-in rate limiting

interface RateLimitEntry {
  count: number
  resetAt: number
}

const rateLimitStore = new Map<string, RateLimitEntry>()

export function checkRateLimit(identifier: string, limit: number = 5, windowMs: number = 60000): boolean {
  const now = Date.now()
  const entry = rateLimitStore.get(identifier)

  // Clean up old entries periodically
  if (rateLimitStore.size > 1000) {
    for (const [key, value] of rateLimitStore.entries()) {
      if (value.resetAt < now) {
        rateLimitStore.delete(key)
      }
    }
  }

  if (!entry || entry.resetAt < now) {
    // First request or window expired
    rateLimitStore.set(identifier, {
      count: 1,
      resetAt: now + windowMs,
    })
    return true
  }

  if (entry.count >= limit) {
    // Rate limit exceeded
    return false
  }

  // Increment count
  entry.count++
  rateLimitStore.set(identifier, entry)
  return true
}

export function getRateLimitInfo(identifier: string) {
  const entry = rateLimitStore.get(identifier)
  if (!entry || entry.resetAt < Date.now()) {
    return { remaining: 5, resetAt: Date.now() + 60000 }
  }
  return { remaining: Math.max(0, 5 - entry.count), resetAt: entry.resetAt }
}
