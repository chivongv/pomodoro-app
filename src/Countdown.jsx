import React, { useEffect } from "react";
import styled from "@emotion/styled";

import { usePomodoro } from "./usePomodoro";

const Container = styled.div({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignContent: "center",
  textAlign: "center",
});

const Header = styled.h4({
  marginBottom: 10,
});

const Text = styled.h3({
  fontSize: 48,
});

const Countdown = ({ toggleNotify }) => {
  const {
    status,
    isCounting,
    sessionNum,
    sessionAmount,
    timeLeftInSeconds,
    updateCountdown,
  } = usePomodoro();

  useEffect(() => {
    let id = null;

    if (isCounting) {
      if (timeLeftInSeconds > 0) {
        id = setTimeout(updateCountdown, 1000);
      } else {
        toggleNotify();
      }
    }

    return () => {
      if (id) {
        clearTimeout(id);
      }
    };
  }, [isCounting, timeLeftInSeconds]);

  const headerText =
    status === "resting"
      ? sessionNum % sessionAmount === 0
        ? "Long break"
        : `Break ${sessionNum}`
      : `Session ${sessionNum}`;

  let minutes = Math.floor(timeLeftInSeconds / 60);
  let seconds = timeLeftInSeconds % 60;
  const minutesText = `0${minutes}`.slice(-2);
  const secondsText = `0${seconds}`.slice(-2);

  return (
    <Container>
      <Header>{headerText}</Header>
      <Text>{`${minutesText}:${secondsText}`}</Text>
    </Container>
  );
};

export default Countdown;
