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
const Modal: React.FC<Props> = ({ toggleSettings }) => {
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

  return (
    <Container>
      <form>
        <InputGroup>
          <label htmlFor='sessionLength'>Session length: </label>
          <Input value={sessionLength} id='sessionLength' type='number' onChange={e => setSessionLength(+e.target.value)} />
        </InputGroup>
        <InputGroup>
          <label htmlFor='shortBreakLength'>Short break length: </label>
          <Input value={shortBreakLength} id='shortBreakLength' type='number' onChange={e => setShortBreakLength(+e.target.value)} />
        </InputGroup>
        <InputGroup>
          <label htmlFor='longBreakLength'>Long break length: </label>
          <Input value={longBreakLength} id='longBreakLength' type='number' onChange={e => setLongBreakLength(+e.target.value)} />
        </InputGroup>
        <InputGroup>
          <label htmlFor='sessionAmount'>Session amount: </label>
          <Input value={sessionAmount} id='sessionAmount' type='number' onChange={e => setSessionAmount(+e.target.value)} />
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

export default Modal;
