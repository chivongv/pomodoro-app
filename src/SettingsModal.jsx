import React from "react";
import { FaTimes } from "react-icons/fa";
import styled from "@emotion/styled";

import { usePomodoro } from "./usePomodoro";
import { Button } from "./shared";

const Container = styled.div({
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

const ButtonWrapper = styled.div({
  position: "absolute",
  top: 8,
  right: 8,
});

const Modal = ({ toggleSettings }) => {
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

  function handleSessionLengthChange(e) {
    e.preventDefault();
    setSessionLength(e.target.value);
  }

  return (
    <Container>
      <InputGroup>
        <label>Session length: </label>
        <Input
          value={sessionLength}
          type="number"
          onChange={handleSessionLengthChange}
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
      <ButtonWrapper>
        <Button type="button" onClick={() => toggleSettings()}>
          <FaTimes />
        </Button>
      </ButtonWrapper>
    </Container>
  );
};

export default Modal;
