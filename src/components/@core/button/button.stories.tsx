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
    kind: 'main',
    size: 'medium'
  }
};

export const LargeMain: ComponentStoryObj<typeof Button> = {
  args: {
    children: 'Large Main',
    kind: 'main',
    size: 'large'
  }
};

export const MediumOutline: ComponentStoryObj<typeof Button> = {
  args: {
    children: 'Medium Secondary',
    kind: 'outline',
    size: 'medium'
  }
};

export const LargeOutline: ComponentStoryObj<typeof Button> = {
  args: {
    children: 'Large Secondary',
    kind: 'outline',
    size: 'large'
  }
};

export const MediumText: ComponentStoryObj<typeof Button> = {
  args: {
    children: 'Medium Text',
    kind: 'text',
    size: 'medium'
  }
};

export const LargeText: ComponentStoryObj<typeof Button> = {
  args: {
    children: 'Large Text',
    kind: 'text',
    size: 'large'
  }
};
