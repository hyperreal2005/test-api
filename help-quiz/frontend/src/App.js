import React, { useState } from 'react';
import './App.css';

var ans_final = []
const questions = [
  {
    question: "Over the last 2 weeks, how often have you felt down, depressed, or hopeless?",
    options: ["Not at all", "Several days", "More than half the days", "Nearly every day"]
  },
  {
    question: "How often have you had little interest or pleasure in doing things?",
    options: ["Not at all", "Several days", "More than half the days", "Nearly every day"]
  },
  {
    question: "How often have you had trouble falling or staying asleep, or sleeping too much?",
    options: ["Not at all", "Several days", "More than half the days", "Nearly every day"]
  },
  {
    question: "How often have you felt tired or had little energy?",
    options: ["Not at all", "Several days", "More than half the days", "Nearly every day"]
  },
  {
    question: "How often have you had trouble concentrating on things?",
    options: ["Not at all", "Several days", "More than half the days", "Nearly every day"]
  }
];

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const handleAnswerClick = (selectedAnswer) => {
    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    ans_final=newAnswers;

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setTimeout(() => setCurrentQuestion(nextQuestion), 300);
    } else {
      setShowAnalysis(true);
    }
  };

  const handleBookSession = () => {
    
    console.log("Book a session clicked");
  };

  const handleTalkToYuri = () => {
    // Implement talk to Yuri functionality here
    console.log("Talk to Yuri clicked");
  };

  return (
    <div className="app">
      <h1>Mental Health Questionnaire</h1>
      {!showAnalysis ? (
        <>
          <div className="question-section">
            <div className="question-count">
              Question {currentQuestion + 1} of {questions.length}
            </div>
            <div className="question-text">{questions[currentQuestion].question}</div>
          </div>
          <div className="answer-section">
            {questions[currentQuestion].options.map((option, index) => (
              <button key={index} onClick={() => handleAnswerClick(option)}>
                {option}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="analysis-section">
          <h2>Thank you for completing the questionnaire</h2>
          <p>Based on your responses, we recommend the following options:</p>
          <div className="button-container">
            <button onClick={handleBookSession}>Book a Session</button>
            <button onClick={handleTalkToYuri}>Talk to Yuri</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;