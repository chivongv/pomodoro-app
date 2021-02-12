import React from 'react';
import { render } from '@testing-library/react';
import { PomodoroProvider } from '../hooks/usePomodoro';
import '@testing-library/jest-dom/extend-expect';
import 'jest-axe/extend-expect';

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
