export interface EmailData {
  email: string
  name: string
  subject: string
  message: string
}

export function validateEmail(email: string): boolean {
  // More robust email regex that prevents common issues
  const emailRegex = /^[a-zA-Z0-9]([a-zA-Z0-9._-]*[a-zA-Z0-9])?@[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?)+$/
  return emailRegex.test(email)
}

export function sanitizeInput(input: string): string {
  return input.trim().slice(0, 1000) // Limit length
}

export async function validateEmailData(data: Partial<EmailData>) {
  const errors: string[] = []

  if (!data.email || !validateEmail(data.email)) {
    errors.push("Invalid email address")
  }

  if (!data.subject || data.subject.trim().length === 0) {
    errors.push("Subject is required")
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.push("Message must be at least 10 characters")
  }

  if (errors.length > 0) {
    throw new Error(errors.join(", "))
  }
}
