import React from 'react';

import './app.css';

import { Assistant } from 'pages/Assistant/Assistant';

const App: React.FC = () => {
  return (
    <div className={'app'}>
      <Assistant />
    </div>
  );
};

// eslint-disable-next-line import/no-default-export
export default App;
