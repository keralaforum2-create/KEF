import { shouldSendReminders, getEmailTemplate, sendEmail } from "./emailReminder";
import { db } from "./db";
import { registrations } from "../shared/schema";
import { sql } from "drizzle-orm";

let isRunning = false;
let schedulerInterval: NodeJS.Timeout | null = null;

export async function startReminderScheduler() {
  // Disable scheduler on production to prevent memory issues
  if (process.env.NODE_ENV === "production") {
    console.log("📧 Email reminder scheduler disabled on production");
    return;
  }

  // Prevent multiple scheduler instances
  if (schedulerInterval) {
    console.log("⚠️ Reminder scheduler already running");
    return;
  }

  // Run every 24 hours
  schedulerInterval = setInterval(async () => {
    if (isRunning) return;
    isRunning = true;
    
    try {
      // Check if we should send reminders (only in January, one time)
      if (!shouldSendReminders()) {
        isRunning = false;
        return;
      }
      
      console.log("🔔 Starting email reminder batch (January)...");
      
      // Get all registrations with payment status "paid" that haven't been reminded
      const registrationsToRemind = await db
        .select()
        .from(registrations)
        .where(
          sql`${registrations.paymentStatus} = 'paid' AND ${registrations.reminderSentAt} IS NULL`
        );
      
      console.log(`Found ${registrationsToRemind.length} registrations to remind`);
      
      let successCount = 0;
      let failureCount = 0;
      
      // Send emails in batches
      for (const reg of registrationsToRemind) {
        try {
          const eventType = reg.registrationType === "expert-session" 
            ? `Expert Session: ${reg.sessionName || "General Session"}`
            : `Contest: ${reg.contestName || "General Contest"}`;
          
          const { subject, html } = getEmailTemplate(reg.fullName, reg.registrationId, eventType);
          
          const sent = await sendEmail(reg.email, subject, html);
          
          if (sent) {
            // Update reminder sent timestamp
            await db
              .update(registrations)
              .set({ reminderSentAt: new Date() })
              .where(sql`${registrations.id} = ${reg.id}`);
            
            successCount++;
            console.log(`✅ Reminder sent to ${reg.email}`);
          } else {
            failureCount++;
            console.log(`❌ Failed to send reminder to ${reg.email}`);
          }
        } catch (error) {
          failureCount++;
          console.error(`Error processing ${reg.email}:`, error);
        }
        
        // Add small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      
      console.log(`📊 Reminder batch complete: ${successCount} sent, ${failureCount} failed`);
    } catch (error) {
      console.error("Reminder scheduler error:", error);
    } finally {
      isRunning = false;
    }
  }, 24 * 60 * 60 * 1000); // Run every 24 hours
}

export function stopReminderScheduler() {
  if (schedulerInterval) {
    clearInterval(schedulerInterval);
    schedulerInterval = null;
    console.log("📧 Reminder scheduler stopped");
  }
}
