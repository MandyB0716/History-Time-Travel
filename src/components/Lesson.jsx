import React, { useState } from 'react';
import './Lesson.css';
import { speakText, stopSpeech } from '../utils/speech';
import { playClickSound } from '../utils/audio';

export default function Lesson({ era, onContinue, onHome }) {
  const [lessonIndex, setLessonIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const currentLesson = era.lessons[lessonIndex];
  const lessonSpeechText = `Part ${lessonIndex + 1}: ${currentLesson.subtitle}. ${currentLesson.text}`;

  const handleSpeak = () => {
    if (isSpeaking) {
      stopSpeech();
      setIsSpeaking(false);
      return;
    }
    speakText(
      lessonSpeechText,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false)
    );
  };

  const handleNext = () => {
    playClickSound();
    stopSpeech();
    setIsSpeaking(false);
    if (lessonIndex < era.lessons.length - 1) {
      setLessonIndex(lessonIndex + 1);
    } else {
      onContinue();
    }
  };

  const handlePrev = () => {
    if (lessonIndex > 0) {
      playClickSound();
      stopSpeech();
      setIsSpeaking(false);
      setLessonIndex(lessonIndex - 1);
    }
  };

  const handleHome = () => {
    playClickSound();
    stopSpeech();
    setIsSpeaking(false);
    onHome();
  };

  return (
    <div className="lesson-container animate-pop" role="region" aria-label={`Lesson for ${era.title}`}>
      <button
        onClick={handleHome}
        aria-label="Return to Main Menu"
        title="Return to Main Menu"
        className="home-btn-absolute"
      >
        <span aria-hidden="true">🏠</span>
      </button>

      <div className="lesson-header">
        <span className="era-badge" style={{ backgroundColor: era.color }}>{era.title}</span>
        <h1 className="lesson-era-title">{era.title}</h1>
      </div>

      <div className="lesson-card-body">
        <div className="lesson-subtitle-row">
          <h2>Part {lessonIndex + 1}: {currentLesson.subtitle}</h2>
          <button
            onClick={handleSpeak}
            aria-label={isSpeaking ? "Stop reading lesson" : "Read lesson out loud"}
            title="Read lesson out loud"
            className={`speak-btn ${isSpeaking ? 'speaking pulse-anim' : ''}`}
          >
            <span aria-hidden="true">{isSpeaking ? '⏹️' : '🗣️'}</span>
          </button>
        </div>

        {currentLesson.image && (
          <div className="lesson-image animate-float" aria-hidden="true">
            {currentLesson.image}
          </div>
        )}

        <p className="lesson-narrative-text">{currentLesson.text}</p>
      </div>

      <div className="lesson-progress-container">
        <div className="lesson-progress-dots" aria-label={`Lesson step ${lessonIndex + 1} of ${era.lessons.length}`}>
          {era.lessons.map((_, idx) => (
            <span
              key={idx}
              className={`dot ${idx === lessonIndex ? 'active' : ''} ${idx < lessonIndex ? 'completed' : ''}`}
              title={`Part ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="lesson-actions-row">
        {lessonIndex > 0 ? (
          <button className="nav-btn prev-btn" onClick={handlePrev} aria-label="Go to previous lesson part">
            <span>⬅️ Previous</span>
          </button>
        ) : (
          <div style={{ width: '120px' }}></div>
        )}

        <button className="start-btn" onClick={handleNext}>
          <span>{lessonIndex < era.lessons.length - 1 ? 'Next Lesson ➡️' : 'Play Quiz! 🎯'}</span>
        </button>

        {lessonIndex > 0 ? null : <div style={{ width: '120px' }}></div>}
      </div>
    </div>
  );
}
