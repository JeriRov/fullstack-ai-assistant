// src/contexts/SpeechRecognitionContext.tsx

import React, { createContext, useContext, useEffect, useState } from 'react';

interface SpeechRecognitionContextType {
  isSupported: boolean;
  isListening: boolean;
  startListening: () => void;
  stopListening: () => void;
  transcript: string;
  error: string | null;
}

const SpeechRecognitionContext = createContext<SpeechRecognitionContextType>({
  isSupported: false,
  isListening: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  startListening: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  stopListening: () => {},
  transcript: '',
  error: null,
});

export const useSpeechRecognitionInContext = () =>
  useContext(SpeechRecognitionContext);
interface SpeechRecognitionProviderProps {
  children: React.ReactNode;
}
export const SpeechRecognitionProvider: React.FC<
  SpeechRecognitionProviderProps
> = ({ children }) => {
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

  return (
    <SpeechRecognitionContext.Provider
      value={{
        isSupported,
        isListening,
        startListening,
        stopListening,
        transcript,
        error,
      }}>
      {children}
    </SpeechRecognitionContext.Provider>
  );
};
//
