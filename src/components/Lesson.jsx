import React, { useState, useEffect } from 'react';
import './Lesson.css';
import { speakText } from '../utils/speech';

export default function Lesson({ era, onContinue, onHome }) {
  const [lessonIndex, setLessonIndex] = useState(0);

  useEffect(() => {
    setLessonIndex(0);
  }, [era]);

  const handleNext = () => {
    if (lessonIndex < era.lessons.length - 1) {
      setLessonIndex(lessonIndex + 1);
    } else {
      onContinue();
    }
  };

  const currentLesson = era.lessons[lessonIndex];

  return (
    <div className="lesson-container animate-pop" style={{ position: 'relative' }}>
      <button onClick={onHome} aria-label="Return to Main Menu" style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', fontSize: '2.5rem', cursor: 'pointer' }}>
        <span aria-hidden="true">🏠</span>
      </button>
      <h1>{era.title}</h1>

      <div className="lesson-content">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px' }}>
          <h2>Part {lessonIndex + 1}: {currentLesson.subtitle}</h2>
          <button onClick={() => speakText(`Part ${lessonIndex + 1}: ${currentLesson.subtitle}. ${currentLesson.text}`)} aria-label="Read lesson out loud" style={{ background: 'none', border: 'none', fontSize: '2.5rem', cursor: 'pointer' }}>
            <span aria-hidden="true">🔊</span>
          </button>
        </div>
        {currentLesson.image && <div className="lesson-image" aria-hidden="true">{currentLesson.image}</div>}
        <p>{currentLesson.text}</p>
      </div>

      <div className="lesson-progress">
        {era.lessons.map((_, idx) => (
          <span key={idx} className={`dot ${idx === lessonIndex ? 'active' : ''}`}></span>
        ))}
      </div>

      <button className="start-btn" onClick={handleNext}>
        {lessonIndex < era.lessons.length - 1 ? 'Next Lesson' : 'Play Quiz!'}
      </button>
    </div>
  );
}
