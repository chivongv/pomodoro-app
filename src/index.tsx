import React from 'react';
import { render } from 'react-dom';

import App from './App';
import './App.global.css';
import { PomodoroProvider } from './hooks/usePomodoro';

render(
  <PomodoroProvider>
    <App />
  </PomodoroProvider>,
  document.getElementById('root')
);
