// server-api/server.js
require("dotenv").config();
const express = require("express");
const path = require("path");
const upload = require("./upload");
const { makeId } = require("./utils");
const { sendRegistrationEmails } = require("./email");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// serve public folder
app.use(express.static(path.join(__dirname, "..", "public")));

app.post("/register", upload.single("paymentScreenshot"), async (req, res) => {
  try {
    const { name, email, phone, other } = req.body;
    const screenshotPath = req.file ? req.file.path : null;
    const reg = {
      id: makeId(),
      name,
      email,
      phone,
      other,
      screenshotPath,
      createdAt: new Date(),
    };

    // OPTIONAL: save reg to DB here if you want

    await sendRegistrationEmails(reg);

    res.send(`
      <h1>Registration Successful</h1>
      <p>Thanks <strong>${reg.name}</strong> — ID: <strong>${reg.id}</strong></p>
      <p>Confirmation sent to: ${reg.email}</p>
      <a href="/">Back</a>
    `);
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).send("Server error (check logs)");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port", PORT));
