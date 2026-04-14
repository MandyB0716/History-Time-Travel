import React from 'react';
import './Dashboard.css';

export default function Dashboard({ onGoToMap, onGoToBackpack, artifactsCount }) {
  return (
    <div className="dashboard animate-pop">
      <h1>🚀 Time Machine Adventure! 🦕</h1>
      <p>Are you ready to travel through time and collect historical artifacts?</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
        <button className="start-btn animate-float" onClick={onGoToMap}>
          🗺️ Lessons Map
        </button>
        <button className="start-btn" onClick={onGoToBackpack}>
          🎒 Backpack ({artifactsCount}/10)
        </button>
      </div>
    </div>
  );
}
