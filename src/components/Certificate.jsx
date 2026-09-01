import React, { useState } from 'react';
import './Certificate.css';
import { playClickSound } from '../utils/audio';
import { stopSpeech } from '../utils/speech';

export default function Certificate({ artifacts, totalErasCount, onBack }) {
  const [studentName, setStudentName] = useState(() => {
    return localStorage.getItem('time_traveler_name') || 'Master Explorer';
  });

  const handleNameChange = (e) => {
    const val = e.target.value;
    setStudentName(val);
    try {
      localStorage.setItem('time_traveler_name', val);
    } catch {
      // ignore
    }
  };

  const handlePrint = () => {
    playClickSound();
    window.print();
  };

  const handleBack = () => {
    playClickSound();
    stopSpeech();
    onBack();
  };

  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="certificate-page animate-pop" role="region" aria-label="Explorer Certificate">
      <div className="no-print cert-screen-controls">
        <div className="cert-input-wrapper">
          <label htmlFor="explorer-name-input">👤 Time Traveler Name:</label>
          <input
            id="explorer-name-input"
            type="text"
            value={studentName}
            onChange={handleNameChange}
            placeholder="Type your name here..."
            maxLength={30}
            className="name-input"
          />
        </div>

        <div className="cert-button-group">
          <button className="start-btn print-btn" onClick={handlePrint}>
            🖨️ Print / Save Certificate
          </button>
          <button className="nav-btn" onClick={handleBack}>
            ⬅️ Back to Menu
          </button>
        </div>
      </div>

      {/* Printable Diploma Frame */}
      <div className="diploma-frame" id="printable-diploma">
        <div className="diploma-inner-border">
          <div className="diploma-corner corner-tl">⏳</div>
          <div className="diploma-corner corner-tr">🚀</div>
          <div className="diploma-corner corner-bl">🦖</div>
          <div className="diploma-corner corner-br">👑</div>

          <div className="diploma-header">
            <span className="diploma-academy">Academy of Time & History</span>
            <h1 className="diploma-title">MASTER TIME TRAVELER</h1>
            <span className="diploma-subtitle">CERTIFICATE OF HISTORICAL EXCELLENCE</span>
          </div>

          <div className="diploma-body">
            <p className="diploma-presentation">This official diploma is proudly awarded to:</p>
            <h2 className="student-recipient-name">{studentName || 'Brave Explorer'}</h2>
            <p className="diploma-accomplishment">
              for successfully navigating the chronological timeline across <strong>{totalErasCount} Historical Eras</strong>, 
              solving ancient challenges, and courageously gathering rare world artifacts.
            </p>
          </div>

          <div className="diploma-artifacts-row">
            {artifacts.map(a => (
              <span key={a.id} className="cert-artifact-pill" title={a.name}>
                {a.icon}
              </span>
            ))}
          </div>

          <div className="diploma-footer">
            <div className="diploma-sign-box">
              <span className="sign-line">{today}</span>
              <span className="sign-label">Date of Mission</span>
            </div>

            <div className="diploma-gold-seal">
              <div className="seal-ribbon">⭐</div>
              <span className="seal-text">OFFICIAL SEAL</span>
            </div>

            <div className="diploma-sign-box">
              <span className="sign-line">Captain Cronos</span>
              <span className="sign-label">Chief Time Commander</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
