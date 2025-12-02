// server-api/email.js
require("dotenv").config();
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

async function sendRegistrationEmails(reg) {
  const userHtml = `
    <h2>Kerala Startup Fest — Registration Confirmed</h2>
    <p>Hi ${reg.name},</p>
    <p>Your registration ID: <strong>${reg.id}</strong></p>
  `;
  await transporter.sendMail({
    from: `"${process.env.FROM_NAME || "Kerala Startup Fest"}" <${process.env.EMAIL_USER}>`,
    to: reg.email,
    subject: "KSF — Registration Confirmed",
    html: userHtml,
  });

  const adminHtml = `
    <h2>New Registration</h2>
    <p><b>Name:</b> ${reg.name}</p>
    <p><b>Email:</b> ${reg.email}</p>
    <p><b>Phone:</b> ${reg.phone || "—"}</p>
    <p><b>ID:</b> ${reg.id}</p>
  `;
  const mailOptions = {
    from: `"${process.env.FROM_NAME || "Kerala Startup Fest"}" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: `New Registration: ${reg.name} (${reg.id})`,
    html: adminHtml,
    attachments: [],
  };
  if (reg.screenshotPath && fs.existsSync(reg.screenshotPath)) {
    mailOptions.attachments.push({
      filename: path.basename(reg.screenshotPath),
      path: reg.screenshotPath,
    });
  }
  await transporter.sendMail(mailOptions);
}

module.exports = { sendRegistrationEmails };
