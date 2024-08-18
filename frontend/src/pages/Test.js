// frontend/src/pages/Test.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CameraPermission from '../components/CameraPermission';

function Test() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const res = await axios.get('/api/test/start', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setQuestions(res.data.questions);
      } catch (err) {
        console.error("Error fetching questions:", err);
      }
    };
    fetchTest();
  }, []);

  const handleAnswerChange = (index) => {
    const updatedResponses = [...responses];
    updatedResponses[currentQuestion] = index;
    setResponses(updatedResponses);
  };

  const handleSubmit = async () => {
    try {
      await axios.post('/api/test/submit', { responses }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      // Redirect to Finish Test page (implement redirection here)
    } catch (err) {
      console.error("Error submitting test:", err);
    }
  };

  return (
    <div>
      <CameraPermission />
      <div>
        {questions.length > 0 ? (
          <>
            <h3>{questions[currentQuestion]?.question}</h3>
            {questions[currentQuestion]?.options.map((option, index) => (
              <div key={index}>
                <input
                  type="radio"
                  name="option"
                  checked={responses[currentQuestion] === index}
                  onChange={() => handleAnswerChange(index)}
                />
                <label>{option}</label>
              </div>
            ))}
            <button onClick={() => setCurrentQuestion(currentQuestion - 1)} disabled={currentQuestion === 0}>
              Previous
            </button>
            <button onClick={() => setCurrentQuestion(currentQuestion + 1)} disabled={currentQuestion === questions.length - 1}>
              Next
            </button>
            {currentQuestion === questions.length - 1 && (
              <button onClick={handleSubmit}>Submit</button>
            )}
          </>
        ) : (
          <p>Loading questions...</p>
        )}
      </div>
    </div>
  );
}

export default Test;
