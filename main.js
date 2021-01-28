import React from "react";
import ReactDOM from "react-dom";

import App from "./src/App";
import { PomodoroProvider } from "./src/usePomodoro";

ReactDOM.render(
  <PomodoroProvider>
    <App />
  </PomodoroProvider>,
  document.getElementById("root")
);
