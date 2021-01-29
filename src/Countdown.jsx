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
    previousStatus,
    isCounting,
    sessionNum,
    sessionAmount,
    timeLeftInSeconds,
    updateCountdown,
  } = usePomodoro();

  function getHeaderTextOnSessionNum(
    sessionNum,
    sessionAmount,
    status,
    previousStatus
  ) {
    const temp = status === "paused" ? previousStatus : status;

    if (temp === "resting") {
      if (sessionNum % sessionAmount === 0) {
        return "Long break";
      } else {
        return `Break ${sessionNum}`;
      }
    } else {
      return `Session ${sessionNum}`;
    }
  }

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

  const headerText = getHeaderTextOnSessionNum(
    sessionNum,
    sessionAmount,
    status,
    previousStatus
  );

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
