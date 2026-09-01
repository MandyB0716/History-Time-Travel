import React, { useState } from 'react';
import './MemoryMatch.css';
import { playClickSound, playCorrectSound, playWrongSound, playFanfareSound } from '../../utils/audio';
import { speakText, stopSpeech } from '../../utils/speech';

const PAIRS_DATABASE = [
  { id: 'dino', name: 'Dinosaur', icon: '🦖' },
  { id: 'mammoth', name: 'Mammoth', icon: '🦣' },
  { id: 'pyramid', name: 'Pyramid', icon: '🏜️' },
  { id: 'knight', name: 'Knight', icon: '🛡️' },
  { id: 'pirate', name: 'Pirate', icon: '🏴‍☠️' },
  { id: 'rocket', name: 'Rocket', icon: '🚀' },
  { id: 'castle', name: 'Castle', icon: '🏰' },
  { id: 'temple', name: 'Temple', icon: '🏛️' }
];

function generateDeck(pairCount = 6) {
  const selectedPairs = [...PAIRS_DATABASE].sort(() => 0.5 - Math.random()).slice(0, pairCount);
  const deck = [];

  selectedPairs.forEach((pair) => {
    deck.push({ cardId: `${pair.id}-a`, pairId: pair.id, name: pair.name, icon: pair.icon });
    deck.push({ cardId: `${pair.id}-b`, pairId: pair.id, name: pair.name, icon: pair.icon });
  });

  return deck.sort(() => 0.5 - Math.random());
}

export default function MemoryMatch({ onBack }) {
  const [deckSize, setDeckSize] = useState(6); // 6 pairs (12 cards)
  const [cards, setCards] = useState(() => generateDeck(6));
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedPairIds, setMatchedPairIds] = useState([]);
  const [moves, setMoves] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  const handleDifficultyChange = (newSize) => {
    playClickSound();
    setDeckSize(newSize);
    setCards(generateDeck(newSize));
    setFlippedIndices([]);
    setMatchedPairIds([]);
    setMoves(0);
    setIsLocked(false);
  };

  const handleCardClick = (index) => {
    if (isLocked) return;
    if (flippedIndices.includes(index)) return;
    if (matchedPairIds.includes(cards[index].pairId)) return;

    playClickSound();

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setIsLocked(true);
      setMoves(prev => prev + 1);

      const firstCard = cards[newFlipped[0]];
      const secondCard = cards[newFlipped[1]];

      if (firstCard.pairId === secondCard.pairId) {
        // Matched!
        playCorrectSound();
        const newMatched = [...matchedPairIds, firstCard.pairId];
        setMatchedPairIds(newMatched);
        setFlippedIndices([]);
        setIsLocked(false);

        if (newMatched.length === deckSize) {
          playFanfareSound();
          speakText(`You matched all ${deckSize} pairs in ${moves + 1} turns! Fantastic memory!`);
        }
      } else {
        // Not matched
        playWrongSound();
        setTimeout(() => {
          setFlippedIndices([]);
          setIsLocked(false);
        }, 1000);
      }
    }
  };

  const handleReset = () => {
    playClickSound();
    stopSpeech();
    setCards(generateDeck(deckSize));
    setFlippedIndices([]);
    setMatchedPairIds([]);
    setMoves(0);
    setIsLocked(false);
  };

  const handleBack = () => {
    playClickSound();
    stopSpeech();
    onBack();
  };

  const isWon = matchedPairIds.length === deckSize;

  return (
    <div className="memory-match-page animate-pop" role="region" aria-label="Artifact Memory Match">
      <div className="memory-header">
        <div>
          <h1 className="memory-title">🃏 Artifact Memory Match</h1>
          <p className="memory-subtitle">Flip cards to find the matching historical pairs!</p>
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

      <div className="memory-controls-row">
        <div className="difficulty-pills">
          <button
            className={`diff-btn ${deckSize === 3 ? 'active-diff' : ''}`}
            onClick={() => handleDifficultyChange(3)}
          >
            ⭐ Easy (6 Cards)
          </button>
          <button
            className={`diff-btn ${deckSize === 6 ? 'active-diff' : ''}`}
            onClick={() => handleDifficultyChange(6)}
          >
            🏆 Explorer (12 Cards)
          </button>
        </div>

        <div className="memory-stats-badges">
          <span className="stat-badge">Pairs: {matchedPairIds.length} / {deckSize}</span>
          <span className="stat-badge turns">Turns: {moves}</span>
        </div>
      </div>

      <div className={`memory-grid grid-${deckSize * 2}`} role="grid" aria-label="Memory cards grid">
        {cards.map((card, index) => {
          const isFlipped = flippedIndices.includes(index);
          const isMatched = matchedPairIds.includes(card.pairId);
          const isRevealed = isFlipped || isMatched;

          return (
            <button
              key={card.cardId}
              className={`memory-card-btn ${isRevealed ? 'flipped' : ''} ${isMatched ? 'matched animate-pop' : ''}`}
              onClick={() => handleCardClick(index)}
              disabled={isRevealed || isLocked}
              aria-label={isRevealed ? `${card.name} (${isMatched ? 'Matched' : 'Flipped'})` : `Card ${index + 1} face down`}
            >
              <div className="card-inner">
                <div className="card-front" aria-hidden="true">
                  <span className="card-question-mark">⏳</span>
                </div>
                <div className="card-back" aria-hidden="true">
                  <span className="card-relic-icon">{card.icon}</span>
                  <span className="card-relic-text">{card.name}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {isWon ? (
        <div className="memory-won-banner animate-pop" aria-live="assertive">
          <h2>🎉 Memory Master! 🌟</h2>
          <p>You matched all pairs in only {moves} turns!</p>
          <button className="start-btn" onClick={handleReset}>
            🃏 Play Again!
          </button>
        </div>
      ) : (
        <div className="memory-footer">
          <button className="nav-btn" onClick={handleReset}>
            🔄 Shuffle & Restart
          </button>
        </div>
      )}
    </div>
  );
}
