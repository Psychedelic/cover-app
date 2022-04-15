import {ComponentMeta, ComponentStoryObj} from '@storybook/react';

import {Button} from './button';

const meta: ComponentMeta<typeof Button> = {
  title: 'Components/Button',
  component: Button
};
export default meta;

export const MediumMain: ComponentStoryObj<typeof Button> = {
  args: {
    children: 'Main',
    type: 'main',
    size: 'medium'
  }
};

export const LargeSecondary: ComponentStoryObj<typeof Button> = {
  args: {
    children: 'Secondary',
    type: 'secondary',
    size: 'large'
  }
};
