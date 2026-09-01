import React, { useRef, useState, useEffect } from 'react';
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
  { id: 'dinosaurs', name: '1. T-Rex & Brachiosaurus', icon: '🦖' },
  { id: 'ice-age', name: '2. Woolly Mammoth', icon: '🦣' },
  { id: 'egypt', name: '3. Pyramids & Sphinx', icon: '🛕' },
  { id: 'greece', name: '4. Greece Parthenon', icon: '🏛️' },
  { id: 'rome', name: '5. Roman Colosseum', icon: '🏟️' },
  { id: 'maya', name: '6. Maya Jungle Temple', icon: '🌴' },
  { id: 'middle-ages', name: '7. Castle & Knight', icon: '🏰' },
  { id: 'japan', name: '8. Pagoda & Mt. Fuji', icon: '🏯' },
  { id: 'pirates', name: '9. Pirate Ship & Treasure', icon: '🏴‍☠️' },
  { id: 'renaissance', name: '10. Da Vinci Flying Glider', icon: '🔭' },
  { id: 'wild-west', name: '11. Covered Wagon & Cowboy', icon: '🤠' },
  { id: 'industrial', name: '12. Steam Train Bridge', icon: '🚂' },
  { id: 'aviation', name: '13. Wright Brothers Biplane', icon: '🛩️' },
  { id: 'retro', name: '14. Retro Guitar & TV', icon: '🎸' },
  { id: 'space-age', name: '15. Apollo Moon Landing', icon: '🚀' }
];

