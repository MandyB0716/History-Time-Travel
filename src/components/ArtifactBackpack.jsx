import React, { useState } from 'react';
import './ArtifactBackpack.css';
import { playClickSound } from '../utils/audio';
import { stopSpeech } from '../utils/speech';

export default function ArtifactBackpack({ eras, artifacts, onHome, onResetProgress }) {
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  const handleHome = () => {
    playClickSound();
    stopSpeech();
    onHome();
  };

  const handleResetClick = () => {
    playClickSound();
    setShowConfirmReset(true);
  };

  const handleConfirmReset = () => {
    playClickSound();
    setShowConfirmReset(false);
    onResetProgress();
  };

  const handleCancelReset = () => {
    playClickSound();
    setShowConfirmReset(false);
  };

  return (
    <div className="backpack-page animate-pop" role="region" aria-label="Artifact Backpack">
      <div className="backpack-header">
        <div>
          <h1 className="backpack-title">🎒 Explorer's Backpack</h1>
          <p className="backpack-subtitle">Collected: {artifacts.length} / {eras.length} Artifacts</p>
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

      <div className="backpack-slots-grid" role="group" aria-label="Artifact collection slots">
        {eras.map((era) => {
          const collected = artifacts.find(a => a.id === era.artifact.id);

          return (
            <div
              key={era.id}
              className={`artifact-slot ${collected ? 'unlocked-slot' : 'locked-slot'}`}
              title={collected ? `${era.artifact.name} (${era.title})` : `Locked (${era.title})`}
              aria-label={collected ? `${era.artifact.name}, collected from ${era.title}` : `Locked artifact slot for ${era.title}`}
            >
              <div className="slot-icon-wrapper" aria-hidden="true">
                {collected ? collected.icon : '❓'}
              </div>
              <div className="slot-meta">
                <span className="slot-era-title">{era.title}</span>
                <span className="slot-item-name">{collected ? era.artifact.name : 'Mystery Item'}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="backpack-footer">
        {!showConfirmReset ? (
          <button className="reset-adventure-btn" onClick={handleResetClick}>
            🔄 Reset Adventure Progress
          </button>
        ) : (
          <div className="reset-confirm-box animate-pop">
            <p>Are you sure you want to start over?</p>
            <div className="confirm-buttons">
              <button className="confirm-btn yes" onClick={handleConfirmReset}>Yes, Reset</button>
              <button className="confirm-btn no" onClick={handleCancelReset}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
