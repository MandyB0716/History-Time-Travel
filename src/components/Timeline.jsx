import React from 'react';
import './Timeline.css';

export default function Timeline({ eras, currentEraIndex, unlockedEras, onEraClick, onHome }) {
  return (
    <div className="reward-screen animate-pop" style={{ textAlign: 'center', background: 'var(--card-bg)', padding: '40px', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-lg)', maxWidth: '1000px', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '3rem', color: 'var(--primary)', textAlign: 'left' }}>🗺️ Lessons Map</h1>
        <button onClick={onHome} style={{ background: 'none', border: 'none', fontSize: '3rem', cursor: 'pointer', transition: 'transform 0.2s' }}>🏠</button>
      </div>

      <div className="timeline-container" style={{ position: 'relative', background: 'none', padding: 0 }}>
        <div className="timeline-line" aria-hidden="true"></div>
        {eras.map((era, index) => {
          const isUnlocked = unlockedEras.includes(index);
          const isActive = index === currentEraIndex;
          
          let buttonLabel = era.title;
          if (!isUnlocked) buttonLabel += ' (Locked)';
          if (isActive) buttonLabel += ' (Current Location)';

          return (
            <button
              key={era.id}
              className={`timeline-node ${isUnlocked ? 'unlocked' : 'locked'} ${isActive ? 'active' : ''}`}
              onClick={() => onEraClick(index)}
              disabled={!isUnlocked}
              title={era.title}
              aria-label={buttonLabel}
            >
              <span aria-hidden="true">
                {isUnlocked ? Array.from(era.title)[0] : '🔒'}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
