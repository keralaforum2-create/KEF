import SibApiV3Sdk from 'sib-api-v3-sdk';
import nodemailer from "nodemailer";

// Event date - January 7-8, 2026
const EVENT_DATE = new Date("2026-01-07T10:00:00Z");
const FROM_NAME = 'Kerala Startup Fest';
const FROM_EMAIL = 'no-reply@keralastartupfest.com';

// Singleton instances to prevent memory leaks
let brevoApi: any = null;
let nodemailerTransporter: any = null;

function getBrevoApi(): any {
  if (!brevoApi) {
    const apiKey = process.env.BREVO_API_KEY;
    
    if (!apiKey) {
      console.error('❌ BREVO_API_KEY is NOT configured for email reminders');
      throw new Error('BREVO_API_KEY not configured');
    }
    
    console.log('✅ Brevo API initialized for email reminders');
    
    const defaultClient = SibApiV3Sdk.ApiClient.instance;
    const apiKeyAuth = defaultClient.authentications['api-key'];
    apiKeyAuth.apiKey = apiKey;
    
    brevoApi = new SibApiV3Sdk.TransactionalEmailsApi();
  }
  return brevoApi;
}

function getNodemailerTransporter(): any {
  if (!nodemailerTransporter) {
    nodemailerTransporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return nodemailerTransporter;
}

// Check if we should send reminders today
export function shouldSendReminders(): boolean {
  const now = new Date();
  
  // Send reminder only in January (one time, between Jan 1 and Jan 6)
  const isJanuary = now.getMonth() === 0; // 0 = January
  const dayOfMonth = now.getDate();
  
  return isJanuary && dayOfMonth <= 6;
}

// Get email body template
export function getEmailTemplate(name: string, registrationId: string, eventType: string): {
  subject: string;
  html: string;
} {
  const daysUntilEvent = Math.ceil((EVENT_DATE.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  
  return {
    subject: `Kerala Startup Fest 2026 - Event Reminder (${daysUntilEvent} Days Away)`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9fafb; }
            .header { background: linear-gradient(135deg, #dc2626 0%, #f97316 100%); color: white; padding: 30px; border-radius: 8px; text-align: center; }
            .header h1 { margin: 0; font-size: 28px; }
            .content { background: white; padding: 30px; margin-top: 20px; border-radius: 8px; }
            .content p { margin: 15px 0; }
            .highlight { background: #fef3c7; padding: 15px; border-left: 4px solid #f59e0b; margin: 20px 0; border-radius: 4px; }
            .button { display: inline-block; background: #dc2626; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
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
              <h2>Hi ${name}!</h2>
              
              <p>Thank you for registering for <strong>Kerala Startup Fest 2026</strong>! Mark your calendars - the event is happening in approximately <strong>${daysUntilEvent} days</strong>.</p>
              
              <div class="highlight">
                <strong>📅 Event Date & Time:</strong><br>
                January 7-8, 2026<br>
                <strong>📍 Location:</strong> Aspin Courtyards, Calicut Beach
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
              
              <p>If you have any questions or need to make changes, please contact us at <strong>support@keralastartupfest.com</strong></p>
              
              <div style="text-align: center;">
                <a href="https://keralastartupfest.com" class="button">Visit Our Website</a>
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

// Send email using Brevo
export async function sendEmail(to: string, subject: string, html: string): Promise<boolean> {
  try {
    const brevoApiKey = process.env.BREVO_API_KEY;
    
    if (brevoApiKey) {
      const api = getBrevoApi();
      
      const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
      sendSmtpEmail.sender = { name: FROM_NAME, email: FROM_EMAIL };
      sendSmtpEmail.to = [{ email: to }];
      sendSmtpEmail.subject = subject;
      sendSmtpEmail.htmlContent = html;
      
      await api.sendTransacEmail(sendSmtpEmail);
      
      console.log(`✅ Email sent successfully via Brevo to ${to}`);
      return true;
    }
    
    // Fallback to Nodemailer if Brevo is not configured
    console.log('⚠️ BREVO_API_KEY not configured, attempting fallback to Nodemailer');
    const transporter = getNodemailerTransporter();
    
    await transporter.sendMail({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to,
      subject,
      html
    });
    
    console.log(`✅ Email sent successfully via Nodemailer to ${to}`);
    return true;
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    return false;
  }
}
