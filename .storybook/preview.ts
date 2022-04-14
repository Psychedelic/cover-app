import {themes} from '@storybook/theming';
export const parameters = {
  actions: {argTypesRegex: '^on[A-Z].*'},
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  backgrounds: {
    default: 'cover',
    values: [
      {
        name: 'cover',
        value: '#171717'
      }
    ]
  },
  darkMode: {
    dark: {...themes.dark, appBg: '#171717'},
    current: 'dark'
  }
};
