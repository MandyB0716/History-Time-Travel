import React from 'react';
import './Timeline.css';
import { playClickSound } from '../utils/audio';
import { stopSpeech } from '../utils/speech';

const eraIcons = {
  'dinosaurs': '🦖',
  'ice-age': '🦣',
  'egypt': '🏜️',
  'greece': '🏛️',
  'rome': '🏟️',
  'maya': '🛕',
  'middle-ages': '🏰',
  'japan': '🏯',
  'pirates': '🏴‍☠️',
  'renaissance': '🎨',
  'wild-west': '🤠',
  'industrial': '🚂',
  'aviation': '🛩️',
  'retro': '🎸',
  'space-age': '🚀'
};

export default function Timeline({ eras, currentEraIndex, unlockedEras, onEraClick, onHome }) {
  const handleNodeClick = (index) => {
    playClickSound();
    stopSpeech();
    onEraClick(index);
  };

  const handleHome = () => {
    playClickSound();
    stopSpeech();
    onHome();
  };

  return (
    <div className="timeline-page-card animate-pop" role="region" aria-label="Lessons Map">
      <div className="timeline-header">
        <div>
          <h1 className="timeline-heading">🗺️ Time Travel Map</h1>
          <p className="timeline-subheading">Choose an unlocked era to start learning! (15 Eras Total)</p>
        </div>
        <button
          onClick={handleHome}
          className="home-btn"
          aria-label="Return to Main Menu"
          title="Return to Main Menu"
        >
          <span aria-hidden="true">🏠</span>
        </button>
      </div>

      <div className="timeline-scroll-wrapper">
        <div className="timeline-container">
          <div className="timeline-track" aria-hidden="true"></div>

          {eras.map((era, index) => {
            const isUnlocked = unlockedEras.includes(index);
            const isActive = index === currentEraIndex;
            const icon = eraIcons[era.id] || era.artifact.icon || '⭐';

            let buttonAriaLabel = `Era ${index + 1}: ${era.title}`;
            if (!isUnlocked) buttonAriaLabel += ' (Locked)';
            if (isActive) buttonAriaLabel += ' (Current Destination)';

            return (
              <div key={era.id} className="timeline-step">
                <button
                  className={`timeline-node ${isUnlocked ? 'unlocked' : 'locked'} ${isActive ? 'active' : ''}`}
                  onClick={() => handleNodeClick(index)}
                  disabled={!isUnlocked}
                  title={era.title}
                  aria-label={buttonAriaLabel}
                  style={isUnlocked ? { backgroundColor: era.color } : {}}
                >
                  <span className="node-icon" aria-hidden="true">
                    {isUnlocked ? icon : '🔒'}
                  </span>
                  {isActive && <span className="active-badge" aria-hidden="true">HERE</span>}
                </button>
                <div className="timeline-label">
                  <span className="era-number">Era {index + 1}</span>
                  <span className="era-name">{era.title}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
