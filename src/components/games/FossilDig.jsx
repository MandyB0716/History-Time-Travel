import React, { useState } from 'react';
import './FossilDig.css';
import { playClickSound, playCorrectSound, playFanfareSound } from '../../utils/audio';
import { speakText, stopSpeech } from '../../utils/speech';

const RELICS_POOL = [
  { id: 'trex-skull', name: 'T-Rex Skull', icon: '🦖' },
  { id: 'dino-egg', name: 'Dinosaur Egg', icon: '🥚' },
  { id: 'roman-coin', name: 'Roman Coin', icon: '🪙' },
  { id: 'pharaoh-mask', name: 'Pharaoh Mask', icon: '👑' },
  { id: 'knight-shield', name: 'Knight Shield', icon: '🛡️' },
  { id: 'pirate-ruby', name: 'Pirate Ruby', icon: '💎' },
  { id: 'golden-gear', name: 'Golden Gear', icon: '⚙️' },
  { id: 'moon-rock', name: 'Moon Rock', icon: '🌑' }
];

function generateDigSite() {
  const size = 12; // 3x4 grid
  const shuffledRelics = [...RELICS_POOL].sort(() => 0.5 - Math.random()).slice(0, 4);
  
  const positions = new Set();
  while (positions.size < 4) {
    positions.add(Math.floor(Math.random() * size));
  }
  const posArray = Array.from(positions);

  const tiles = Array.from({ length: size }, (_, index) => {
    const relicIndex = posArray.indexOf(index);
    return {
      id: index,
      layers: 2, // 2 = deep rock/dirt, 1 = loose sand, 0 = revealed
      relic: relicIndex !== -1 ? shuffledRelics[relicIndex] : null
    };
  });

  return { tiles, totalRelics: 4 };
}

