import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import { PomodoroProvider } from './hooks/usePomodoro';

ReactDOM.render(
  <React.StrictMode>
    <PomodoroProvider>
      <App />
    </PomodoroProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
