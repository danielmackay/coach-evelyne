// Environment variable validation
// Call this at app startup to fail fast if config is missing

export function validateEnvVars() {
  const required = {
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
  }

  const missing: string[] = []

  for (const [key, value] of Object.entries(required)) {
    if (!value || value.trim() === "") {
      missing.push(key)
    }
  }

  if (missing.length > 0) {
    const error = `FATAL: Missing required environment variables: ${missing.join(", ")}`
    console.error(error)
    console.error("Please add these variables to your .env.local file")
    throw new Error(error)
  }

  console.log("✅ Environment variables validated successfully")
}
