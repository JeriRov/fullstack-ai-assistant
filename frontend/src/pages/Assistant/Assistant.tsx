import React from 'react';

import { io } from 'socket.io-client';

import { AudioSpectrum } from 'components/AudioSpectrum/AudioSpectrum';

export const Assistant: React.FC = () => {
  const socket = io(`${process.env.REACT_APP_API_URL}`);

  socket.on('connection', err => {
    // eslint-disable-next-line no-console
    console.log(err.message);
  });

  return <AudioSpectrum />;
};
