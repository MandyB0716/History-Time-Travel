import React from 'react';
import './ActivityCenter.css';
import { playClickSound } from '../../utils/audio';
import { stopSpeech } from '../../utils/speech';

export default function ActivityCenter({ onSelectGame, onHome }) {
  const handleGameClick = (game) => {
    playClickSound();
    stopSpeech();
    onSelectGame(game);
  };

  const handleHome = () => {
    playClickSound();
    stopSpeech();
    onHome();
  };

  return (
    <div className="activity-center-page animate-pop" role="region" aria-label="Activity Center">
      <div className="activity-header">
        <div>
          <h1 className="activity-title">🎮 Time Explorer Activity Center</h1>
          <p className="activity-subtitle">Choose a fun history mini-game or creative activity!</p>
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

      <div className="games-grid">
        <button
          className="game-card fossil-card"
          onClick={() => handleGameClick('fossil-dig')}
          aria-label="Play Archaeology Fossil Dig"
        >
          <div className="game-card-icon" aria-hidden="true">🏺</div>
          <h2 className="game-card-title">Archaeology Fossil Dig</h2>
          <p className="game-card-desc">Brush away sand and stones to uncover hidden dinosaur bones and ancient relics!</p>
          <span className="game-play-btn">Play Dig! ⛏️</span>
        </button>

        <button
          className="game-card memory-card"
          onClick={() => handleGameClick('memory-match')}
          aria-label="Play Artifact Memory Match"
        >
          <div className="game-card-icon" aria-hidden="true">🃏</div>
          <h2 className="game-card-title">Artifact Memory Match</h2>
          <p className="game-card-desc">Flip cards to match historical artifacts and test your memory skills!</p>
          <span className="game-play-btn">Play Match! 🎯</span>
        </button>

        <button
          className="game-card coloring-card"
          onClick={() => handleGameClick('coloring-book')}
          aria-label="Play Historical Coloring Book"
        >
          <div className="game-card-icon" aria-hidden="true">🎨</div>
          <h2 className="game-card-title">Historical Coloring Book</h2>
          <p className="game-card-desc">Paint dinosaurs, castles, rockets, and add fun stickers to your masterpieces!</p>
          <span className="game-play-btn">Start Painting! 🖌️</span>
        </button>
      </div>
    </div>
  );
}
