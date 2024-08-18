// backend/routes/test.js
const express = require('express');
const router = express.Router();

// Sample questions
const questions = [
  {
    question: "Who is the Prime Minister of France?",
    options: ["Emmanuel Macron", "Jean Castex", "Édouard Philippe", "François Hollande"],
    correctAnswer: 1 // Index of the correct answer
  },
  {
    question: "What is the capital of Japan?",
    options: ["Tokyo", "Osaka", "Kyoto", "Nagoya"],
    correctAnswer: 0
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1
  },
  // Add more questions as needed
];

router.get('/start', (req, res) => {
  // Optionally shuffle the questions or limit the number of questions served
  res.json({ questions });
});

module.exports = router;
