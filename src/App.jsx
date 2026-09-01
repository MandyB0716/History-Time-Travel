import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import Timeline from './components/Timeline';
import Lesson from './components/Lesson';
import Quiz from './components/Quiz';
import ArtifactBackpack from './components/ArtifactBackpack';
import { eras } from './data/eras';
import { playFanfareSound, playClickSound, setMuted, getMuted } from './utils/audio';
import { stopSpeech } from './utils/speech';
import './App.css';

const STORAGE_KEY_UNLOCKED = 'time_machine_unlocked_eras';
const STORAGE_KEY_ARTIFACTS = 'time_machine_artifacts';

export default function App() {
  const [currentEraIndex, setCurrentEraIndex] = useState(0);
  
  const [unlockedEras, setUnlockedEras] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_UNLOCKED);
      return saved ? JSON.parse(saved) : [0];
    } catch {
      return [0];
    }
  });

  const [artifacts, setArtifacts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ARTIFACTS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isMutedState, setIsMutedState] = useState(() => getMuted());
  const [viewState, setViewState] = useState('menu'); // 'menu', 'map', 'backpack', 'lesson', 'quiz', 'reward', 'end'

  // Persist progress to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_UNLOCKED, JSON.stringify(unlockedEras));
    } catch (e) {
      console.warn('Could not save unlocked eras to storage', e);
    }
  }, [unlockedEras]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ARTIFACTS, JSON.stringify(artifacts));
    } catch (e) {
      console.warn('Could not save artifacts to storage', e);
    }
  }, [artifacts]);

  const handleToggleMute = () => {
    const nextMuted = !isMutedState;
    setIsMutedState(nextMuted);
    setMuted(nextMuted);
  };

  const handleTimelineClick = (index) => {
    if (unlockedEras.includes(index)) {
      stopSpeech();
      setCurrentEraIndex(index);
      setViewState('lesson');
    }
  };

  const handleQuizWin = (artifact) => {
    stopSpeech();
    playFanfareSound();
    if (!artifacts.some(a => a.id === artifact.id)) {
      setArtifacts(prev => [...prev, artifact]);
    }
    setViewState('reward');
  };

  const handleNextEra = () => {
    playClickSound();
    stopSpeech();
    const nextIndex = currentEraIndex + 1;
    if (nextIndex < eras.length) {
      if (!unlockedEras.includes(nextIndex)) {
        setUnlockedEras(prev => [...prev, nextIndex]);
      }
      setCurrentEraIndex(nextIndex);
      setViewState('map');
    } else {
      setViewState('end');
    }
  };

  const handleResetProgress = () => {
    stopSpeech();
    localStorage.removeItem(STORAGE_KEY_UNLOCKED);
    localStorage.removeItem(STORAGE_KEY_ARTIFACTS);
    setUnlockedEras([0]);
    setArtifacts([]);
    setCurrentEraIndex(0);
    setViewState('menu');
  };

  const currentEra = eras[currentEraIndex] || eras[0];
  const isEraView = ['lesson', 'quiz', 'reward'].includes(viewState);
  const bgColor = isEraView ? currentEra.color : 'var(--background)';

  return (
    <div className="app-container" style={{ backgroundColor: bgColor, transition: 'background-color 0.5s ease' }}>
      {/* Top quick navigation bar for era views */}
      {isEraView && (
        <header className="era-top-nav">
          <button
            className="nav-icon-btn"
            onClick={() => { playClickSound(); stopSpeech(); setViewState('menu'); }}
            aria-label="Home Menu"
            title="Home Menu"
          >
            <span aria-hidden="true">🏠</span>
          </button>
          <button
            className="nav-icon-btn"
            onClick={() => { playClickSound(); stopSpeech(); setViewState('map'); }}
            aria-label="Time Map"
            title="Time Map"
          >
            <span aria-hidden="true">🗺️</span>
          </button>
          <button
            className="nav-icon-btn"
            onClick={() => { playClickSound(); stopSpeech(); setViewState('backpack'); }}
            aria-label={`Backpack (${artifacts.length}/10)`}
            title={`Backpack (${artifacts.length}/10)`}
          >
            <span aria-hidden="true">🎒 {artifacts.length}/10</span>
          </button>
          <button
            className="nav-icon-btn"
            onClick={handleToggleMute}
            aria-label={isMutedState ? "Unmute sound effects" : "Mute sound effects"}
            title={isMutedState ? "Unmute sound effects" : "Mute sound effects"}
          >
            <span aria-hidden="true">{isMutedState ? '🔇' : '🔊'}</span>
          </button>
        </header>
      )}

      <main className="main-content">
        {viewState === 'menu' && (
          <Dashboard
            onGoToMap={() => setViewState('map')}
            onGoToBackpack={() => setViewState('backpack')}
            artifactsCount={artifacts.length}
            isMuted={isMutedState}
            onToggleMute={handleToggleMute}
          />
        )}

        {viewState === 'backpack' && (
          <ArtifactBackpack
            eras={eras}
            artifacts={artifacts}
            onHome={() => setViewState('menu')}
            onResetProgress={handleResetProgress}
          />
        )}

        {viewState === 'map' && (
          <Timeline
            eras={eras}
            currentEraIndex={currentEraIndex}
            unlockedEras={unlockedEras}
            onEraClick={handleTimelineClick}
            onHome={() => setViewState('menu')}
          />
        )}

        {viewState === 'lesson' && (
          <Lesson
            key={currentEra.id}
            era={currentEra}
            onContinue={() => setViewState('quiz')}
            onHome={() => setViewState('menu')}
          />
        )}

        {viewState === 'quiz' && (
          <Quiz
            key={currentEra.id}
            era={currentEra}
            onWin={() => handleQuizWin(currentEra.artifact)}
            onHome={() => setViewState('menu')}
          />
        )}

        {viewState === 'reward' && (
          <div className="reward-screen animate-pop" aria-live="polite" role="region" aria-label="Era Reward Screen">
            <h2 className="reward-heading">
              🎉 You Found The {currentEra.artifact.name}! 🎉
            </h2>
            <div className="reward-icon-floating animate-float" aria-hidden="true">
              {currentEra.artifact.icon}
            </div>
            <p className="reward-description">
              Great job exploring {currentEra.title}! It has been safely stored in your backpack.
            </p>
            <button className="start-btn pulse-subtle" onClick={handleNextEra}>
              {currentEraIndex < eras.length - 1 ? 'Continue to Next Era 🗺️' : 'Finish Mission! 🏆'}
            </button>
          </div>
        )}

        {viewState === 'end' && (
          <div className="reward-screen animate-pop mission-complete-card" aria-live="polite" role="region" aria-label="Mission Complete Screen">
            <h1 className="mission-title">🏆 Mission Complete! 🚀</h1>
            <p className="mission-subtitle">You collected all 10 historical artifacts and safely returned home!</p>
            
            <div className="mission-artifacts-grid" aria-label="All collected artifacts">
              {artifacts.map(a => (
                <div key={a.id} className="end-artifact-badge animate-pop" title={a.name} aria-label={a.name}>
                  <span aria-hidden="true">{a.icon}</span>
                  <span className="end-artifact-name">{a.name}</span>
                </div>
              ))}
            </div>

            <div className="end-actions">
              <button className="start-btn" onClick={() => setViewState('menu')}>
                🏠 Return to Main Menu
              </button>
              <button className="reset-adventure-btn" onClick={handleResetProgress}>
                🔄 Start New Adventure
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
