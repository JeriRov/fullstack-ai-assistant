import React from 'react';

import { useSpeechRecognition } from '../../hooks/useSpeechRecognition';

export const SpeechRecognition: React.FC = () => {
  const { transcript, isListening, startListening, stopListening } =
    useSpeechRecognition();

  const handleListen = () => {
    return isListening ? stopListening() : startListening();
  };

  return (
    <div>
      <button onClick={handleListen}>
        {isListening ? 'Stop Listening' : 'Start Listening'}
      </button>
      {isListening ? <p>Listening...</p> : null}

      <p>Transcript: {transcript}</p>
    </div>
  );
};
