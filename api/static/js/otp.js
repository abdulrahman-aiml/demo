const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Create a transport object using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use Gmail's SMTP service
  auth: {
    user: 'your-email@gmail.com',  // Replace with your email
    pass: 'your-email-password'    // Replace with your email password or app password
  }
});

// Function to generate a random OTP
function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit OTP
}

// Route to handle OTP sending
app.post('/send-otp', (req, res) => {
  const { email } = req.body;  // Email from the client (user)

  if (!email) {
    return res.status(400).json({ message: 'Email is required!' });
  }

  // Generate OTP
  const otp = generateOtp();

  // Setup email data
  const mailOptions = {
    from: 'your-email@gmail.com',  // Replace with your email
    to: email,                    // Send OTP to the user's email
    subject: 'Your OTP Code',
    text: `Your OTP code is: ${otp}`
  };

  // Send OTP email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ message: 'Failed to send OTP' });
    }

    console.log('Email sent:', info.response);
    res.status(200).json({ message: 'OTP sent successfully!' });
  });
});

// Route to verify OTP (you can extend it for real-world use)
app.post('/verify-otp', (req, res) => {
  const { otp, userOtp } = req.body;

  if (otp === userOtp) {
    res.status(200).json({ message: 'OTP verified successfully!' });
  } else {
    res.status(400).json({ message: 'Invalid OTP' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
