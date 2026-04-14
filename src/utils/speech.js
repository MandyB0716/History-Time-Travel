export function speakText(text) {
  if (!('speechSynthesis' in window)) {
    console.warn('Text-to-speech is not supported in this browser.');
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  
  // Child-friendly speech settings
  utterance.rate = 0.9; // Slightly slower for better comprehension
  utterance.pitch = 1.1; // Slightly higher pitch
  
  // Try to find a clear voice, prefer a native local voice if possible
  const voices = window.speechSynthesis.getVoices();
  const preferredVoice = voices.find(voice => voice.lang.startsWith('en') && !voice.localService);
  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }

  window.speechSynthesis.speak(utterance);
}
