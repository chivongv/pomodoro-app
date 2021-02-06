import React from 'react';
import { render } from '../utils/test-utils';
import { axe } from 'jest-axe';
import SettingsModal from '../components/SettingsModal';

test('Should pass accessibility checks', async () => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const { container } = render(<SettingsModal toggleSettings={() => {}} />);

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
