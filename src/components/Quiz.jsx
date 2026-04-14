import React, { useState } from 'react';
import './Quiz.css';

export default function Quiz({ era, onWin }) {
  const [bouncingId, setBouncingId] = useState(null);

  const handleOptionClick = (option) => {
    if (option.isCorrect) {
      setTimeout(() => {
        onWin();
      }, 500);
    } else {
      setBouncingId(option.id);
      setTimeout(() => setBouncingId(null), 500);
    }
  };

  return (
    <div className="quiz-container animate-pop">
      <h2>{era.quiz.question}</h2>
      <div className="options-grid">
        {era.quiz.options.map(option => (
          <button 
            key={option.id}
            className={`quiz-option ${bouncingId === option.id ? 'animate-shake' : ''}`}
            onClick={() => handleOptionClick(option)}
          >
            <span className="option-image">{option.image}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
