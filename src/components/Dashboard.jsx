import React from 'react';
import './Dashboard.css';
import { speakText } from '../utils/speech';

export default function Dashboard({ onGoToMap, onGoToBackpack, artifactsCount }) {
  const introText = "Are you ready to travel through time and collect historical artifacts?";
  return (
    <div className="dashboard animate-pop">
      <h1>🚀 Time Machine Adventure! 🦕</h1>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', marginBottom: '30px' }}>
        <p style={{ margin: 0 }}>{introText}</p>
        <button onClick={() => speakText(introText)} aria-label="Read text out loud" style={{ background: 'none', border: 'none', fontSize: '2.5rem', cursor: 'pointer' }} className="animate-pop">
          <span aria-hidden="true">🔊</span>
        </button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
        <button className="start-btn animate-float" onClick={onGoToMap} aria-label="Open Lessons Map">
          <span aria-hidden="true">🗺️</span> Lessons Map
        </button>
        <button className="start-btn" onClick={onGoToBackpack} aria-label={`Open your backpack. You carry ${artifactsCount} out of 10 artifacts`}>
          <span aria-hidden="true">🎒</span> Backpack ({artifactsCount}/10)
        </button>
      </div>
    </div>
  );
}
