import {ComponentMeta, ComponentStoryObj} from '@storybook/react';

import {Dot} from './dot';

const meta: ComponentMeta<typeof Dot> = {
  title: 'Cores/Dot',
  component: Dot
};
export default meta;

export const Hollow: ComponentStoryObj<typeof Dot> = {
  args: {
    type: 'hollow'
  }
};

export const Green: ComponentStoryObj<typeof Dot> = {
  args: {
    type: 'green'
  }
};

export const Red: ComponentStoryObj<typeof Dot> = {
  args: {
    type: 'red'
  }
};

export const Yellow: ComponentStoryObj<typeof Dot> = {
  args: {
    type: 'yellow'
  }
};

export const GreenIcon: ComponentStoryObj<typeof Dot> = {
  args: {
    type: 'green',
    asIcon: true
  }
};

export const RedIcon: ComponentStoryObj<typeof Dot> = {
  args: {
    type: 'red',
    asIcon: true
  }
};

export const YellowIcon: ComponentStoryObj<typeof Dot> = {
  args: {
    type: 'yellow',
    asIcon: true
  }
};
