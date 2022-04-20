import {ComponentMeta, ComponentStoryObj} from '@storybook/react';

import {Button} from './button';

const meta: ComponentMeta<typeof Button> = {
  title: 'Cores/Button',
  component: Button
};
export default meta;

export const MediumMain: ComponentStoryObj<typeof Button> = {
  args: {
    children: 'Medium Main',
    type: 'main',
    size: 'medium'
  }
};

export const LargeMain: ComponentStoryObj<typeof Button> = {
  args: {
    children: 'Large Main',
    type: 'main',
    size: 'large'
  }
};

export const MediumOutline: ComponentStoryObj<typeof Button> = {
  args: {
    children: 'Medium Secondary',
    type: 'outline',
    size: 'medium'
  }
};

export const LargeOutline: ComponentStoryObj<typeof Button> = {
  args: {
    children: 'Large Secondary',
    type: 'outline',
    size: 'large'
  }
};

export const MediumText: ComponentStoryObj<typeof Button> = {
  args: {
    children: 'Medium Text',
    type: 'text',
    size: 'medium'
  }
};

export const LargeText: ComponentStoryObj<typeof Button> = {
  args: {
    children: 'Large Text',
    type: 'text',
    size: 'large'
  }
};