export default function FossilDig({ onBack }) {
  const [gameState, setGameState] = useState(() => generateDigSite());
  const [foundRelics, setFoundRelics] = useState([]);
  const [selectedTool, setSelectedTool] = useState('brush'); // 'brush' or 'pickaxe'
  const [activeAction, setActiveAction] = useState(null); // { tileId, tool, particles }

  const handleTileClick = (tileIndex) => {
    const tile = gameState.tiles[tileIndex];
    if (tile.layers === 0) return;

    playClickSound();

    // Spawn tool and dust particles over the clicked tile
    const particles = selectedTool === 'brush' 
      ? ['💨', '✨', '⏳', '💨'] 
      : ['💥', '🪨', '⚡', '✨'];

    setActiveAction({
      tileId: tileIndex,
      tool: selectedTool,
      particles
    });

    setTimeout(() => {
      setActiveAction(null);
    }, 600);

    const newLayers = tile.layers - 1;
    const updatedTiles = gameState.tiles.map((t, idx) => 
      idx === tileIndex ? { ...t, layers: newLayers } : t
    );

    setGameState(prev => ({ ...prev, tiles: updatedTiles }));

    if (newLayers === 0 && tile.relic) {
      const newFound = [...foundRelics, tile.relic];
      setFoundRelics(newFound);
      
      if (newFound.length === gameState.totalRelics) {
        playFanfareSound();
        speakText(`Incredible! You excavated all ${gameState.totalRelics} historical treasures!`);
      } else {
        playCorrectSound();
        speakText(`You uncovered a ${tile.relic.name}!`);
      }
    }
  };

  const handleReset = () => {
    playClickSound();
    stopSpeech();
    setGameState(generateDigSite());
    setFoundRelics([]);
    setActiveAction(null);
  };

  const handleBack = () => {
    playClickSound();
    stopSpeech();
    onBack();
  };

  const isComplete = foundRelics.length === gameState.totalRelics;

  return (
    <div className="fossil-dig-page animate-pop" role="region" aria-label="Archaeology Fossil Dig">
      <div className="dig-header">
        <div>
          <h1 className="dig-title">🏺 Archaeology Fossil Dig</h1>
          <p className="dig-subtitle">Choose a tool and tap the earth to sweep away sand and crack rocks!</p>
        </div>
        <button
          onClick={handleBack}
          className="home-btn"
          aria-label="Back to Activity Center"
          title="Back to Activity Center"
        >
          <span aria-hidden="true">⬅️</span>
        </button>
      </div>

      <div className="dig-controls-bar">
        <div className="tool-selector" role="radiogroup" aria-label="Digging tool">
          <button
            className={`tool-btn ${selectedTool === 'brush' ? 'active-tool' : ''}`}
            onClick={() => setSelectedTool('brush')}
            aria-checked={selectedTool === 'brush'}
            role="radio"
          >
            <span className="tool-btn-icon" aria-hidden="true">🖌️</span> Soft Brush
          </button>
          <button
            className={`tool-btn ${selectedTool === 'pickaxe' ? 'active-tool' : ''}`}
            onClick={() => setSelectedTool('pickaxe')}
            aria-checked={selectedTool === 'pickaxe'}
            role="radio"
          >
            <span className="tool-btn-icon" aria-hidden="true">⛏️</span> Archaeologist Pick
          </button>
        </div>

        <div className="dig-counter-badge" aria-live="polite">
          <span>🏆 Found: {foundRelics.length} / {gameState.totalRelics}</span>
        </div>
      </div>

      <div className="dig-site-grid" role="grid" aria-label="Archaeology dig site">
        {gameState.tiles.map((tile) => {
          let layerClass = 'layer-deep';
          let layerLabel = 'Deep Rock & Soil (Tap to crack)';
          let tileIcon = '🪨';

          if (tile.layers === 1) {
            layerClass = 'layer-sand';
            layerLabel = 'Loose Sand (Tap to brush)';
            tileIcon = '⏳';
          } else if (tile.layers === 0) {
            layerClass = 'layer-cleared';
            layerLabel = tile.relic ? `Found ${tile.relic.name}` : 'Empty Earth';
            tileIcon = tile.relic ? tile.relic.icon : '✨';
          }

          const isActionOnTile = activeAction && activeAction.tileId === tile.id;

          return (
            <div key={tile.id} className="dig-tile-wrapper">
              <button
                className={`dig-tile ${layerClass} ${tile.layers === 0 && tile.relic ? 'relic-sparkle animate-pop' : ''}`}
                onClick={() => handleTileClick(tile.id)}
                aria-label={layerLabel}
                disabled={tile.layers === 0}
              >
                <span className="tile-content-icon" aria-hidden="true">{tileIcon}</span>
                {tile.layers === 0 && tile.relic && (
                  <span className="tile-relic-name">{tile.relic.name}</span>
                )}
                {tile.layers === 2 && (
                  <span className="layer-depth-hint">Rock Layer</span>
                )}
                {tile.layers === 1 && (
                  <span className="layer-depth-hint sand-hint">Sand Layer</span>
                )}
              </button>

              {/* Active Animated Tool & Flying Dust Particles */}
              {isActionOnTile && (
                <div className="tool-animation-overlay" aria-hidden="true">
                  <div className={`animated-tool-icon ${activeAction.tool === 'brush' ? 'tool-brush-sweep' : 'tool-pick-strike'}`}>
                    {activeAction.tool === 'brush' ? '🖌️' : '⛏️'}
                  </div>
                  <div className="particles-burst">
                    {activeAction.particles.map((p, pIdx) => (
                      <span key={pIdx} className={`flying-particle particle-${pIdx}`}>{p}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {isComplete ? (
        <div className="dig-complete-banner animate-pop" aria-live="assertive">
          <h2>🎉 Site Excavation Complete! 🦖</h2>
          <p>You carefully uncovered every artifact like a true archaeologist!</p>
          <button className="start-btn" onClick={handleReset}>
            ⛏️ Dig Another Site!
          </button>
        </div>
      ) : (
        <div className="dig-actions-footer">
          <button className="nav-btn" onClick={handleReset}>
            🔄 New Dig Site
          </button>
        </div>
      )}
    </div>
  );
}
