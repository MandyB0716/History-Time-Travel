import React from 'react';
import './Dashboard.css';

export default function Dashboard({ onStart }) {
  return (
    <div className="dashboard animate-pop">
      <h1>🚀 Time Machine Adventure! 🦕</h1>
      <p>Are you ready to travel through time and collect historical artifacts?</p>
      <button className="start-btn animate-float" onClick={onStart}>
        PULL LEVER TO START!
      </button>
    </div>
  );
}
