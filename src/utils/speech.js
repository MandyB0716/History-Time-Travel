export function speakText(text, onStart, onEnd) {
  if (!('speechSynthesis' in window)) {
    console.warn('Text-to-speech is not supported in this browser.');
    if (onEnd) onEnd();
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  if (!text) {
    if (onEnd) onEnd();
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);

  // Child-friendly speech settings
  utterance.rate = 0.88; // Slightly slower for better comprehension in 5-8 year olds
  utterance.pitch = 1.1; // Friendly slightly higher pitch

  // Pick an English voice
  const voices = window.speechSynthesis.getVoices();
  const preferredVoice = voices.find(voice => voice.lang && voice.lang.startsWith('en') && !voice.localService) 
    || voices.find(voice => voice.lang && voice.lang.startsWith('en'));
  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }

  if (onStart) {
    utterance.onstart = onStart;
  }

  utterance.onend = () => {
    if (onEnd) onEnd();
  };

  utterance.onerror = () => {
    if (onEnd) onEnd();
  };

  window.speechSynthesis.speak(utterance);
}

export function stopSpeech() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