export default function ColoringBook({ onBack }) {
  const canvasRef = useRef(null);
  const [selectedColor, setSelectedColor] = useState('#ef4444');
  const [brushSize, setBrushSize] = useState(12);
  const [selectedTool, setSelectedTool] = useState('brush'); // 'brush', 'eraser', 'stamp'
  const [selectedStamp, setSelectedStamp] = useState('🦖');
  const [selectedScene, setSelectedScene] = useState('dinosaurs');
  const [isDrawing, setIsDrawing] = useState(false);

  // Draw rich detailed scene template on canvas
  const drawSceneTemplate = (sceneId) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Clear canvas with white background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 3.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // 1. Dinosaurs: T-Rex & Brachiosaurus & Volcano
    if (sceneId === 'dinosaurs') {
      // Ground
      ctx.beginPath();
      ctx.moveTo(0, 350);
      ctx.quadraticCurveTo(300, 330, 600, 350);
      ctx.stroke();

      // Volcano
      ctx.beginPath();
      ctx.moveTo(380, 340);
      ctx.lineTo(470, 150);
      ctx.lineTo(510, 150);
      ctx.lineTo(600, 340);
      ctx.stroke();

      // Smoke / Lava clouds
      ctx.beginPath();
      ctx.arc(480, 120, 25, 0, Math.PI * 2);
      ctx.arc(510, 95, 30, 0, Math.PI * 2);
      ctx.stroke();

      // T-Rex Body Outline (Left)
      ctx.beginPath();
      ctx.moveTo(60, 340); // Foot
      ctx.lineTo(80, 270); // Leg
      ctx.lineTo(130, 240); // Hip
      ctx.lineTo(180, 190); // Neck
      ctx.lineTo(240, 170); // Snout
      ctx.lineTo(240, 200); // Upper jaw
      ctx.lineTo(190, 210); // Mouth open
      ctx.lineTo(220, 230); // Lower jaw
      ctx.lineTo(170, 260); // Throat & Chest
      ctx.lineTo(190, 275); // Tiny Arm
      ctx.lineTo(165, 290);
      ctx.lineTo(140, 340); // Front leg
      ctx.stroke();

      // T-Rex Teeth & Eye
      ctx.beginPath();
      ctx.arc(200, 185, 5, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(200, 205);
      ctx.lineTo(210, 215);
      ctx.lineTo(220, 205);
      ctx.stroke();

      // Brachiosaurus (Middle-Right)
      ctx.beginPath();
      ctx.moveTo(270, 340); // Back foot
      ctx.lineTo(310, 270); // Body back
      ctx.lineTo(330, 140); // Long neck
      ctx.lineTo(340, 90);  // Head top
      ctx.lineTo(360, 100); // Snout
      ctx.lineTo(350, 140); // Front of neck
      ctx.lineTo(380, 270); // Chest
      ctx.lineTo(370, 340); // Front foot
      ctx.stroke();

      // Brachiosaurus Eye & Spots
      ctx.beginPath();
      ctx.arc(345, 98, 4, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(330, 280, 10, 0, Math.PI * 2);
      ctx.arc(350, 300, 8, 0, Math.PI * 2);
      ctx.stroke();

      // Pterodactyl flying in sky
      ctx.beginPath();
      ctx.moveTo(80, 80);
      ctx.lineTo(120, 50);
      ctx.lineTo(140, 75);
      ctx.lineTo(180, 55);
      ctx.lineTo(130, 90);
      ctx.closePath();
      ctx.stroke();
    }

    // 2. Ice Age: Woolly Mammoth & Baby Mammoth & Glacier Mountains
    else if (sceneId === 'ice-age') {
      // Snowy ground
      ctx.beginPath();
      ctx.moveTo(0, 340);
      ctx.quadraticCurveTo(200, 350, 600, 330);
      ctx.stroke();

      // Jagged Ice Mountains
      ctx.beginPath();
      ctx.moveTo(40, 340);
      ctx.lineTo(160, 110);
      ctx.lineTo(280, 340);
      ctx.lineTo(400, 80);
      ctx.lineTo(540, 330);
      ctx.stroke();

      // Mountain snow caps
      ctx.beginPath();
      ctx.moveTo(130, 170);
      ctx.lineTo(160, 190);
      ctx.lineTo(190, 170);
      ctx.moveTo(370, 140);
      ctx.lineTo(400, 170);
      ctx.lineTo(430, 140);
      ctx.stroke();

      // Big Woolly Mammoth (Center)
      ctx.beginPath();
      ctx.arc(280, 210, 45, Math.PI, 0); // Hairy head & dome
      ctx.moveTo(235, 210);
      ctx.quadraticCurveTo(170, 230, 160, 330); // Back
      ctx.lineTo(200, 330); // Back leg
      ctx.lineTo(230, 280); // Belly
      ctx.lineTo(260, 330); // Front leg
      ctx.lineTo(290, 330);
      ctx.lineTo(310, 250); // Chest
      ctx.lineTo(335, 290); // Trunk curving down
      ctx.lineTo(350, 260); // Trunk tip
      ctx.lineTo(320, 210); // Face
      ctx.stroke();

      // Long Curved Tusk
      ctx.beginPath();
      ctx.moveTo(305, 235);
      ctx.quadraticCurveTo(370, 270, 360, 190);
      ctx.stroke();

      // Mammoth Eye & Fur Texture
      ctx.beginPath();
      ctx.arc(290, 205, 4, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(190, 250); ctx.lineTo(195, 270);
      ctx.moveTo(215, 245); ctx.lineTo(220, 265);
      ctx.stroke();

      // Snowflakes in sky
      const flakes = [[80, 60], [180, 50], [500, 50], [540, 120]];
      flakes.forEach(([fx, fy]) => {
        ctx.beginPath();
        ctx.moveTo(fx - 10, fy); ctx.lineTo(fx + 10, fy);
        ctx.moveTo(fx, fy - 10); ctx.lineTo(fx, fy + 10);
        ctx.stroke();
      });
    }

    // 3. Ancient Egypt: Great Pyramids, Sphinx & Nile River
    else if (sceneId === 'egypt') {
      // Nile River waves
      ctx.beginPath();
      ctx.moveTo(0, 340);
      ctx.bezierCurveTo(200, 370, 400, 320, 600, 350);
      ctx.moveTo(0, 370);
      ctx.bezierCurveTo(200, 400, 400, 350, 600, 380);
      ctx.stroke();

      // Giant Pyramid (Left)
      ctx.beginPath();
      ctx.moveTo(40, 340);
      ctx.lineTo(220, 110);
      ctx.lineTo(400, 340);
      ctx.closePath();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(220, 110);
      ctx.lineTo(250, 340);
      ctx.stroke();

      // Second Pyramid (Background Right)
      ctx.beginPath();
      ctx.moveTo(320, 340);
      ctx.lineTo(460, 160);
      ctx.lineTo(580, 340);
      ctx.closePath();
      ctx.stroke();

      // The Great Sphinx (Foreground Right)
      ctx.beginPath();
      // Body
      ctx.moveTo(340, 340);
      ctx.lineTo(340, 280);
      ctx.lineTo(440, 280);
      ctx.lineTo(470, 340);
      // Head & Nemes headdress
      ctx.arc(430, 240, 25, 0, Math.PI * 2);
      ctx.moveTo(405, 235); ctx.lineTo(400, 270);
      ctx.moveTo(455, 235); ctx.lineTo(460, 270);
      ctx.stroke();

      // Blazing Egyptian Sun
      ctx.beginPath();
      ctx.arc(100, 70, 35, 0, Math.PI * 2);
      ctx.stroke();
      for (let i = 0; i < 8; i++) {
        const ang = (i * Math.PI) / 4;
        ctx.beginPath();
        ctx.moveTo(100 + Math.cos(ang) * 45, 70 + Math.sin(ang) * 45);
        ctx.lineTo(100 + Math.cos(ang) * 60, 70 + Math.sin(ang) * 60);
        ctx.stroke();
      }
    }

    // 4. Ancient Greece: Parthenon Temple & Olympic Torch
    else if (sceneId === 'greece') {
      // Acropolis Hill
      ctx.beginPath();
      ctx.moveTo(0, 350);
      ctx.quadraticCurveTo(300, 290, 600, 340);
      ctx.stroke();

      // Parthenon Steps (3 tiers)
      ctx.strokeRect(100, 270, 400, 15);
      ctx.strokeRect(120, 255, 360, 15);
      ctx.strokeRect(140, 240, 320, 15);

      // Columns (6 pillars)
      for (let i = 0; i < 6; i++) {
        const cx = 160 + i * 54;
        ctx.strokeRect(cx, 130, 24, 110);
      }

      // Architrave & Roof Pediment (Triangle)
      ctx.strokeRect(140, 110, 320, 20);
      ctx.beginPath();
      ctx.moveTo(130, 110);
      ctx.lineTo(300, 45);
      ctx.lineTo(470, 110);
      ctx.closePath();
      ctx.stroke();

      // Olympic Torch (Left foreground)
      ctx.beginPath();
      ctx.moveTo(50, 350);
      ctx.lineTo(60, 260);
      ctx.lineTo(75, 230);
      ctx.lineTo(40, 230);
      ctx.lineTo(55, 260);
      ctx.stroke();
      // Torch Flame
      ctx.beginPath();
      ctx.moveTo(45, 225);
      ctx.quadraticCurveTo(60, 170, 58, 195);
      ctx.quadraticCurveTo(75, 175, 68, 225);
      ctx.stroke();
    }

    // 5. Ancient Rome: Roman Colosseum & Chariot
    else if (sceneId === 'rome') {
      // Ground
      ctx.beginPath();
      ctx.moveTo(0, 350);
      ctx.lineTo(600, 350);
      ctx.stroke();

      // Colosseum Outer Oval & 3 Tiers of Arches
      ctx.beginPath();
      ctx.ellipse(300, 220, 260, 120, 0, Math.PI, 0);
      ctx.stroke();

      // Bottom Tier Arches
      for (let i = 0; i < 8; i++) {
        const ax = 90 + i * 54;
        ctx.strokeRect(ax, 280, 36, 60);
        ctx.beginPath();
        ctx.arc(ax + 18, 280, 18, Math.PI, 0);
        ctx.stroke();
      }

      // Middle Tier Arches
      for (let i = 0; i < 8; i++) {
        const ax = 100 + i * 52;
        ctx.strokeRect(ax, 200, 32, 50);
        ctx.beginPath();
        ctx.arc(ax + 16, 200, 16, Math.PI, 0);
        ctx.stroke();
      }

      // Top Wall & Shield
      ctx.strokeRect(100, 120, 400, 30);

      // Roman Curved Shield (Foreground Right)
      ctx.beginPath();
      ctx.roundRect(470, 240, 70, 100, 15);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(470, 290); ctx.lineTo(540, 290);
      ctx.moveTo(505, 240); ctx.lineTo(505, 340);
      ctx.arc(505, 290, 16, 0, Math.PI * 2);
      ctx.stroke();
    }

    // 6. Ancient Maya: Stepped Temple Pyramid & Jungle
    else if (sceneId === 'maya') {
      // Jungle floor
      ctx.beginPath();
      ctx.moveTo(0, 350);
      ctx.lineTo(600, 350);
      ctx.stroke();

      // Stepped Pyramid (5 tiers)
      const tiers = [
        { y: 300, w: 420, h: 50 },
        { y: 250, w: 340, h: 50 },
        { y: 200, w: 260, h: 50 },
        { y: 150, w: 180, h: 50 },
        { y: 100, w: 100, h: 50 } // Top temple
      ];
      tiers.forEach(t => {
        const x = (600 - t.w) / 2;
        ctx.strokeRect(x, t.y, t.w, t.h);
      });

      // Center Staircase
      ctx.strokeRect(265, 100, 70, 250);
      for (let sy = 115; sy < 350; sy += 18) {
        ctx.beginPath();
        ctx.moveTo(265, sy);
        ctx.lineTo(335, sy);
        ctx.stroke();
      }

      // Jungle Palm Fronds (Left & Right)
      ctx.beginPath();
      ctx.moveTo(20, 350); ctx.quadraticCurveTo(60, 200, 40, 80);
      ctx.moveTo(580, 350); ctx.quadraticCurveTo(540, 200, 560, 80);
      ctx.stroke();
    }

    // 7. Middle Ages: Medieval Castle & Brave Knight
    else if (sceneId === 'middle-ages') {
      // Hill
      ctx.beginPath();
      ctx.moveTo(0, 340);
      ctx.lineTo(600, 340);
      ctx.stroke();

      // Main Castle Wall
      ctx.strokeRect(180, 190, 240, 150);

      // Towers (Left & Right)
      ctx.strokeRect(130, 110, 60, 230);
      ctx.strokeRect(410, 110, 60, 230);

      // Tower battlements (crenels)
      ctx.strokeRect(125, 90, 70, 20);
      ctx.strokeRect(405, 90, 70, 20);

      // Castle Gate & Drawbridge
      ctx.beginPath();
      ctx.arc(300, 340, 45, Math.PI, 0);
      ctx.stroke();

      // Flying Royal Pennant Flag
      ctx.beginPath();
      ctx.moveTo(160, 90); ctx.lineTo(160, 40);
      ctx.lineTo(210, 65); ctx.lineTo(160, 90);
      ctx.stroke();

      // Knight Shield & Sword (Foreground)
      ctx.beginPath();
      ctx.moveTo(80, 240);
      ctx.lineTo(120, 240);
      ctx.lineTo(120, 300);
      ctx.lineTo(100, 330);
      ctx.lineTo(80, 300);
      ctx.closePath();
      ctx.stroke();
    }

    // 8. Feudal Japan: Pagoda Castle & Mount Fuji
    else if (sceneId === 'japan') {
      // Mount Fuji in Background
      ctx.beginPath();
      ctx.moveTo(60, 330);
      ctx.lineTo(250, 90);
      ctx.lineTo(290, 90);
      ctx.lineTo(480, 330);
      ctx.stroke();
      // Fuji Snow Cap
      ctx.beginPath();
      ctx.moveTo(210, 150);
      ctx.lineTo(250, 180);
      ctx.lineTo(290, 150);
      ctx.lineTo(330, 180);
      ctx.stroke();

      // Japanese Pagoda (3 Tiers with curved roofs)
      // Tier 1 Roof
      ctx.beginPath();
      ctx.moveTo(340, 300);
      ctx.quadraticCurveTo(450, 280, 560, 300);
      ctx.lineTo(540, 340);
      ctx.lineTo(360, 340);
      ctx.closePath();
      ctx.stroke();

      // Tier 2 Roof
      ctx.beginPath();
      ctx.moveTo(360, 220);
      ctx.quadraticCurveTo(450, 200, 540, 220);
      ctx.stroke();
      ctx.strokeRect(390, 225, 120, 65);

      // Tier 3 Roof
      ctx.beginPath();
      ctx.moveTo(380, 150);
      ctx.quadraticCurveTo(450, 130, 520, 150);
      ctx.stroke();
      ctx.strokeRect(410, 155, 80, 55);

      // Pagoda Spire
      ctx.beginPath();
      ctx.moveTo(450, 135);
      ctx.lineTo(450, 70);
      ctx.stroke();

      // Cherry Blossom Branch (Left)
      ctx.beginPath();
      ctx.moveTo(0, 80);
      ctx.quadraticCurveTo(80, 120, 140, 90);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(80, 120, 10, 0, Math.PI * 2);
      ctx.arc(120, 85, 10, 0, Math.PI * 2);
      ctx.arc(140, 115, 10, 0, Math.PI * 2);
      ctx.stroke();
    }

    // 9. Pirate Age: Pirate Galleon Ship & Treasure Chest
    else if (sceneId === 'pirates') {
      // Ocean waves
      ctx.beginPath();
      ctx.moveTo(0, 320);
      for (let wx = 0; wx < 600; wx += 60) {
        ctx.quadraticCurveTo(wx + 30, 300, wx + 60, 320);
      }
      ctx.stroke();

      // Pirate Galleon Ship Hull
      ctx.beginPath();
      ctx.moveTo(140, 250);
      ctx.lineTo(480, 250);
      ctx.quadraticCurveTo(460, 320, 380, 340);
      ctx.lineTo(200, 340);
      ctx.quadraticCurveTo(130, 310, 140, 250);
      ctx.stroke();

      // Portholes / Cannons
      for (let pi = 0; pi < 5; pi++) {
        ctx.beginPath();
        ctx.arc(200 + pi * 55, 290, 8, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Masts & Sails
      // Center Mast
      ctx.beginPath();
      ctx.moveTo(310, 250); ctx.lineTo(310, 60);
      ctx.stroke();
      // Billowing Sail
      ctx.beginPath();
      ctx.moveTo(240, 100);
      ctx.quadraticCurveTo(310, 130, 380, 100);
      ctx.lineTo(370, 210);
      ctx.quadraticCurveTo(310, 235, 250, 210);
      ctx.closePath();
      ctx.stroke();

      // Skull & Crossbones Flag
      ctx.strokeRect(310, 60, 60, 35);
      ctx.beginPath();
      ctx.arc(335, 75, 7, 0, Math.PI * 2);
      ctx.stroke();

      // Desert Island & Treasure Chest (Right foreground)
      ctx.beginPath();
      ctx.moveTo(480, 350); ctx.quadraticCurveTo(550, 320, 600, 350);
      ctx.stroke();
      ctx.strokeRect(500, 315, 60, 35);
      ctx.beginPath();
      ctx.arc(530, 315, 30, Math.PI, 0);
      ctx.stroke();
    }

    // 10. Renaissance: Da Vinci Flying Machine & Telescope
    else if (sceneId === 'renaissance') {
      // Leonardo da Vinci's Mechanical Wings (Ornithopter)
      // Center fuselage / pilot basket
      ctx.strokeRect(260, 180, 80, 60);

      // Left Wing Ribs
      ctx.beginPath();
      ctx.moveTo(260, 190);
      ctx.quadraticCurveTo(120, 100, 40, 160);
      ctx.quadraticCurveTo(150, 240, 260, 220);
      ctx.stroke();
      // Wing struts
      ctx.beginPath();
      ctx.moveTo(260, 190); ctx.lineTo(120, 160);
      ctx.moveTo(260, 200); ctx.lineTo(80, 180);
      ctx.stroke();

      // Right Wing Ribs
      ctx.beginPath();
      ctx.moveTo(340, 190);
      ctx.quadraticCurveTo(480, 100, 560, 160);
      ctx.quadraticCurveTo(450, 240, 340, 220);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(340, 190); ctx.lineTo(480, 160);
      ctx.moveTo(340, 200); ctx.lineTo(520, 180);
      ctx.stroke();

      // Brass Telescope on Tripod (Right foreground)
      ctx.beginPath();
      // Tube
      ctx.moveTo(420, 320); ctx.lineTo(520, 250);
      ctx.lineTo(530, 265); ctx.lineTo(430, 335);
      ctx.closePath();
      // Tripod legs
      ctx.moveTo(445, 320); ctx.lineTo(410, 380);
      ctx.moveTo(445, 320); ctx.lineTo(450, 380);
      ctx.moveTo(445, 320); ctx.lineTo(480, 380);
      ctx.stroke();

      // Painter's Palette (Left foreground)
      ctx.beginPath();
      ctx.arc(100, 320, 40, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(85, 310, 5, 0, Math.PI * 2);
      ctx.arc(105, 305, 5, 0, Math.PI * 2);
      ctx.arc(120, 320, 5, 0, Math.PI * 2);
      ctx.stroke();
    }

    // 11. Wild West: Covered Pioneer Wagon & Cowboy
    else if (sceneId === 'wild-west') {
      // Prairie / Canyon horizon
      ctx.beginPath();
      ctx.moveTo(0, 340);
      ctx.lineTo(600, 340);
      ctx.stroke();

      // Pioneer Covered Wagon Canopy
      ctx.beginPath();
      ctx.moveTo(140, 250);
      ctx.quadraticCurveTo(240, 130, 380, 230);
      ctx.lineTo(380, 270);
      ctx.lineTo(140, 270);
      ctx.closePath();
      ctx.stroke();

      // Wagon Body Box
      ctx.strokeRect(140, 250, 240, 40);

      // Large Wooden Spoke Wheels
      // Back wheel
      ctx.beginPath();
      ctx.arc(180, 310, 35, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(145, 310); ctx.lineTo(215, 310);
      ctx.moveTo(180, 275); ctx.lineTo(180, 345);
      ctx.stroke();

      // Front wheel
      ctx.beginPath();
      ctx.arc(340, 315, 30, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(310, 315); ctx.lineTo(370, 315);
      ctx.moveTo(340, 285); ctx.lineTo(340, 345);
      ctx.stroke();

      // Cowboy Hat & Sheriff Star (Right foreground)
      ctx.beginPath();
      // Hat brim
      ctx.ellipse(490, 270, 50, 14, 0, 0, Math.PI * 2);
      ctx.stroke();
      // Hat crown
      ctx.beginPath();
      ctx.moveTo(460, 270);
      ctx.lineTo(465, 225);
      ctx.quadraticCurveTo(490, 235, 515, 225);
      ctx.lineTo(520, 270);
      ctx.stroke();

      // Sheriff Star
      ctx.beginPath();
      ctx.arc(490, 330, 20, 0, Math.PI * 2);
      ctx.stroke();
    }

    // 12. Industrial Revolution: Steam Train Locomotive on Bridge
    else if (sceneId === 'industrial') {
      // Stone Viaduct Bridge Arches
      ctx.strokeRect(0, 280, 600, 15);
      for (let bi = 0; bi < 4; bi++) {
        const bx = 40 + bi * 140;
        ctx.strokeRect(bx, 295, 30, 70);
        ctx.beginPath();
        ctx.arc(bx + 70, 295, 40, Math.PI, 0);
        ctx.stroke();
      }

      // Steam Locomotive Engine
      // Boiler
      ctx.strokeRect(160, 180, 220, 90);
      // Cab
      ctx.strokeRect(380, 130, 100, 140);
      // Cab Window
      ctx.strokeRect(405, 150, 45, 45);

      // Smokestack & Cowcatcher
      ctx.strokeRect(185, 120, 35, 60);
      ctx.beginPath();
      ctx.moveTo(170, 120); ctx.lineTo(235, 120);
      ctx.stroke();

      // Cowcatcher / grill
      ctx.beginPath();
      ctx.moveTo(160, 270); ctx.lineTo(110, 270); ctx.lineTo(160, 220);
      ctx.stroke();

      // Big Billowing Steam Clouds
      ctx.beginPath();
      ctx.arc(200, 80, 25, 0, Math.PI * 2);
      ctx.arc(245, 55, 35, 0, Math.PI * 2);
      ctx.arc(310, 40, 40, 0, Math.PI * 2);
      ctx.arc(375, 45, 30, 0, Math.PI * 2);
      ctx.stroke();

      // Train Wheels with Drive Rod
      for (let ti = 0; ti < 3; ti++) {
        ctx.beginPath();
        ctx.arc(220 + ti * 90, 270, 24, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.strokeRect(200, 265, 200, 10);
    }

    // 13. Early Aviation: Wright Brothers 1903 Biplane
    else if (sceneId === 'aviation') {
      // Kitty Hawk Sand Dunes
      ctx.beginPath();
      ctx.moveTo(0, 350);
      ctx.quadraticCurveTo(200, 310, 600, 340);
      ctx.stroke();

      // Dual Biplane Wings (Top & Bottom)
      // Top Wing
      ctx.strokeRect(100, 120, 400, 24);
      // Bottom Wing
      ctx.strokeRect(100, 200, 400, 24);

      // Wing Struts / Wire Pillars
      for (let wi = 0; wi < 6; wi++) {
        const wx = 120 + wi * 70;
        ctx.beginPath();
        ctx.moveTo(wx, 144); ctx.lineTo(wx, 200);
        ctx.stroke();
      }

      // Propeller Spinning (Center)
      ctx.beginPath();
      ctx.arc(300, 172, 35, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(270, 172); ctx.lineTo(330, 172);
      ctx.moveTo(300, 142); ctx.lineTo(300, 202);
      ctx.stroke();

      // Pilot Cockpit & Goggles (Center)
      ctx.beginPath();
      ctx.arc(280, 190, 15, 0, Math.PI * 2); // Pilot Head
      ctx.stroke();
      // Goggles
      ctx.strokeRect(270, 185, 10, 8);
      ctx.strokeRect(283, 185, 10, 8);

      // Tail Rudder (Left)
      ctx.strokeRect(40, 140, 60, 60);
    }

    // 14. 1960s Retro: Electric Guitar & Vintage Box TV
    else if (sceneId === 'retro') {
      // Vintage TV (Left)
      ctx.strokeRect(40, 130, 240, 180);
      // TV Screen with curved glass
      ctx.beginPath();
      ctx.roundRect(60, 150, 150, 135, 20);
      ctx.stroke();
      // TV Knobs & Speaker Slots
      ctx.beginPath();
      ctx.arc(245, 175, 14, 0, Math.PI * 2);
      ctx.arc(245, 220, 14, 0, Math.PI * 2);
      ctx.stroke();
      // Rabbit Ear Antennas
      ctx.beginPath();
      ctx.moveTo(160, 130); ctx.lineTo(100, 50);
      ctx.moveTo(160, 130); ctx.lineTo(220, 45);
      ctx.stroke();

      // Retro Rock & Roll Electric Guitar (Right)
      // Guitar Body
      ctx.beginPath();
      ctx.ellipse(450, 260, 65, 85, 0, 0, Math.PI * 2);
      ctx.stroke();
      // Soundhole / Pickguard
      ctx.beginPath();
      ctx.arc(450, 240, 20, 0, Math.PI * 2);
      ctx.stroke();

      // Guitar Neck & Headstock
      ctx.strokeRect(440, 80, 20, 140);
      ctx.strokeRect(430, 40, 40, 40);
      // Tuning Pegs
      for (let gi = 0; gi < 3; gi++) {
        ctx.beginPath();
        ctx.arc(425, 50 + gi * 12, 4, 0, Math.PI * 2);
        ctx.arc(475, 50 + gi * 12, 4, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Musical Notes in air
      const notes = [[320, 80], [360, 120], [530, 140]];
      notes.forEach(([nx, ny]) => {
        ctx.beginPath();
        ctx.arc(nx, ny + 15, 8, 0, Math.PI * 2);
        ctx.moveTo(nx + 8, ny + 15); ctx.lineTo(nx + 8, ny);
        ctx.lineTo(nx + 20, ny); ctx.lineTo(nx + 20, ny + 15);
        ctx.stroke();
      });
    }

    // 15. Space Age: Apollo Moon Landing, Astronaut & Earth
    else if (sceneId === 'space-age') {
      // Moon Horizon & Craters
      ctx.beginPath();
      ctx.moveTo(0, 310);
      ctx.quadraticCurveTo(300, 280, 600, 310);
      ctx.stroke();

      // Moon Craters
      ctx.beginPath();
      ctx.ellipse(120, 345, 45, 15, 0, 0, Math.PI * 2);
      ctx.ellipse(460, 335, 60, 18, 0, 0, Math.PI * 2);
      ctx.ellipse(280, 365, 35, 10, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Planet Earth in Sky (Top Right)
      ctx.beginPath();
      ctx.arc(480, 80, 45, 0, Math.PI * 2);
      ctx.stroke();
      // Continents on Earth
      ctx.beginPath();
      ctx.arc(470, 75, 18, 0, Math.PI);
      ctx.stroke();

      // Apollo Lunar Module (Center Left)
      // Top Ascent Stage
      ctx.strokeRect(180, 140, 120, 80);
      // Porthole Window
      ctx.beginPath();
      ctx.arc(220, 170, 12, 0, Math.PI * 2);
      ctx.arc(260, 170, 12, 0, Math.PI * 2);
      ctx.stroke();
      // Octagonal Descent Stage & Legs
      ctx.strokeRect(160, 220, 160, 45);
      // 4 Landing Gear Legs
      ctx.beginPath();
      ctx.moveTo(170, 265); ctx.lineTo(130, 310); // Left leg
      ctx.moveTo(310, 265); ctx.lineTo(350, 310); // Right leg
      ctx.stroke();
      // Footpads
      ctx.strokeRect(115, 308, 30, 6);
      ctx.strokeRect(335, 308, 30, 6);

      // Astronaut & Flag (Right)
      // Flagpole & American Flag
      ctx.beginPath();
      ctx.moveTo(400, 310); ctx.lineTo(400, 170);
      ctx.stroke();
      ctx.strokeRect(400, 170, 60, 40);

      // Astronaut Suit (Center-Right)
      ctx.beginPath();
      ctx.arc(360, 240, 16, 0, Math.PI * 2); // Helmet
      ctx.stroke();
      // Visor
      ctx.beginPath();
      ctx.arc(360, 240, 9, 0, Math.PI * 2);
      ctx.stroke();
      // Suit Body & Legs
      ctx.strokeRect(348, 256, 24, 34);
      ctx.beginPath();
      ctx.moveTo(354, 290); ctx.lineTo(352, 315);
      ctx.moveTo(366, 290); ctx.lineTo(368, 315);
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
          <h1 className="coloring-title">🎨 15 Era Historical Coloring Studio</h1>
          <p className="coloring-subtitle">Choose any of the 15 eras below, paint, add stickers, and save!</p>
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
              💾 Save Art
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
