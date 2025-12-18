import { Resend } from "resend";
import nodemailer from "nodemailer";

// Event date - April 18, 2026
const EVENT_DATE = new Date("2026-04-18T10:00:00Z");
const REMINDER_DAYS_BEFORE = 7;

// Check if we should send reminders today
export function shouldSendReminders(): boolean {
  const now = new Date();
  const daysUntilEvent = Math.ceil((EVENT_DATE.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  
  // Send reminder exactly 7 days before event
  return daysUntilEvent === REMINDER_DAYS_BEFORE;
}

// Get email body template
export function getEmailTemplate(name: string, registrationId: string, eventType: string): {
  subject: string;
  html: string;
} {
  const daysUntilEvent = Math.ceil((EVENT_DATE.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  
  return {
    subject: `🚀 Your Kerala Startup Fest 2026 Reminder - ${daysUntilEvent} Days Away!`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9fafb; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 8px; text-align: center; }
            .header h1 { margin: 0; font-size: 28px; }
            .content { background: white; padding: 30px; margin-top: 20px; border-radius: 8px; }
            .content p { margin: 15px 0; }
            .highlight { background: #fef3c7; padding: 15px; border-left: 4px solid #f59e0b; margin: 20px 0; border-radius: 4px; }
            .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
            .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #6b7280; }
            .details { background: #f3f4f6; padding: 15px; border-radius: 6px; margin: 20px 0; }
            .details p { margin: 8px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Kerala Startup Fest 2026</h1>
              <p>Your Registration Reminder</p>
            </div>
            
            <div class="content">
              <h2>Hi ${name}! 👋</h2>
              
              <p>We're excited to have you join us at <strong>Kerala Startup Fest 2026</strong>! This is a reminder that the event is happening in just <strong>${daysUntilEvent} days</strong>.</p>
              
              <div class="highlight">
                <strong>📅 Event Date & Time:</strong><br>
                April 18, 2026 at 10:00 AM IST<br>
                <strong>📍 Location:</strong> Kochi, Kerala
              </div>
              
              <div class="details">
                <p><strong>Your Registration Details:</strong></p>
                <p>Registration ID: <code>${registrationId}</code></p>
                <p>Event Type: ${eventType}</p>
                <p>Status: ✅ Confirmed</p>
              </div>
              
              <h3>What to Prepare:</h3>
              <ul>
                <li>📸 Bring a valid ID proof</li>
                <li>👕 Comfortable attire recommended</li>
                <li>📱 Keep your registration ID handy</li>
                <li>⏰ Arrive 15 minutes early</li>
              </ul>
              
              <p>If you have any questions or need to make changes, please contact us at <strong>support@keralastartupsest.com</strong></p>
              
              <div style="text-align: center;">
                <a href="https://keralastartupsest.com" class="button">Visit Our Website</a>
              </div>
            </div>
            
            <div class="footer">
              <p>© 2026 Kerala Startup Fest. All rights reserved.</p>
              <p>This is an automated reminder. Please do not reply to this email.</p>
            </div>
          </div>
        </body>
      </html>
    `
  };
}

// Send email using Resend or Nodemailer
export async function sendEmail(to: string, subject: string, html: string): Promise<boolean> {
  try {
    // Try Resend first if API key is available
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      const resend = new Resend(resendApiKey);
      await resend.emails.send({
        from: "Kerala Startup Fest <noreply@keralastartupsest.com>",
        to,
        subject,
        html
      });
      return true;
    }
    
    // Fallback to Nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    
    await transporter.sendMail({
      from: process.env.SMTP_FROM || "Kerala Startup Fest <noreply@keralastartupsest.com>",
      to,
      subject,
      html
    });
    return true;
  } catch (error) {
    console.error("Email sending failed:", error);
    return false;
  }
}
