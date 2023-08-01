/// <reference types="react-scripts" />
interface Window {
  SpeechRecognition?: SpeechRecognitionExemplar;
  webkitSpeechRecognition?: SpeechRecognitionExemplar;
  webkitAudioContext?: typeof AudioContext;
}
interface SpeechRecognition {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  addEventListener: (type: string, listener: EventListener) => void;
  onstart: () => void;
  onend: () => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  start: () => void;
  stop: () => void;
  onerror: (event: ErrorEvent) => void;
}
interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionExemplar extends SpeechRecognition {
  new (): SpeechRecognition;
}
