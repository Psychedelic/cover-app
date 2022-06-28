import {ComponentMeta, ComponentStoryObj} from '@storybook/react';

import {Settings} from './settings';

const meta: ComponentMeta<typeof Settings> = {
  title: 'Components/Settings',
  component: Settings
};
export default meta;

export const Default: ComponentStoryObj<typeof Settings> = {
  args: {}
};
