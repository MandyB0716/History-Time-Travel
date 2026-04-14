import React from 'react';
import './ArtifactBackpack.css';

export default function ArtifactBackpack({ artifacts }) {
  if (artifacts.length === 0) return null;

  return (
    <div className="backpack-container animate-pop">
      <h3>🎒 Backpack ({artifacts.length}/10)</h3>
      <div className="artifacts-grid">
        {artifacts.map((a, i) => (
          <div key={`${a.id}-${i}`} className="artifact-item animate-pop" title={a.name}>
            {a.icon}
          </div>
        ))}
      </div>
    </div>
  );
}
