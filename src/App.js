import React from "react";
import styled from "@emotion/styled";
import { FaPlay, FaUndo, FaPause } from "react-icons/fa";

const Container = styled.div({
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

const Title = styled.h1({
  marginBottom: 5,
  marginTop: 10,
});

const Tagline = styled.h3({
  marginBottom: 20,
  fontStyle: "italic",
});

const ButtonsBar = styled.div({
  marginBottom: 25,
});

const Button = styled.button({
  padding: "1rem 1.5rem",
  marginRight: "0.5rem",
  borderRadius: 10,
  border: "none",
  backgroundColor: "#eee",
});

const Countdown = styled.h3({
  fontSize: 48,
  marginBottom: 15,
});

const App = () => {
  const [sessionLength, setSessionLength] = React.useState(25);
  const [sessionLengthInSeconds, setSessionLengthInSeconds] = React.useState(
    sessionLength * 60
  );
  const [isCounting, setIsCounting] = React.useState(false);
  const [isNewSession, setIsNewSession] = React.useState(true);

  function startCountdown() {
    if (!isCounting) {
      if (isNewSession) {
        setSessionLengthInSeconds(sessionLength * 60);
        setIsNewSession(false);
      }
      if (sessionLengthInSeconds > 0) {
        setIsCounting(true);
      }
    }
  }

  function updateCountdown() {
    if (sessionLengthInSeconds > 0) {
      setSessionLengthInSeconds((prev) => --prev);
    }
  }

  function pausecountdown() {
    setIsCounting(false);
  }

  function reset() {
    setIsCounting(false);
    setIsNewSession(true);
    setSessionLengthInSeconds(sessionLength * 60);
  }

  React.useEffect(() => {
    let intervalId = null;
    if (isCounting) {
      intervalId = setInterval(updateCountdown, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isCounting]);

  let minutes = Math.floor(sessionLengthInSeconds / 60);
  let seconds = sessionLengthInSeconds % 60;
  const minutesText = `0${minutes}`.slice(-2);
  const secondsText = `0${seconds}`.slice(-2);

  return (
    <Container>
      <Title>Pomodoro App</Title>
      <Tagline>Stay productive</Tagline>
      <ButtonsBar>
        {isCounting ? (
          <Button type="button" onClick={() => pausecountdown()}>
            <FaPause />
          </Button>
        ) : (
          <Button type="button" onClick={() => startCountdown()}>
            <FaPlay />
          </Button>
        )}
        <Button type="button" onClick={() => reset()}>
          <FaUndo />
        </Button>
      </ButtonsBar>
      <Countdown>{`${minutesText}:${secondsText}`}</Countdown>
    </Container>
  );
};

export default App;
