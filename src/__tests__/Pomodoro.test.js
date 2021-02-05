import React from 'react';
import { render, screen, fireEvent } from '../utils/test-utils';
import Pomodoro from '../components/Pomodoro';

test('Should able to start, pause, skip and reset', () => {
  render(<Pomodoro />);

  expect(screen.queryByRole('button', { name: /start/i })).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /pause/i })).not.toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /skip/i })).not.toBeInTheDocument();
  expect(screen.getByText(/session 1/i)).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: /start/i }));
  expect(screen.queryByRole('button', { name: /start/i })).not.toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /pause/i })).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /skip/i })).toBeInTheDocument();

  fireEvent.click(screen.queryByRole('button', { name: /pause/i }));
  expect(screen.queryByRole('button', { name: /start/i })).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: /skip/i }));
  expect(screen.getByText(/break/i)).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: /reset/i }));
  expect(screen.getByText(/session/i)).toBeInTheDocument();
  expect(screen.queryByText(/break/i)).not.toBeInTheDocument();
});

test('Should able to change session and breaks length', () => {
  render(<Pomodoro />);
  const settingsButton = screen.getByRole('button', { name: /settings/i });

  expect(settingsButton).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /close settings/i })).not.toBeInTheDocument();

  fireEvent.click(settingsButton);
  const sessionLengthInput = screen.getByRole('spinbutton', { name: /session length/i });
  const shortBreakLengthInput = screen.getByRole('spinbutton', { name: /short break length/i });
  const longBreakLengthInput = screen.getByRole('spinbutton', { name: /long break length/i });
  const sessionAmountInput = screen.getByRole('spinbutton', { name: /session amount/i });
  const closeSettingsButton = screen.getByRole('button', { name: /close settings/i });
  expect(sessionLengthInput).toBeInTheDocument();
  expect(shortBreakLengthInput).toBeInTheDocument();
  expect(longBreakLengthInput).toBeInTheDocument();
  expect(sessionAmountInput).toBeInTheDocument();
  expect(closeSettingsButton).toBeInTheDocument();

  fireEvent.change(sessionLengthInput, { target: { value: 10 } });
  fireEvent.change(shortBreakLengthInput, { target: { value: 9 } });
  fireEvent.change(longBreakLengthInput, { target: { value: 30 } });
  fireEvent.change(sessionAmountInput, { target: { value: 2 } });
  expect(sessionLengthInput.value).toBe('10');
  expect(shortBreakLengthInput.value).toBe('9');
  expect(longBreakLengthInput.value).toBe('30');
  expect(sessionAmountInput.value).toBe('2');

  fireEvent.click(closeSettingsButton);

  expect(screen.getByText('10:00')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /start/i }));
  fireEvent.click(screen.getByRole('button', { name: /skip/i }));
  expect(screen.getByText('09:00')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /skip/i }));
  fireEvent.click(screen.getByRole('button', { name: /skip/i }));
  expect(screen.getByText(/long break/i)).toBeInTheDocument();
  expect(screen.getByText('30:00')).toBeInTheDocument();
});
