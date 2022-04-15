import {ComponentMeta, ComponentStoryObj} from '@storybook/react';

import {Button} from './button';

const meta: ComponentMeta<typeof Button> = {
  title: 'Components/Button',
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

export const MediumSecondary: ComponentStoryObj<typeof Button> = {
  args: {
    children: 'Medium Secondary',
    type: 'secondary',
    size: 'medium'
  }
};

export const LargeSecondary: ComponentStoryObj<typeof Button> = {
  args: {
    children: 'Large Secondary',
    type: 'secondary',
    size: 'large'
  }
};

export const MediumHollow: ComponentStoryObj<typeof Button> = {
  args: {
    children: 'Medium Hollow',
    type: 'hollow',
    size: 'medium'
  }
};

export const LargeHollow: ComponentStoryObj<typeof Button> = {
  args: {
    children: 'Large Hollow',
    type: 'hollow',
    size: 'large'
  }
};
