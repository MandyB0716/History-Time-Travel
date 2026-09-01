import React, { useRef, useState, useEffect, useCallback } from 'react';
import './ColoringBook.css';
import { playClickSound, playCorrectSound } from '../../utils/audio';
import { stopSpeech } from '../../utils/speech';

const COLOR_PALETTE = [
  '#ef4444', '#f97316', '#f59e0b', '#84cc16', 
  '#10b981', '#06b6d4', '#3b82f6', '#8b5cf6', 
  '#ec4899', '#78350f', '#0f172a', '#ffffff'
];

const STAMPS = ['🦖', '🦕', '🦣', '🛕', '🏛️', '🏟️', '👑', '🏰', '🏯', '🏴‍☠️', '🔭', '🤠', '🚂', '🛩️', '🎸', '🚀', '⭐'];

const ALL_15_SCENES = [
  { id: 'dinosaurs', name: '1. Dinosaurs', icon: '🦖' },
  { id: 'ice-age', name: '2. Ice Age', icon: '🦣' },
  { id: 'egypt', name: '3. Ancient Egypt', icon: '🛕' },
  { id: 'greece', name: '4. Ancient Greece', icon: '🏛️' },
  { id: 'rome', name: '5. Ancient Rome', icon: '🏟️' },
  { id: 'maya', name: '6. Ancient Maya', icon: '🌴' },
  { id: 'middle-ages', name: '7. Middle Ages', icon: '🏰' },
  { id: 'japan', name: '8. Feudal Japan', icon: '🏯' },
  { id: 'pirates', name: '9. Pirate Age', icon: '🏴‍☠️' },
  { id: 'renaissance', name: '10. Renaissance', icon: '🔭' },
  { id: 'wild-west', name: '11. Wild West', icon: '🤠' },
  { id: 'industrial', name: '12. Industrial', icon: '🚂' },
  { id: 'aviation', name: '13. Early Aviation', icon: '🛩️' },
  { id: 'retro', name: '14. 1960s Retro', icon: '🎸' },
  { id: 'space-age', name: '15. Space Age', icon: '🚀' }
];

export default function ColoringBook({ onBack }) {
  const paintCanvasRef = useRef(null);
  const [selectedColor, setSelectedColor] = useState('#f97316');
  const [brushSize, setBrushSize] = useState(18);
  const [selectedTool, setSelectedTool] = useState('brush'); // 'brush', 'eraser', 'stamp'
  const [selectedStamp, setSelectedStamp] = useState('🦖');
  const [selectedScene, setSelectedScene] = useState('dinosaurs');
  const [isDrawing, setIsDrawing] = useState(false);

  const baseUrl = import.meta.env.BASE_URL || '/';
  const templateSrc = `${baseUrl}coloring/${selectedScene}.png`;

  // Clear paint layer on scene change
  const clearPaintCanvas = useCallback(() => {
    const canvas = paintCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, []);

  useEffect(() => {
    clearPaintCanvas();
  }, [selectedScene, clearPaintCanvas]);

  const getCanvasCoordinates = (e) => {
    const canvas = paintCanvasRef.current;
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
    const canvas = paintCanvasRef.current;
    const ctx = canvas.getContext('2d');

    if (selectedTool === 'stamp') {
      ctx.save();
      ctx.globalCompositeOperation = 'source-over';
      ctx.font = '48px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(selectedStamp, x, y);
      ctx.restore();
      playClickSound();
      return;
    }

    setIsDrawing(true);
    ctx.beginPath();
    ctx.moveTo(x, y);

    if (selectedTool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = brushSize * 2;
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = selectedColor;
      ctx.lineWidth = brushSize;
    }

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  };

  const draw = (e) => {
    if (!isDrawing || selectedTool === 'stamp') return;
    const { x, y } = getCanvasCoordinates(e);
    const ctx = paintCanvasRef.current.getContext('2d');
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleClear = () => {
    playClickSound();
    clearPaintCanvas();
  };

  const handleDownload = () => {
    playCorrectSound();
    const paintCanvas = paintCanvasRef.current;
    if (!paintCanvas) return;

    // Create export composite canvas
    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = paintCanvas.width;
    exportCanvas.height = paintCanvas.height;
    const expCtx = exportCanvas.getContext('2d');

    // 1. White background
    expCtx.fillStyle = '#ffffff';
    expCtx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);

    // 2. User Painted Layer
    expCtx.drawImage(paintCanvas, 0, 0);

    // 3. Overlay the clean template image with multiply mode
    const img = new Image();
    img.src = templateSrc;
    img.onload = () => {
      expCtx.globalCompositeOperation = 'multiply';
      const padding = 12;
      const availW = exportCanvas.width - padding * 2;
      const availH = exportCanvas.height - padding * 2;
      const scale = Math.min(availW / img.width, availH / img.height);
      const drawW = img.width * scale;
      const drawH = img.height * scale;
      const drawX = (exportCanvas.width - drawW) / 2;
      const drawY = (exportCanvas.height - drawH) / 2;

      expCtx.drawImage(img, drawX, drawY, drawW, drawH);

      const link = document.createElement('a');
      link.download = `time-travel-coloring-${selectedScene}.png`;
      link.href = exportCanvas.toDataURL('image/png');
      link.click();
    };

    img.onerror = () => {
      const link = document.createElement('a');
      link.download = `time-travel-coloring-${selectedScene}.png`;
      link.href = exportCanvas.toDataURL('image/png');
      link.click();
    };
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
          <h1 className="coloring-title">🎨 15 Era Historical Coloring Studio</h1>
          <p className="coloring-subtitle">Color with rainbow brushes, add fun stickers, and save your art!</p>
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

      {/* 15 Era Scene Picker Tabs */}
      <div className="scene-picker-row" role="tablist" aria-label="15 Historical Scene Templates">
        {ALL_15_SCENES.map(scene => (
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
        {/* Layered Canvas Container */}
        <div className="canvas-wrapper layered-canvas-box">
          {/* 1. Paint Layer (User colors here with 100% true vibrant color) */}
          <canvas
            ref={paintCanvasRef}
            width={600}
            height={400}
            className="drawing-canvas paint-layer"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            aria-label="Coloring drawing canvas"
          />

          {/* 2. Line-Art Template Overlay (Floats on top, crisp black lines, blend-mode multiply) */}
          {templateSrc && (
            <img
              src={templateSrc}
              alt={`${selectedScene} line art`}
              className="template-overlay-img"
              aria-hidden="true"
            />
          )}
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
              <button className={`size-btn ${brushSize === 8 ? 'active' : ''}`} onClick={() => setBrushSize(8)}>•</button>
              <button className={`size-btn ${brushSize === 18 ? 'active' : ''}`} onClick={() => setBrushSize(18)}>●</button>
              <button className={`size-btn ${brushSize === 32 ? 'active' : ''}`} onClick={() => setBrushSize(32)}>⬤</button>
            </div>
          )}

          {/* Canvas Actions */}
          <div className="canvas-action-btns">
            <button className="nav-btn clear-btn" onClick={handleClear} title="Clear Drawing">
              🗑️ Clear
            </button>
            <button className="start-btn save-btn" onClick={handleDownload} title="Save Picture">
              💾 Save Art
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
