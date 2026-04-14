import React, { useState } from 'react';
import './Quiz.css';
import { speakText } from '../utils/speech';

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
      <button onClick={onHome} aria-label="Return to Main Menu" style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', fontSize: '2.5rem', cursor: 'pointer' }}>
        <span aria-hidden="true">🏠</span>
      </button>
      
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
        <h2 style={{ marginBottom: 0 }}>{era.quiz.question}</h2>
        <button onClick={() => speakText(era.quiz.question)} aria-label="Read question out loud" style={{ background: 'none', border: 'none', fontSize: '2.5rem', cursor: 'pointer' }}>
          <span aria-hidden="true">🔊</span>
        </button>
      </div>
      <div className="options-grid">
        {era.quiz.options.map(option => (
          <button
            key={option.id}
            className={`quiz-option ${bouncingId === option.id ? 'animate-shake' : ''}`}
            onClick={() => handleOptionClick(option)}
            aria-label={option.label || option.id}
          >
            <span className="option-image" aria-hidden="true">{option.image}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
