import React, { useState } from 'react';
import './Quiz.css';
import { speakText, stopSpeech } from '../utils/speech';
import { playCorrectSound, playWrongSound, playClickSound } from '../utils/audio';

export default function Quiz({ era, onWin, onHome }) {
  const [bouncingId, setBouncingId] = useState(null);
  const [successId, setSuccessId] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeak = () => {
    if (isSpeaking) {
      stopSpeech();
      setIsSpeaking(false);
      return;
    }
    speakText(
      era.quiz.question,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false)
    );
  };

  const handleOptionClick = (option) => {
    stopSpeech();
    setIsSpeaking(false);

    if (option.isCorrect) {
      setSuccessId(option.id);
      setFeedbackMessage("🎉 Great job! You got it right! ⭐");
      playCorrectSound();
      setTimeout(() => {
        onWin();
      }, 700);
    } else {
      setBouncingId(option.id);
      setFeedbackMessage("💡 Oops! Try another one!");
      playWrongSound();
      setTimeout(() => setBouncingId(null), 600);
    }
  };

  const handleHome = () => {
    playClickSound();
    stopSpeech();
    onHome();
  };

  return (
    <div className="quiz-container animate-pop" role="region" aria-label={`Quiz for ${era.title}`}>
      <button
        onClick={handleHome}
        aria-label="Return to Main Menu"
        title="Return to Main Menu"
        className="home-btn-absolute"
      >
        <span aria-hidden="true">🏠</span>
      </button>

      <div className="quiz-header">
        <span className="era-badge" style={{ backgroundColor: era.color }}>{era.title} Quiz</span>
        <div className="question-row">
          <h2 className="quiz-question-text">{era.quiz.question}</h2>
          <button
            onClick={handleSpeak}
            aria-label={isSpeaking ? "Stop reading question" : "Read question out loud"}
            title="Read question out loud"
            className={`speak-btn ${isSpeaking ? 'speaking pulse-anim' : ''}`}
          >
            <span aria-hidden="true">{isSpeaking ? '⏹️' : '🗣️'}</span>
          </button>
        </div>
      </div>

      {feedbackMessage && (
        <div className="quiz-feedback-banner animate-pop" aria-live="assertive">
          <span>{feedbackMessage}</span>
        </div>
      )}

      <div className="options-grid" role="group" aria-label="Answer choices">
        {era.quiz.options.map(option => {
          const isSelectedCorrect = successId === option.id;
          const isSelectedWrong = bouncingId === option.id;

          return (
            <button
              key={option.id}
              className={`quiz-option ${isSelectedWrong ? 'animate-shake wrong-choice' : ''} ${isSelectedCorrect ? 'correct-choice animate-pop' : ''}`}
              onClick={() => handleOptionClick(option)}
              aria-label={`${option.label || option.id}`}
              disabled={Boolean(successId)}
            >
              <span className="option-image" aria-hidden="true">{option.image}</span>
              <span className="option-label">{option.label || option.id}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
