import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, fireEvent, waitForElementToBeRemoved } from '../utils/test-utils';
import Pomodoro from '../components/Pomodoro';

test('Should be able to start, pause, skip and reset', () => {
  render(<Pomodoro />);

  expect(screen.queryByRole('button', { name: /start/i })).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /reset/i })).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /settings/i })).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /pause/i })).not.toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /skip/i })).not.toBeInTheDocument();
  expect(screen.getByText(/session 1/i)).toBeInTheDocument();

  userEvent.click(screen.getByRole('button', { name: /start/i }));
  expect(screen.queryByRole('button', { name: /start/i })).not.toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /pause/i })).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /skip/i })).toBeInTheDocument();

  userEvent.click(screen.queryByRole('button', { name: /pause/i }));
  expect(screen.queryByRole('button', { name: /start/i })).toBeInTheDocument();

  userEvent.click(screen.getByRole('button', { name: /skip/i }));
  expect(screen.getByText(/break 1/i)).toBeInTheDocument();

  userEvent.click(screen.getByRole('button', { name: /reset/i }));
  expect(screen.getByText(/session/i)).toBeInTheDocument();
  expect(screen.queryByText(/break/i)).not.toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /pause/i })).not.toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /skip/i })).not.toBeInTheDocument();
});

test('Should able to change session and breaks length', async () => {
  render(<Pomodoro />);
  const settingsButton = await screen.findByRole('button', { name: /settings/i });

  expect(settingsButton).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /close settings/i })).not.toBeInTheDocument();

  userEvent.click(settingsButton);
  const sessionLengthInput = await screen.findByLabelText(/session length/i);
  const shortBreakLengthInput = await screen.findByLabelText(/short break length/i);
  const longBreakLengthInput = await screen.findByLabelText(/long break length/i);
  const sessionAmountInput = await screen.findByLabelText(/session amount/i);
  const closeSettingsButton = await screen.findByRole('button', { name: /close settings/i });
  expect(sessionLengthInput).toBeInTheDocument();
  expect(shortBreakLengthInput).toBeInTheDocument();
  expect(longBreakLengthInput).toBeInTheDocument();
  expect(sessionAmountInput).toBeInTheDocument();
  expect(closeSettingsButton).toBeInTheDocument();

  const fakeSettings = {
    sessionLength: '10',
    shortBreakLength: '9',
    longBreakLength: '30',
    sessionAmount: '2',
  };

  fireEvent.change(sessionLengthInput, { target: { value: fakeSettings.sessionLength } });
  fireEvent.change(shortBreakLengthInput, { target: { value: fakeSettings.shortBreakLength } });
  fireEvent.change(longBreakLengthInput, { target: { value: fakeSettings.longBreakLength } });
  fireEvent.change(sessionAmountInput, { target: { value: fakeSettings.sessionAmount } });
  expect(sessionLengthInput.value).toBe(fakeSettings.sessionLength);
  expect(shortBreakLengthInput.value).toBe(fakeSettings.shortBreakLength);
  expect(longBreakLengthInput.value).toBe(fakeSettings.longBreakLength);
  expect(sessionAmountInput.value).toBe(fakeSettings.sessionAmount);

  userEvent.click(closeSettingsButton);

  expect(screen.getByText('10:00')).toBeInTheDocument();
  userEvent.click(screen.getByRole('button', { name: /start/i }));
  userEvent.click(screen.getByRole('button', { name: /skip/i }));
  expect(screen.getByText('09:00')).toBeInTheDocument();
  userEvent.click(screen.getByRole('button', { name: /skip/i }));
  userEvent.click(screen.getByRole('button', { name: /skip/i }));
  expect(screen.getByText(/long break/i)).toBeInTheDocument();
  expect(screen.getByText('30:00')).toBeInTheDocument();
});
