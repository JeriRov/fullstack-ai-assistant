import React from 'react';

import { AudioAnalyzer } from './components/AudioAnalyzer';
import { useSpeechRecognition } from './hooks/useSpeechRecognition';

const App: React.FC = () => {
  const {
    isSupported,
    isListening,
    startListening: handleStartListening,
    stopListening: handleStopListening,
    transcript,
    error,
  } = useSpeechRecognition();

  if (!isSupported) {
    return <div>Speech Recognition is not supported in this browser.</div>;
  }

  return (
    <div>
      <h1>Speech Recognition Example</h1>
      <p>Status: {isListening ? 'Listening' : 'Not Listening'}</p>
      <button disabled={isListening} onClick={handleStartListening}>
        Start Listening
      </button>
      <button disabled={!isListening} onClick={handleStopListening}>
        Stop Listening
      </button>
      <p>Transcript: {transcript}</p>
      {error ? <p>Error: {error}</p> : null}
      <AudioAnalyzer />
    </div>
  );
};

// eslint-disable-next-line import/no-default-export
export default App;
