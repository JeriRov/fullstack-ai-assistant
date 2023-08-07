import React, { useEffect } from 'react';

import './audioSpectrum.css';
import { useAudioAnalyzer } from '../../hooks/UseAudioAnalyzer/useAudioAnalyzer';
import { useSpeechRecognition } from '../../hooks/UseSpeechRecognition/useSpeechRecognition';
import { useSpin } from '../../hooks/UseSpin/useSpin';

import {
  ANALYZER_LEVEL_DIVISOR,
  LEVEL_SIZE_FACTOR,
} from './audioSpectrum.settings';

export const AudioSpectrum: React.FC = () => {
  const [spinRef, setRotate] = useSpin<HTMLDivElement>();

  const {
    isListening: isAnalyzerListening,
    level: analyzerLevel,
    startListening: startAnalyzerListening,
    stopListening: stopAnalyzerListening,
  } = useAudioAnalyzer();

  const {
    isListening: isSpeechListening,
    startListening: startSpeechListening,
    stopListening: stopSpeechListening,
  } = useSpeechRecognition();

  const preparedAnalyzerLevel =
    analyzerLevel / ANALYZER_LEVEL_DIVISOR < LEVEL_SIZE_FACTOR
      ? LEVEL_SIZE_FACTOR
      : analyzerLevel / ANALYZER_LEVEL_DIVISOR;
  const isListening = isAnalyzerListening && isSpeechListening;

  const handleStartListening = async () => {
    await startAnalyzerListening();
    startSpeechListening();
    setRotate(true);
  };

  const handleStopListening = () => {
    stopAnalyzerListening();
    stopSpeechListening();
    setRotate(false);
  };

  const handleAudioSpectrum = () =>
    isListening ? handleStopListening() : handleStartListening();

  useEffect(() => {
    if (!isListening) {
      stopAnalyzerListening();
      stopSpeechListening();
      setRotate(false);
    }
  }, [isListening, setRotate, stopAnalyzerListening, stopSpeechListening]);

  return (
    <div>
      <button
        className={'btn analyzer-btn container'}
        onClick={handleAudioSpectrum}>
        <div
          className={`analyzer`}
          ref={spinRef}
          style={{
            width: `${preparedAnalyzerLevel}px`,
            height: `${preparedAnalyzerLevel}px`,
          }}>
          <div className={'ocean'}>
            <div className={'wave'} />
            <div className={'wave'} />
          </div>
        </div>
      </button>
    </div>
  );
};
