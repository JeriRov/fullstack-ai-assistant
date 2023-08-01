import React from 'react';

import { useAudioAnalyzer } from '../hooks/useAudioAnalyzer';

export const AudioAnalyzer: React.FC = () => {
  const { isListening, level, startListening, stopListening } =
    useAudioAnalyzer();

  const handleAnalyzer = () => {
    return isListening ? stopListening() : startListening();
  };

  return (
    <div>
      <button onClick={handleAnalyzer}>
        {isListening ? 'Stop Listening' : 'Start Listening'}
      </button>
      <div id="level">
        <span>{level}</span>
      </div>
      <div
        className="mic"
        style={{
          // eslint-disable-next-line no-magic-numbers
          border: `${level / 5}px solid red`,
          width: '100px',
          borderRadius: '50%',
          height: '100px',
        }}
      />
    </div>
  );
};
