import React, { useState } from 'react';
import './Dashboard.css';
import { speakText, stopSpeech } from '../utils/speech';
import { playClickSound } from '../utils/audio';

export default function Dashboard({ onGoToMap, onGoToBackpack, artifactsCount, isMuted, onToggleMute }) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const introText = "Are you ready to travel through time and collect historical artifacts?";

  const handleSpeak = () => {
    if (isSpeaking) {
      stopSpeech();
      setIsSpeaking(false);
      return;
    }
    speakText(
      introText,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false)
    );
  };

  const handleMapClick = () => {
    playClickSound();
    stopSpeech();
    onGoToMap();
  };

  const handleBackpackClick = () => {
    playClickSound();
    stopSpeech();
    onGoToBackpack();
  };

  return (
    <div className="dashboard animate-pop" role="region" aria-label="Main Menu">
      <div className="top-controls">
        <button
          className="icon-ctrl-btn"
          onClick={onToggleMute}
          aria-label={isMuted ? "Unmute sound effects" : "Mute sound effects"}
          title={isMuted ? "Unmute sound effects" : "Mute sound effects"}
        >
          <span aria-hidden="true">{isMuted ? '🔇' : '🔊'}</span>
        </button>
      </div>

      <h1 className="dashboard-title">
        <span className="title-icon" aria-hidden="true">🚀</span>
        <span>Time Machine Adventure!</span>
        <span className="title-icon" aria-hidden="true">🦕</span>
      </h1>

      <div className="intro-container">
        <p className="intro-text">{introText}</p>
        <button
          onClick={handleSpeak}
          aria-label={isSpeaking ? "Stop reading text" : "Read text out loud"}
          className={`speak-btn ${isSpeaking ? 'speaking pulse-anim' : ''}`}
          title="Listen to instructions"
        >
          <span aria-hidden="true">{isSpeaking ? '⏹️' : '🗣️'}</span>
        </button>
      </div>

      <div className="dashboard-actions">
        <button
          className="start-btn pulse-subtle"
          onClick={handleMapClick}
          aria-label="Open Lessons Map"
        >
          <span className="btn-icon" aria-hidden="true">🗺️</span>
          <span>Lessons Map</span>
        </button>
        <button
          className="start-btn secondary-btn"
          onClick={handleBackpackClick}
          aria-label={`Open your backpack. You have collected ${artifactsCount} out of 10 artifacts`}
        >
          <span className="btn-icon" aria-hidden="true">🎒</span>
          <span>Backpack ({artifactsCount}/10)</span>
        </button>
      </div>
    </div>
  );
}
