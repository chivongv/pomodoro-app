import React from 'react';
import { FaTimes } from 'react-icons/fa';
import styled from '@emotion/styled';

import { usePomodoro } from '../hooks/usePomodoro';
import { Button } from './shared';

const Container = styled.div({
  width: 400,
  height: 300,
  zIndex: 10,
  position: 'absolute',
  top: '50%',
  left: '50%',
  background: 'white',
  transform: 'translate(-50%,-50%)',
  border: '1px solid black',
  borderRadius: 5,
  display: 'flex',
  flexDirection: 'column',
  padding: '4rem 2rem 2rem',
});

const InputGroup = styled.div({
  marginBottom: 5,
  display: 'grid',
  gridTemplateColumns: '1fr auto',
});

const Input = styled.input({
  padding: '4px 10px',
});

const ButtonWrapper = styled.div({
  position: 'absolute',
  top: 8,
  right: 8,
});

type Props = {
  toggleSettings: () => void;
};

// eslint-disable-next-line react/prop-types
const SettingsModal: React.FC<Props> = ({ toggleSettings }) => {
  const {
    sessionLength,
    shortBreakLength,
    longBreakLength,
    sessionAmount,
    setSessionLength,
    setShortBreakLength,
    setLongBreakLength,
    setSessionAmount,
  } = usePomodoro();

  function handleSessionLengthChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setSessionLength(Number(e.target.value));
  }

  function handleShortBreakLengthChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setShortBreakLength(Number(e.target.value));
  }

  function handleLongBreakLengthChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setLongBreakLength(Number(e.target.value));
  }

  function handleSessionAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setSessionAmount(Number(e.target.value));
  }

  return (
    <Container>
      <form>
        <InputGroup>
          <label htmlFor='sessionLength'>Session length: </label>
          <Input value={sessionLength} id='sessionLength' name='sessionLength' type='number' onChange={handleSessionLengthChange} />
        </InputGroup>
        <InputGroup>
          <label htmlFor='shortBreakLength'>Short break length: </label>
          <Input value={shortBreakLength} id='shortBreakLength' type='number' onChange={handleShortBreakLengthChange} />
        </InputGroup>
        <InputGroup>
          <label htmlFor='longBreakLength'>Long break length: </label>
          <Input value={longBreakLength} id='longBreakLength' type='number' onChange={handleLongBreakLengthChange} />
        </InputGroup>
        <InputGroup>
          <label htmlFor='sessionAmount'>Session amount: </label>
          <Input value={sessionAmount} id='sessionAmount' type='number' onChange={handleSessionAmountChange} />
        </InputGroup>
      </form>
      <ButtonWrapper>
        <Button type='button' aria-label='Close settings' onClick={() => toggleSettings()}>
          <FaTimes />
        </Button>
      </ButtonWrapper>
    </Container>
  );
};

export default SettingsModal;
