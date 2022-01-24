import React from 'react';

import Theme from '../src/theme/Theme';
import { ThemeStore } from '../src/theme/ThemeStore';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  (Story) => (
    <ThemeStore>
      <Theme>
        <Story />
      </Theme>
    </ThemeStore>
  ),
];