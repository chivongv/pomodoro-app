import React from 'react';
import Pomodoro from './components/Pomodoro';
import { PomodoroProvider } from './hooks/usePomodoro';

const App: React.FC = () => {
  return (
    <>
      <PomodoroProvider>
        <Pomodoro />
      </PomodoroProvider>
    </>
  );
};

export default App;
