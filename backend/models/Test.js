// backend/models/Test.js
const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctAnswer: Number,
});

const TestSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  questions: [QuestionSchema],
  responses: [{ type: Number }],
  status: { type: String, default: 'incomplete' },
});

module.exports = mongoose.model('Test', TestSchema);
