import React from 'react';
import './Timeline.css';

export default function Timeline({ eras, currentEraIndex, unlockedEras, onEraClick }) {
  return (
    <div className="timeline-container">
      <div className="timeline-line"></div>
      {eras.map((era, index) => {
        const isUnlocked = unlockedEras.includes(index);
        const isActive = index === currentEraIndex;
        return (
          <button 
            key={era.id}
            className={`timeline-node ${isUnlocked ? 'unlocked' : 'locked'} ${isActive ? 'active' : ''}`}
            onClick={() => onEraClick(index)}
            disabled={!isUnlocked}
            title={era.title}
          >
            {isUnlocked ? Array.from(era.title)[0] : '🔒'}
          </button>
        );
      })}
    </div>
  );
}
