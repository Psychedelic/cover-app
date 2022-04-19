import {ComponentMeta, ComponentStoryObj} from '@storybook/react';

import {Header} from './header';

const meta: ComponentMeta<typeof Header> = {
  title: 'Parts/Header',
  component: Header
};
export default meta;

export const Example: ComponentStoryObj<typeof Header> = {
  args: {}
};
