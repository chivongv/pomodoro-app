import React, { useState } from "react";
import styled from "@emotion/styled";
import { FaPlay, FaUndo, FaPause, FaCog, FaTimes } from "react-icons/fa";
import GithubCorner from "react-github-corner";

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
  ":last-child": {
    margin: 0,
  },
});

const Countdown = styled.h3({
  fontSize: 48,
  marginBottom: 15,
});

const Modal = styled.div({
  width: 400,
  height: 300,
  zIndex: 10,
  position: "absolute",
  top: "50%",
  left: "50%",
  background: "white",
  transform: "translate(-50%,-50%)",
  border: "1px solid black",
  borderRadius: 5,
  display: "flex",
  flexDirection: "column",
  padding: "4rem 2rem 2rem",
});

const InputGroup = styled.div({
  marginBottom: 5,
  ["label"]: {
    marginRight: "auto",
  },
});

const Input = styled.input({
  padding: "4px 10px",
  width: 60,
});

const CloseModalWrapper = styled.div({
  position: "absolute",
  top: 8,
  right: 8,
});

const App = () => {
  const [sessionLength, setSessionLength] = useState(25);
  const [shortBreakLength, setShortBreakLength] = React.useState(5);
  const [longBreakLength, setLongBreakLength] = React.useState(15);
  const [sessionAmount, setSessionAmount] = React.useState(3);
  const [sessionLengthInSeconds, setSessionLengthInSeconds] = useState(
    sessionLength * 60
  );
  const [isCounting, setIsCounting] = useState(false);
  const [isNewSession, setIsNewSession] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  function toggleSettings() {
    setIsModalOpen((prev) => !prev);
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
      <GithubCorner
        href="https://github.com/chivongv/pomodoro-app"
        target="_blank"
        ariaLabel="View source on Github"
      />
      <Title>Pomodoro App</Title>
      <Tagline>Stay productive</Tagline>
      <ButtonsBar>
        {isCounting ? (
          <Button type="button" title="Pause" onClick={() => pausecountdown()}>
            <FaPause />
          </Button>
        ) : (
          <Button type="button" title="Start" onClick={() => startCountdown()}>
            <FaPlay />
          </Button>
        )}
        <Button type="button" title="Reset" onClick={() => reset()}>
          <FaUndo />
        </Button>
        <Button type="button" title="Settings" onClick={() => toggleSettings()}>
          <FaCog />
        </Button>
      </ButtonsBar>
      <Countdown>{`${minutesText}:${secondsText}`}</Countdown>
      {isModalOpen && (
        <Modal>
          <InputGroup>
            <label>Session length: </label>
            <Input
              value={sessionLength}
              type="number"
              onChange={(e) => setSessionLength(e.target.value)}
            />
          </InputGroup>
          <InputGroup>
            <label>Short break length: </label>
            <Input
              value={shortBreakLength}
              type="number"
              onChange={(e) => setShortBreakLength(e.target.value)}
            />
          </InputGroup>
          <InputGroup>
            <label>Long break length: </label>
            <Input
              value={longBreakLength}
              type="number"
              onChange={(e) => setLongBreakLength(e.target.value)}
            />
          </InputGroup>
          <InputGroup>
            <label>Session amount: </label>
            <Input
              value={sessionAmount}
              type="number"
              onChange={(e) => setSessionAmount(e.target.value)}
            />
          </InputGroup>
          <CloseModalWrapper>
            <Button type="button" onClick={() => toggleSettings()}>
              <FaTimes />
            </Button>
          </CloseModalWrapper>
        </Modal>
      )}
    </Container>
  );
};

export default App;
