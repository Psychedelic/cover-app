import {ComponentMeta, ComponentStoryObj} from '@storybook/react';

import {Btn} from './btn';

const meta: ComponentMeta<typeof Btn> = {
  title: 'Example/Button',
  component: Btn
};
export default meta;

export const DefaultBtn: ComponentStoryObj<typeof Btn> = {
  args: {
    children: 'Button'
  }
};
