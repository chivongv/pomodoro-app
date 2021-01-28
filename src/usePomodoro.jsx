import React, { useContext, useReducer } from "react";

const PomodoroContext = React.createContext();

const initialState = {
  status: "idle",
  isCounting: false,
  sessionNum: 1,
  sessionLength: 25,
  shortBreakLength: 5,
  longBreakLength: 15,
  sessionAmount: 3,
  timeLeftInSeconds: 25 * 60,
};

function reducer(state, action) {
  switch (action.type) {
    case "start": {
      const shared = {
        ...state,
        status: "working",
        isCounting: true,
      };

      if (state.status === "paused") {
        return {
          ...shared,
        };
      } else if (state.status === "idle") {
        return {
          ...shared,
          timeLeftInSeconds: state.sessionLength * 60,
        };
      } else if (state.status === "resting") {
        return {
          ...shared,
          sessionNum: state.sessionNum + 1,
          timeLeftInSeconds: state.sessionLength * 60,
        };
      }

      return {
        ...shared,
        status: "resting",
        timeLeftInSeconds:
          state.sessionNum % state.sessionAmount === 0
            ? state.longBreakLength * 60
            : state.shortBreakLength * 60,
      };
    }
    case "pause": {
      return {
        ...state,
        status: "paused",
        isCounting: false,
      };
    }
    case "skip": {
      if (state.status === "working") {
        return {
          ...state,
          status: "resting",
          timeLeftInSeconds:
            state.sessionNum % state.sessionAmount === 0
              ? state.longBreakLength * 60
              : state.shortBreakLength * 60,
        };
      }

      if (state.status === "resting") {
        return {
          ...state,
          status: "working",
          sessionNum: state.sessionNum + 1,
          timeLeftInSeconds: state.sessionLength * 60,
        };
      }

      return state;
    }
    case "reset":
      return initialState;
    case "updateCountdown":
      return {
        ...state,
        timeLeftInSeconds: state.timeLeftInSeconds - 1,
      };
    case "setSessionLength":
      if (action.payload < 1 || state.isCounting) return state;

      return {
        ...state,
        sessionLength: action.payload,
        timeLeftInSeconds: action.payload * 60,
      };
    case "setShortBreakLength":
      if (action.payload < 1 || state.isCounting) return state;

      return {
        ...state,
        shortBreakLength: action.payload,
      };
    case "setLongBreakLength":
      if (action.payload < 1 || state.isCounting) return state;

      return {
        ...state,
        longBreakLength: action.payload,
      };
    case "setSessionAmount":
      if (action.payload < 1 || state.isCounting) return state;

      return {
        ...state,
        sessionAmount: action.payload,
      };
    default:
      return state;
  }
}

export const usePomodoro = () => {
  return useContext(PomodoroContext);
};

export const PomodoroProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  function startCountdown() {
    dispatch({ type: "start" });
  }

  function updateCountdown() {
    if (state.timeLeftInSeconds > 0) {
      dispatch({ type: "updateCountdown" });
    }
  }

  function skipCountdown() {
    dispatch({ type: "skip" });
  }

  function pauseCountdown() {
    dispatch({ type: "pause" });
  }

  function reset() {
    dispatch({ type: "reset" });
  }

  function setSessionLength(num) {
    dispatch({ type: "setSessionLength", payload: num });
  }

  function setShortBreakLength(num) {
    dispatch({ type: "setShortBreakLength", payload: num });
  }

  function setLongBreakLength(num) {
    dispatch({ type: "setLongBreakLength", payload: num });
  }

  function setSessionAmount(num) {
    dispatch({ type: "setSessionAmount", payload: num });
  }

  return (
    <PomodoroContext.Provider
      value={{
        ...state,
        startCountdown,
        updateCountdown,
        skipCountdown,
        pauseCountdown,
        reset,
        setSessionLength,
        setShortBreakLength,
        setLongBreakLength,
        setSessionAmount,
      }}
    >
      {children}
    </PomodoroContext.Provider>
  );
};
