import {ComponentMeta, ComponentStoryObj} from '@storybook/react';

import {MainBtn} from './mainBtn';

const meta: ComponentMeta<typeof MainBtn> = {
  title: 'Example/Button',
  component: MainBtn
};
export default meta;

export const Primary: ComponentStoryObj<typeof MainBtn> = {
  args: {
    children: 'Button'
  }
};
