import nodemailer from "nodemailer"
import type { Transporter } from "nodemailer"
import type SMTPTransport from "nodemailer/lib/smtp-transport"

// Singleton pattern - create transporter once
let transporter: Transporter<SMTPTransport.SentMessageInfo> | null = null

export function getEmailTransporter() {
  if (transporter) {
    return transporter
  }

  // Validate environment variables
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    throw new Error(
      "Missing required environment variables: SMTP_USER or SMTP_PASS"
    )
  }

  // Using Gmail service (recommended for simplicity)
  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  return transporter
}

// Optional: Verify transporter configuration
export async function verifyEmailConnection() {
  try {
    const transporter = getEmailTransporter()
    await transporter.verify()
    console.log("✅ Email server connection verified")
    return true
  } catch (error) {
    console.error("❌ Email server connection failed:", error)
    return false
  }
}
