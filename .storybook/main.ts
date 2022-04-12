const {mergeConfig} = require('vite');
const {resolve} = require('path');

module.exports = {
  framework: '@storybook/react',
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-links',
    '@storybook/addon-essentials'
    // FIXME:
    // https://github.com/storybookjs/builder-vite/issues/292#issuecomment-1083124008
    // '@storybook/addon-interactions'
  ],
  core: {
    builder: '@storybook/builder-vite'
  },
  features: {
    storyStoreV7: true
  },
  async viteFinal(config, {configType}) {
    // return the customized config
    return mergeConfig(config, {
      // customize the Vite config here
      resolve: {
        alias: {
          '@': resolve(__dirname, '../src')
        }
      }
    });
  }
};
