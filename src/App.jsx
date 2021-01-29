import React, { useState } from "react";
import styled from "@emotion/styled";
import { FaPlay, FaUndo, FaPause, FaCog, FaFastForward } from "react-icons/fa";

import { usePomodoro } from "./usePomodoro";
import SettingsModal from "./SettingsModal";
import { Button } from "./shared";
import NotifyModal from "../NotifyModal";
import Countdown from "./Countdown";

const Container = styled.div({
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

const Tagline = styled.h3({
  marginTop: 5,
  marginBottom: 25,
  fontStyle: "italic",
});

const ButtonsBar = styled.div({
  marginBottom: 25,
});

const App = () => {
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isNotifyModalOpen, setIsNotifyModalOpen] = useState(false);
  const {
    status,
    isCounting,
    sessionNum,
    startCountdown,
    pauseCountdown,
    skipCountdown,
    reset,
  } = usePomodoro();

  function toggleSettings() {
    setIsSettingsModalOpen((prev) => !prev);
  }

  function toggleNotify() {
    setIsNotifyModalOpen((prev) => !prev);
  }

  return (
    <Container>
      <Tagline>Stay productive 🌱</Tagline>
      <ButtonsBar>
        {isCounting ? (
          <>
            <Button
              type="button"
              title="Pause"
              onClick={() => pauseCountdown()}
            >
              <FaPause />
            </Button>
          </>
        ) : (
          <Button type="button" title="Start" onClick={() => startCountdown()}>
            <FaPlay />
          </Button>
        )}
        {status !== "idle" && (
          <Button type="button" title="Skip" onClick={() => skipCountdown()}>
            <FaFastForward />
          </Button>
        )}
        <Button type="button" title="Reset" onClick={() => reset()}>
          <FaUndo />
        </Button>
        <Button type="button" title="Settings" onClick={() => toggleSettings()}>
          <FaCog />
        </Button>
      </ButtonsBar>
      <Countdown toggleNotify={toggleNotify} />
      {isSettingsModalOpen && <SettingsModal toggleSettings={toggleSettings} />}
      {isNotifyModalOpen && (
        <NotifyModal
          status={status}
          sessionNum={sessionNum}
          toggleNotify={toggleNotify}
        />
      )}
    </Container>
  );
};

export default App;
