import React, { useState, useEffect } from 'react';
import './Lesson.css';

export default function Lesson({ era, onContinue }) {
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
    <div className="lesson-container animate-pop">
      <h1>{era.title}</h1>

      <div className="lesson-content">
        <h2>Part {lessonIndex + 1}: {currentLesson.subtitle}</h2>
        {currentLesson.image && <div className="lesson-image">{currentLesson.image}</div>}
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
