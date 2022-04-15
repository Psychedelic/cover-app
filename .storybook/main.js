const {mergeConfig} = require('vite');
const {resolve} = require('path');

module.exports = {
  framework: '@storybook/react',
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-a11y', '@storybook/addon-links', '@storybook/addon-essentials'],
  core: {
    builder: '@storybook/builder-vite'
  },
  features: {
    storyStoreV7: true
  },
  viteFinal: async (config, {configType}) =>
    mergeConfig(config, {
      resolve: {
        alias: {
          '@': resolve(__dirname, '../src')
        }
      }
    }),
  previewBody: body => `
    ${body}
    <style>
      html {
        background-color: #171717;
        font-family: Monaco, sans-serif;
      }
    </style>
  `
};
