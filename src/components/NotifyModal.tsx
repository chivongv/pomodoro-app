import React from 'react';
import styled from '@emotion/styled';

import { usePomodoro } from '../hooks/usePomodoro';
import Sound from './Sound';

const Container = styled.div({
  zIndex: 10,
  position: 'absolute',
  top: '50%',
  left: '50%',
  background: 'white',
  transform: 'translate(-50%,-50%)',
  border: '1px solid rgba(0,0,0,0.2)',
  borderRadius: 7,
  display: 'flex',
  flexDirection: 'column',
  padding: '1rem',
});

const Header = styled.h1({
  fontSize: '5rem',
  textAlign: 'center',
  marginBottom: 15,
});

const Text = styled.p({
  marginBottom: 15,
  textAlign: 'center',
});

const ButtonWrapper = styled.div({
  display: 'flex',
  justifyContent: 'center',
});

const Button = styled.button({
  padding: '1rem 1.5rem',
  borderRadius: 10,
  border: 'none',
  backgroundColor: '#eee',
  fontSize: '1rem',
});

type Props = {
  status: string;
  toggleNotify: () => void;
};

// eslint-disable-next-line react/prop-types
const NotifyModal: React.FC<Props> = ({ status, toggleNotify }) => {
  const { startCountdown } = usePomodoro();

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    startCountdown();
    toggleNotify();
  }

  if (status === 'resting')
    return (
      <Container>
        <Header>🌱</Header>
        <Text>
          Hope you got enough rest. Your break is now over. It is time to focus
          again.
        </Text>
        <Button onClick={handleClick}>Start working</Button>
        <Sound />
      </Container>
    );

  return (
    <Container>
      <Header>🎉</Header>
      <Text>
        Congratulations! You have successfully being focused on your work. It is
        time for a break.
      </Text>
      <ButtonWrapper>
        <Button type="button" onClick={handleClick}>
          Start break
        </Button>
      </ButtonWrapper>
      <Sound />
    </Container>
  );
};

export default NotifyModal;
