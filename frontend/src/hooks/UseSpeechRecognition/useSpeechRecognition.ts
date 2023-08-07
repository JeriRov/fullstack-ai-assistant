import React, { useEffect, useState } from 'react';

import { IUseSpeechRecognition } from './useSpeechRecognition.types';

export const useSpeechRecognition = (): IUseSpeechRecognition => {
  const [isSupported, setIsSupported] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = React.useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition ?? window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }
    setIsSupported(true);
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.onstart = () => setIsListening(true);
    recognitionRef.current.onend = () => setIsListening(false);
    recognitionRef.current.lang = 'uk-UA';
    recognitionRef.current.onresult = event => {
      const currentTranscript =
        event.results[event.results.length - 1][0].transcript;
      setTranscript(currentTranscript);
    };
    recognitionRef.current.onerror = event => setError(event.error);
  }, []);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  return {
    transcript,
    isListening,
    isSupported,
    error,
    startListening,
    stopListening,
  };
};
