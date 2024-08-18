require('dotenv').config();
const express = require('express');
const cron = require('node-cron');
const nodemailer = require('nodemailer');
const Test = require('./models/Test');

// Create an Express app
const app = express();

// Middleware for parsing JSON
app.use(express.json());

// Import and use the test routes
const testRoutes = require('./routes/test');
app.use('/api/test', testRoutes);

// Set up the transporter for nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Set up a cron job for evaluating tests and sending emails
cron.schedule('0 * * * *', async () => {
  try {
    const tests = await Test.find({ status: 'submitted' });
    
    for (const test of tests) {
      let score = 0;

      // Calculate the score
      test.questions.forEach((question, index) => {
        if (question.correctAnswer === test.responses[index]) {
          score++;
        }
      });

      // Update test status to 'evaluated'
      test.status = 'evaluated';
      await test.save();

      // Define email options
      const mailOptions = {
        from: process.env.EMAIL,
        to: test.user.email,
        subject: 'Test Score',
        text: `Your score is ${score}/${test.questions.length}`,
      };

      // Send email with the test score
      await transporter.sendMail(mailOptions);
    }
  } catch (error) {
    console.error('Error occurred during test evaluation and email sending:', error);
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
