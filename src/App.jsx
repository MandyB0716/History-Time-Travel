import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import Timeline from './components/Timeline';
import Lesson from './components/Lesson';
import Quiz from './components/Quiz';
import ArtifactBackpack from './components/ArtifactBackpack';
import { eras } from './data/eras';
import './App.css';

export default function App() {
  const [currentEraIndex, setCurrentEraIndex] = useState(0);
  const [unlockedEras, setUnlockedEras] = useState([0]);
  const [artifacts, setArtifacts] = useState([]);
  const [viewState, setViewState] = useState('menu'); // 'menu', 'map', 'backpack', 'lesson', 'quiz', 'reward', 'end'

  const handleTimelineClick = (index) => {
    if (unlockedEras.includes(index)) {
      setCurrentEraIndex(index);
      setViewState('lesson');
    }
  };

  const handleQuizWin = (artifact) => {
    if (!artifacts.some(a => a.id === artifact.id)) {
      setArtifacts([...artifacts, artifact]);
    }
    setViewState('reward');
  };

  const handleNextEra = () => {
    const nextIndex = currentEraIndex + 1;
    if (nextIndex < eras.length) {
      if (!unlockedEras.includes(nextIndex)) {
        setUnlockedEras([...unlockedEras, nextIndex]);
      }
      setCurrentEraIndex(nextIndex);
      setViewState('map');
    } else {
      setViewState('end');
    }
  };

  const currentEra = eras[currentEraIndex];

  const isEraView = ['lesson', 'quiz', 'reward'].includes(viewState);
  const bgColor = isEraView ? currentEra.color : 'var(--background)';

  return (
    <div className="app-container" style={{ backgroundColor: bgColor, transition: 'background-color 0.5s ease' }}>
      <main className="main-content">
        {viewState === 'menu' && (
          <Dashboard
            onGoToMap={() => setViewState('map')}
            onGoToBackpack={() => setViewState('backpack')}
            artifactsCount={artifacts.length}
          />
        )}

        {viewState === 'backpack' && (
          <ArtifactBackpack
            artifacts={artifacts}
            onHome={() => setViewState('menu')}
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
            era={currentEra}
            onContinue={() => setViewState('quiz')}
            onHome={() => setViewState('menu')}
          />
        )}

        {viewState === 'quiz' && (
          <Quiz
            era={currentEra}
            onWin={() => handleQuizWin(currentEra.artifact)}
            onHome={() => setViewState('menu')}
          />
        )}

        {viewState === 'reward' && (
          <div className="reward-screen animate-pop" aria-live="polite" style={{ textAlign: 'center', background: 'var(--card-bg)', padding: '40px', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-lg)' }}>
            <h2 style={{ fontSize: '3rem', color: 'var(--text-dark)' }}>
              🎉 You Found The {currentEra.artifact.name}! 🎉
            </h2>
            <div className="animate-float" aria-hidden="true" style={{ fontSize: '8rem', margin: '20px' }}>
              {currentEra.artifact.icon}
            </div>
            {currentEraIndex < eras.length - 1 ? (
              <button className="start-btn" onClick={handleNextEra}>Back to Map!</button>
            ) : (
              <button className="start-btn" onClick={handleNextEra}>Finish Mission!</button>
            )}
          </div>
        )}

        {viewState === 'end' && (
          <div className="reward-screen animate-pop" aria-live="polite" style={{ textAlign: 'center', background: 'var(--card-bg)', padding: '40px', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-lg)', maxWidth: '800px' }}>
            <h1 style={{ fontSize: '4rem', color: 'var(--primary)' }}>Mission Complete!</h1>
            <p style={{ fontSize: '2rem' }}>You collected all 10 artifacts and safely returned home.</p>
            <div className="artifacts-grid" style={{ marginTop: '20px', gap: '20px', justifyContent: 'center', display: 'flex', flexWrap: 'wrap' }}>
              {artifacts.map(a => (
                <div key={a.id} className="artifact-item animate-pop" aria-label={a.name} style={{ width: '80px', height: '80px', fontSize: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--background)', borderRadius: '50%' }}>
                  <span aria-hidden="true">{a.icon}</span>
                </div>
              ))}
            </div>
            <button className="start-btn" style={{ marginTop: '40px' }} onClick={() => window.location.reload()}>Play Again!</button>
          </div>
        )}
      </main>
    </div>
  );
}
