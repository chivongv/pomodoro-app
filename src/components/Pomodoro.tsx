import React, { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { FaPlay, FaUndo, FaPause, FaCog, FaFastForward } from 'react-icons/fa';

import { usePomodoro } from '../hooks/usePomodoro';
import SettingsModal from './SettingsModal';
import { Button } from './shared';
import NotifyModal from './NotifyModal';
import Countdown from './Countdown';

const Container = styled.div({
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

const Tagline = styled.h3({
  marginTop: 5,
  marginBottom: 25,
  fontStyle: 'italic',
});

const ButtonsBar = styled.div({
  marginBottom: 25,
});

const Pomodoro: React.FC = () => {
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isNotifyModalOpen, setIsNotifyModalOpen] = useState(false);
  const { status, isCounting, startCountdown, pauseCountdown, skipCountdown, reset } = usePomodoro();

  const toggleSettings = useCallback(() => {
    setIsSettingsModalOpen(prev => !prev);
  }, []);

  const toggleNotify = useCallback(() => {
    setIsNotifyModalOpen(prev => !prev);
  }, []);

  return (
    <Container>
      <Tagline>Stay productive 🌱</Tagline>
      <ButtonsBar>
        {isCounting ? (
          <>
            <Button type='button' aria-label='Pause' onClick={() => pauseCountdown()}>
              <FaPause />
            </Button>
          </>
        ) : (
          <Button type='button' aria-label='Start' onClick={() => startCountdown()}>
            <FaPlay />
          </Button>
        )}
        {status !== 'idle' && (
          <Button type='button' aria-label='Skip' onClick={() => skipCountdown()}>
            <FaFastForward />
          </Button>
        )}
        <Button type='button' aria-label='Reset' onClick={() => reset()}>
          <FaUndo />
        </Button>
        <Button type='button' aria-label='Settings' onClick={() => toggleSettings()}>
          <FaCog />
        </Button>
      </ButtonsBar>
      <Countdown toggleNotify={toggleNotify} />
      {isSettingsModalOpen && <SettingsModal toggleSettings={toggleSettings} />}
      {isNotifyModalOpen && <NotifyModal status={status} toggleNotify={toggleNotify} />}
    </Container>
  );
};

export default Pomodoro;
