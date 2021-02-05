import React from 'react';
import { render } from '@testing-library/react';
import { PomodoroProvider } from '../hooks/usePomodoro';

type Props = {
  children: React.ReactNode;
};

const ProvidersWrapper = ({ children }: Props) => {
  return <PomodoroProvider>{children}</PomodoroProvider>;
};

const customRender = (ui: JSX.Element, options?: any) =>
  render(ui, {
    wrapper: ProvidersWrapper,
    ...options,
  });

export * from '@testing-library/react';
export { customRender as render };
