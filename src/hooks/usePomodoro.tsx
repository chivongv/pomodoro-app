import React, { useContext, useReducer } from 'react';

type State = typeof initialState;

type Action =
  | { type: 'start' }
  | { type: 'pause' }
  | { type: 'skip' }
  | { type: 'reset' }
  | { type: 'updateCountdown' }
  | { type: 'setSessionLength'; payload: number }
  | { type: 'setShortBreakLength'; payload: number }
  | { type: 'setLongBreakLength'; payload: number }
  | { type: 'setSessionAmount'; payload: number };

export type ContextType = State & {
  startCountdown: () => void;
  updateCountdown: () => void;
  skipCountdown: () => void;
  pauseCountdown: () => void;
  reset: () => void;
  setSessionLength: (arg: number) => void;
  setShortBreakLength: (arg: number) => void;
  setLongBreakLength: (arg: number) => void;
  setSessionAmount: (arg: number) => void;
};

type ProviderProps = {
  children: React.ReactNode;
};

const initialState = {
  status: 'idle',
  isCounting: false,
  sessionNum: 1,
  sessionLength: 25,
  shortBreakLength: 5,
  longBreakLength: 15,
  sessionAmount: 3,
  timeLeftInSeconds: 25 * 60,
  previousStatus: '',
};

const PomodoroContext = React.createContext<ContextType | undefined | null>(
  null
);

function getBreakLengthOnSessionNum(state: State) {
  const {
    sessionNum,
    sessionAmount,
    shortBreakLength,
    longBreakLength,
  } = state;

  return sessionNum % sessionAmount === 0 ? longBreakLength : shortBreakLength;
}

function getNextStateOnStatus(state: State) {
  const { status, previousStatus, sessionNum, sessionLength } = state;
  const shared = {
    ...state,
    isCounting: true,
    previousStatus: status,
  };
  // if the current status is paused, we look at the previous status instead
  const tempStatus = status === 'paused' ? previousStatus : status;
  if (status === 'paused' && previousStatus === 'idle') return state;

  if (tempStatus === 'working') {
    return {
      ...shared,
      status: 'resting',
      timeLeftInSeconds: getBreakLengthOnSessionNum(state) * 60,
    };
  }

  if (tempStatus === 'resting') {
    return {
      ...shared,
      status: 'working',
      sessionNum: sessionNum + 1,
      timeLeftInSeconds: sessionLength * 60,
    };
  }

  return state;
}

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'start': {
      const shared = {
        ...state,
        isCounting: true,
      };

      if (state.status === 'paused') {
        return {
          ...shared,
          status: state.previousStatus,
          previousStatus: state.status,
        };
      }

      if (state.status === 'idle') {
        return {
          ...shared,
          status: 'working',
          previousStatus: state.status,
          timeLeftInSeconds: state.sessionLength * 60,
        };
      }

      return getNextStateOnStatus(shared);
    }
    case 'pause': {
      return {
        ...state,
        previousStatus: state.status,
        status: 'paused',
        isCounting: false,
      };
    }
    case 'skip': {
      if (state.status === 'paused') {
        if (state.previousStatus === 'idle') return state;
        return getNextStateOnStatus(state);
      }

      return getNextStateOnStatus(state);
    }
    case 'reset':
      return initialState;
    case 'updateCountdown':
      return {
        ...state,
        timeLeftInSeconds: state.timeLeftInSeconds - 1,
      };
    case 'setSessionLength':
      if (action.payload < 0 || state.isCounting) return state;

      return {
        ...state,
        sessionLength: action.payload,
        timeLeftInSeconds: action.payload * 60,
      };
    case 'setShortBreakLength':
      if (action.payload < 0 || state.isCounting) return state;

      return {
        ...state,
        shortBreakLength: action.payload,
      };
    case 'setLongBreakLength':
      if (action.payload < 0 || state.isCounting) return state;

      return {
        ...state,
        longBreakLength: action.payload,
      };
    case 'setSessionAmount':
      if (action.payload < 1 || state.isCounting) return state;

      return {
        ...state,
        sessionAmount: action.payload,
      };
    default:
      return state;
  }
}

export const usePomodoro: () => ContextType = () =>
  useContext(PomodoroContext) as ContextType;

export const PomodoroProvider = ({ children }: ProviderProps): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);

  function startCountdown() {
    dispatch({ type: 'start' });
  }

  function updateCountdown() {
    if (state.timeLeftInSeconds > 0) {
      dispatch({ type: 'updateCountdown' });
    }
  }

  function skipCountdown() {
    dispatch({ type: 'skip' });
  }

  function pauseCountdown() {
    dispatch({ type: 'pause' });
  }

  function reset() {
    dispatch({ type: 'reset' });
  }

  function setSessionLength(num: number) {
    dispatch({ type: 'setSessionLength', payload: num });
  }

  function setShortBreakLength(num: number) {
    dispatch({ type: 'setShortBreakLength', payload: num });
  }

  function setLongBreakLength(num: number) {
    dispatch({ type: 'setLongBreakLength', payload: num });
  }

  function setSessionAmount(num: number) {
    dispatch({ type: 'setSessionAmount', payload: num });
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
