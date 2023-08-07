import React from 'react';

import './app.css';

import { AudioSpectrum } from './components/AudioSpectrum/AudioSpectrum';

const App: React.FC = () => {
  return (
    <div className={'app'}>
      <AudioSpectrum />
    </div>
  );
};

// eslint-disable-next-line import/no-default-export
export default App;
