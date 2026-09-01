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
  const canvasRef = useRef(null);
  const templateImgRef = useRef(null);
  const [selectedColor, setSelectedColor] = useState('#ef4444');
  const [brushSize, setBrushSize] = useState(16);
  const [selectedTool, setSelectedTool] = useState('brush'); // 'brush', 'eraser', 'stamp'
  const [selectedStamp, setSelectedStamp] = useState('🦖');
  const [selectedScene, setSelectedScene] = useState('dinosaurs');
  const [isDrawing, setIsDrawing] = useState(false);

  // Redraw template onto canvas preserving line art
  const renderTemplateOnCanvas = useCallback((ctx, img) => {
    if (!ctx || !img) return;
    const canvas = ctx.canvas;
    const padding = 12;
    const availW = canvas.width - padding * 2;
    const availH = canvas.height - padding * 2;
    const scale = Math.min(availW / img.width, availH / img.height);
    const drawW = img.width * scale;
    const drawH = img.height * scale;
    const drawX = (canvas.width - drawW) / 2;
    const drawY = (canvas.height - drawH) / 2;

    ctx.save();
    // Multiply blend ensures black lines stay perfectly visible over painted colors!
    ctx.globalCompositeOperation = 'multiply';
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
    ctx.restore();
  }, []);

  // Initialize and load new scene
  const loadSceneImage = useCallback((sceneId) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Fill white background
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const img = new Image();
    const baseUrl = import.meta.env.BASE_URL || '/';
    img.src = `${baseUrl}coloring/${sceneId}.png`;

    img.onload = () => {
      templateImgRef.current = img;
      renderTemplateOnCanvas(ctx, img);
    };

    img.onerror = () => {
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 4;
      ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);
      ctx.font = '24px Nunito, sans-serif';
      ctx.fillStyle = '#1e293b';
      ctx.textAlign = 'center';
      ctx.fillText(`Coloring Page: ${sceneId}`, canvas.width / 2, canvas.height / 2);
    };
  }, [renderTemplateOnCanvas]);

  useEffect(() => {
    loadSceneImage(selectedScene);
  }, [selectedScene, loadSceneImage]);

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
      ctx.save();
      ctx.globalCompositeOperation = 'source-over';
      ctx.font = '48px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(selectedStamp, x, y);
      ctx.restore();
      
      // Re-overlay template lines
      if (templateImgRef.current) {
        renderTemplateOnCanvas(ctx, templateImgRef.current);
      }
      playClickSound();
      return;
    }

    setIsDrawing(true);
    ctx.beginPath();
    ctx.moveTo(x, y);

    if (selectedTool === 'eraser') {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = brushSize * 2;
    } else {
      // Magic coloring: multiply blend colors without covering black lines!
      ctx.globalCompositeOperation = 'multiply';
      ctx.strokeStyle = selectedColor;
      ctx.lineWidth = brushSize;
    }

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
    if (isDrawing) {
      setIsDrawing(false);
      const canvas = canvasRef.current;
      if (canvas && templateImgRef.current) {
        const ctx = canvas.getContext('2d');
        // Refresh black line art overlay on top of paint
        renderTemplateOnCanvas(ctx, templateImgRef.current);
      }
    }
  };

  const handleClear = () => {
    playClickSound();
    loadSceneImage(selectedScene);
  };

  const handleDownload = () => {
    playCorrectSound();
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = `time-travel-coloring-${selectedScene}.png`;
    link.href = canvas.toDataURL('image/png');
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
              <button className={`size-btn ${brushSize === 8 ? 'active' : ''}`} onClick={() => setBrushSize(8)}>•</button>
              <button className={`size-btn ${brushSize === 16 ? 'active' : ''}`} onClick={() => setBrushSize(16)}>●</button>
              <button className={`size-btn ${brushSize === 28 ? 'active' : ''}`} onClick={() => setBrushSize(28)}>⬤</button>
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
