// server-api/server.js
require('dotenv').config();
const express = require('express');
const path = require('path');
const upload = require('./upload.cjs');          // multer config
const { makeId } = require('./utils.cjs');      // id helper
const { sendRegistrationEmails } = require('./email.cjs'); // email sender

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// serve uploads so attachments are accessible if needed
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// serve public folder at root
app.use(express.static(path.join(__dirname, '..', 'public')));

app.post('/register', upload.single('paymentScreenshot'), async (req, res) => {
  try {
    const { name, email, phone, other } = req.body;
    const screenshotPath = req.file ? req.file.path : null;
    const reg = { id: makeId(), name, email, phone, other, screenshotPath, createdAt: new Date() };

    // OPTIONAL: save reg to DB here

    // Send both emails (user + admin)
    await sendRegistrationEmails(reg);

    // Redirect to success page
    res.redirect('/success.html');
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).send('Server error (check console).');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server running on port', PORT));
