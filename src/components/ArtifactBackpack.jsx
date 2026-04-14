import React from 'react';
import './ArtifactBackpack.css';

export default function ArtifactBackpack({ artifacts, onHome }) {
  return (
    <div className="reward-screen animate-pop" style={{ textAlign: 'center', background: 'var(--card-bg)', padding: '40px', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-lg)', maxWidth: '800px', width: '100%' }}>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '3rem', color: 'var(--primary)' }}>🎒 Your Artifacts</h1>
        <button onClick={onHome} style={{ background: 'none', border: 'none', fontSize: '3rem', cursor: 'pointer', transition: 'transform 0.2s' }}>🏠</button>
      </div>

      <h2 style={{ fontSize: '1.8rem', color: 'var(--text-dark)', marginBottom: '30px' }}>Collected: {artifacts.length}/10</h2>

      {artifacts.length === 0 ? (
        <p style={{ fontSize: '1.8rem' }}>You haven't collected any artifacts yet. Go play some lessons!</p>
      ) : (
        <div className="artifacts-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
          {artifacts.map((a, i) => (
            <div key={`${a.id}-${i}`} className="artifact-item animate-pop" title={a.name} style={{ width: '100px', height: '100px', fontSize: '4rem', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--background)', borderRadius: '50%', boxShadow: 'var(--shadow-sm)' }}>
              {a.icon}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
