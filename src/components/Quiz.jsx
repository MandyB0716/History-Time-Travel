import React, { useState } from 'react';
import './Quiz.css';

export default function Quiz({ era, onWin, onHome }) {
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
    <div className="quiz-container animate-pop" style={{ position: 'relative' }}>
      <button onClick={onHome} style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', fontSize: '2.5rem', cursor: 'pointer' }}>🏠</button>
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
