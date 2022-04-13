import {ComponentMeta, ComponentStoryObj} from '@storybook/react';

import {Button} from './button';

const meta: ComponentMeta<typeof Button> = {
  title: 'Example/Button',
  component: Button
};
export default meta;

export const MainBtn: ComponentStoryObj<typeof Button> = {
  args: {
    children: 'Button',
    type: 'main',
    size: 'medium'
  }
};

export const SecondaryBtn: ComponentStoryObj<typeof Button> = {
  args: {
    children: 'Secondary Button',
    type: 'secondary',
    size: 'large'
  }
};
