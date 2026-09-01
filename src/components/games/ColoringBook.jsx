import React, { useRef, useState, useEffect } from 'react';
import './ColoringBook.css';
import { playClickSound, playCorrectSound } from '../../utils/audio';
import { stopSpeech } from '../../utils/speech';

const COLOR_PALETTE = [
  '#ef4444', '#f97316', '#f59e0b', '#84cc16', 
  '#10b981', '#06b6d4', '#3b82f6', '#8b5cf6', 
  '#ec4899', '#78350f', '#0f172a', '#ffffff'
];

const STAMPS = ['🦖', '🦕', '👑', '🏰', '🏴‍☠️', '🚀', '🤠', '⭐', '🦣', '🏛️'];

const SCENES = [
  { id: 'dino', name: '🌋 Dino Valley', icon: '🦖' },
  { id: 'castle', name: '🏰 Knight Castle', icon: '🏰' },
  { id: 'pyramid', name: '🏜️ Egypt Pyramids', icon: '🏜️' },
  { id: 'space', name: '🚀 Space Rocket', icon: '🚀' }
];

export default function ColoringBook({ onBack }) {
  const canvasRef = useRef(null);
  const [selectedColor, setSelectedColor] = useState('#ef4444');
  const [brushSize, setBrushSize] = useState(12);
  const [selectedTool, setSelectedTool] = useState('brush'); // 'brush', 'eraser', 'stamp'
  const [selectedStamp, setSelectedStamp] = useState('🦖');
  const [selectedScene, setSelectedScene] = useState('dino');
  const [isDrawing, setIsDrawing] = useState(false);

  // Draw scene template on canvas load / change
  const drawSceneTemplate = (sceneId) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';

    if (sceneId === 'dino') {
      // Volcano & Mountain outlines
      ctx.beginPath();
      ctx.moveTo(40, 360);
      ctx.lineTo(160, 160);
      ctx.lineTo(220, 160);
      ctx.lineTo(340, 360);
      ctx.stroke();

      // Lava bursts
      ctx.beginPath();
      ctx.arc(190, 140, 20, 0, Math.PI * 2);
      ctx.stroke();

      // Ground
      ctx.beginPath();
      ctx.moveTo(0, 360);
      ctx.lineTo(600, 360);
      ctx.stroke();

      // Big Sun
      ctx.beginPath();
      ctx.arc(520, 80, 40, 0, Math.PI * 2);
      ctx.stroke();
    } else if (sceneId === 'castle') {
      // Castle walls & towers
      ctx.strokeRect(180, 200, 240, 160);
      ctx.strokeRect(140, 140, 60, 220);
      ctx.strokeRect(400, 140, 60, 220);

      // Tower roofs (triangles)
      ctx.beginPath();
      ctx.moveTo(130, 140);
      ctx.lineTo(170, 70);
      ctx.lineTo(210, 140);
      ctx.closePath();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(390, 140);
      ctx.lineTo(430, 70);
      ctx.lineTo(470, 140);
      ctx.closePath();
      ctx.stroke();

      // Castle Gate
      ctx.beginPath();
      ctx.arc(300, 360, 40, Math.PI, 0);
      ctx.stroke();
    } else if (sceneId === 'pyramid') {
      // Pyramids
      ctx.beginPath();
      ctx.moveTo(60, 360);
      ctx.lineTo(260, 120);
      ctx.lineTo(460, 360);
      ctx.closePath();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(340, 360);
      ctx.lineTo(460, 200);
      ctx.lineTo(580, 360);
      ctx.closePath();
      ctx.stroke();

      // Desert Sun
      ctx.beginPath();
      ctx.arc(100, 80, 45, 0, Math.PI * 2);
      ctx.stroke();
    } else if (sceneId === 'space') {
      // Rocket outline
      ctx.beginPath();
      ctx.ellipse(300, 220, 50, 110, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Nose cone
      ctx.beginPath();
      ctx.moveTo(250, 140);
      ctx.lineTo(300, 60);
      ctx.lineTo(350, 140);
      ctx.closePath();
      ctx.stroke();

      // Porthole Window
      ctx.beginPath();
      ctx.arc(300, 200, 24, 0, Math.PI * 2);
      ctx.stroke();

      // Planet Moon
      ctx.beginPath();
      ctx.arc(480, 320, 60, 0, Math.PI * 2);
      ctx.stroke();
    }
  };

  useEffect(() => {
    drawSceneTemplate(selectedScene);
  }, [selectedScene]);

  const getCanvasCoordinates = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };

  const startDrawing = (e) => {
    const { x, y } = getCanvasCoordinates(e);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (selectedTool === 'stamp') {
      ctx.font = '48px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(selectedStamp, x, y);
      playClickSound();
      return;
    }

    setIsDrawing(true);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = selectedTool === 'eraser' ? '#ffffff' : selectedColor;
    ctx.lineWidth = selectedTool === 'eraser' ? brushSize * 2 : brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  };

  const draw = (e) => {
    if (!isDrawing || selectedTool === 'stamp') return;
    const { x, y } = getCanvasCoordinates(e);
    const ctx = canvasRef.current.getContext('2d');
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleClear = () => {
    playClickSound();
    drawSceneTemplate(selectedScene);
  };

  const handleDownload = () => {
    playCorrectSound();
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = `time-travel-drawing-${selectedScene}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const handleBack = () => {
    playClickSound();
    stopSpeech();
    onBack();
  };

  return (
    <div className="coloring-book-page animate-pop" role="region" aria-label="Historical Coloring Book">
      <div className="coloring-header">
        <div>
          <h1 className="coloring-title">🎨 Historical Coloring Book</h1>
          <p className="coloring-subtitle">Color scenes, add historical stickers, and save your art!</p>
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

      <div className="scene-picker-row" role="tablist" aria-label="Scene templates">
        {SCENES.map(scene => (
          <button
            key={scene.id}
            className={`scene-btn ${selectedScene === scene.id ? 'active-scene' : ''}`}
            onClick={() => { playClickSound(); setSelectedScene(scene.id); }}
            role="tab"
            aria-selected={selectedScene === scene.id}
          >
            <span>{scene.name}</span>
          </button>
        ))}
      </div>

      <div className="coloring-studio-body">
        <div className="canvas-wrapper">
          <canvas
            ref={canvasRef}
            width={600}
            height={400}
            className="drawing-canvas"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            aria-label="Drawing canvas"
          />
        </div>

        <div className="tools-sidebar">
          {/* Tool Selector */}
          <div className="tool-toggle-row">
            <button
              className={`tool-icon-btn ${selectedTool === 'brush' ? 'active' : ''}`}
              onClick={() => setSelectedTool('brush')}
              title="Paint Brush"
              aria-label="Paint Brush"
            >
              🖌️
            </button>
            <button
              className={`tool-icon-btn ${selectedTool === 'eraser' ? 'active' : ''}`}
              onClick={() => setSelectedTool('eraser')}
              title="Eraser"
              aria-label="Eraser"
            >
              🧹
            </button>
            <button
              className={`tool-icon-btn ${selectedTool === 'stamp' ? 'active' : ''}`}
              onClick={() => setSelectedTool('stamp')}
              title="Sticker Stamp"
              aria-label="Sticker Stamp"
            >
              ⭐
            </button>
          </div>

          {/* Color Palette */}
          {selectedTool !== 'stamp' && (
            <div className="palette-grid" role="group" aria-label="Color palette">
              {COLOR_PALETTE.map(color => (
                <button
                  key={color}
                  className={`color-swatch ${selectedColor === color ? 'selected' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => { setSelectedTool('brush'); setSelectedColor(color); }}
                  aria-label={`Color ${color}`}
                />
              ))}
            </div>
          )}

          {/* Stamp Picker */}
          {selectedTool === 'stamp' && (
            <div className="stamps-grid" role="group" aria-label="Historical stickers">
              {STAMPS.map(stamp => (
                <button
                  key={stamp}
                  className={`stamp-btn ${selectedStamp === stamp ? 'selected' : ''}`}
                  onClick={() => setSelectedStamp(stamp)}
                  aria-label={`Stamp ${stamp}`}
                >
                  {stamp}
                </button>
              ))}
            </div>
          )}

          {/* Brush Sizes */}
          {selectedTool !== 'stamp' && (
            <div className="brush-size-row">
              <button className={`size-btn ${brushSize === 6 ? 'active' : ''}`} onClick={() => setBrushSize(6)}>•</button>
              <button className={`size-btn ${brushSize === 14 ? 'active' : ''}`} onClick={() => setBrushSize(14)}>●</button>
              <button className={`size-btn ${brushSize === 26 ? 'active' : ''}`} onClick={() => setBrushSize(26)}>⬤</button>
            </div>
          )}

          {/* Canvas Actions */}
          <div className="canvas-action-btns">
            <button className="nav-btn clear-btn" onClick={handleClear} title="Clear Drawing">
              🗑️ Clear
            </button>
            <button className="start-btn save-btn" onClick={handleDownload} title="Save Picture">
              💾 Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
