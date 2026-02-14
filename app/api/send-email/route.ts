import { NextResponse } from "next/server"
import { getEmailTransporter } from "@/lib/email/transporter"
import { validateEmailData, sanitizeInput } from "@/lib/email/utils"
import { checkRateLimit } from "@/lib/email/rate-limit"
import { validateEnvVars } from "@/lib/email/env-validation"

// Validate environment variables at module load (startup)
validateEnvVars()

export async function POST(request: Request) {
  try {
    // Rate limiting: 5 requests per minute per IP
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"
    if (!checkRateLimit(ip, 5, 60000)) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Please try again later." },
        { status: 429 }
      )
    }

    // Parse request body
    const body = await request.json()
    const { firstName, lastName, email, phone, goal, message } = body

    // Combine first and last name
    const fullName = `${firstName || ""} ${lastName || ""}`.trim()

    // Prepare email data
    const emailData = {
      email,
      name: fullName || "Anonymous",
      subject: "New Contact Form Submission from Coach Evelyne Website",
      message,
    }

    // Validate inputs
    await validateEmailData(emailData)

    // Sanitize inputs
    const sanitizedData = {
      email: sanitizeInput(email),
      name: sanitizeInput(emailData.name),
      phone: phone ? sanitizeInput(phone) : "Not provided",
      goal: goal ? sanitizeInput(goal) : "Not specified",
      message: sanitizeInput(message),
    }

    // Get transporter
    const transporter = getEmailTransporter()

    // Email content
    const mailOptions = {
      from: `"${sanitizedData.name}" <${process.env.SMTP_USER}>`, // Sender
      to: process.env.SMTP_USER, // Your email (receiving contact form)
      replyTo: sanitizedData.email, // User's email for replies
      subject: "New Contact Form Submission",
      text: `
Name: ${sanitizedData.name}
Email: ${sanitizedData.email}
Phone: ${sanitizedData.phone}
Fitness Goal: ${sanitizedData.goal}

Message:
${sanitizedData.message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
          <div style="background-color: white; border-radius: 8px; padding: 30px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #1f2937; margin-bottom: 20px; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">New Contact Form Submission</h2>
            
            <div style="margin-bottom: 20px;">
              <p style="margin: 8px 0;"><strong style="color: #374151;">Name:</strong> <span style="color: #6b7280;">${sanitizedData.name}</span></p>
              <p style="margin: 8px 0;"><strong style="color: #374151;">Email:</strong> <a href="mailto:${sanitizedData.email}" style="color: #3b82f6; text-decoration: none;">${sanitizedData.email}</a></p>
              <p style="margin: 8px 0;"><strong style="color: #374151;">Phone:</strong> <span style="color: #6b7280;">${sanitizedData.phone}</span></p>
              <p style="margin: 8px 0;"><strong style="color: #374151;">Fitness Goal:</strong> <span style="color: #6b7280;">${sanitizedData.goal}</span></p>
            </div>
            
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 25px 0;">
            
            <div style="margin-top: 20px;">
              <h3 style="color: #374151; margin-bottom: 10px;">Message:</h3>
              <p style="color: #6b7280; line-height: 1.6; white-space: pre-wrap;">${sanitizedData.message}</p>
            </div>
            
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 25px 0;">
            
            <p style="color: #9ca3af; font-size: 12px; margin-top: 20px;">
              This email was sent from the Coach Evelyne contact form. Reply directly to this email to respond to ${sanitizedData.name}.
            </p>
          </div>
        </div>
      `,
    }

    // Send email
    const info = await transporter.sendMail(mailOptions)

    console.log("✅ Email sent successfully:", info.messageId)

    return NextResponse.json(
      {
        success: true,
        messageId: info.messageId,
        message: "Email sent successfully",
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("❌ Email sending error:", error)

    // Handle specific error types
    const errorMessage = error instanceof Error ? error.message : "Unknown error"

    // Check for common SMTP errors
    if (errorMessage.includes("EAUTH")) {
      return NextResponse.json(
        { success: false, error: "Authentication failed. Check SMTP credentials." },
        { status: 500 }
      )
    }

    if (errorMessage.includes("ECONNREFUSED")) {
      return NextResponse.json(
        { success: false, error: "Cannot connect to email server." },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: false, error: "Failed to send email. Please try again later." },
      { status: 500 }
    )
  }
}

// Optional: Health check endpoint
export async function GET() {
  return NextResponse.json({ message: "Email API is running" }, { status: 200 })
}
