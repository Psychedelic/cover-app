import {ComponentMeta, ComponentStoryObj} from '@storybook/react';

import {Dot} from './dot';

const meta: ComponentMeta<typeof Dot> = {
  title: 'Cores/Dot',
  component: Dot
};
export default meta;

export const Hollow: ComponentStoryObj<typeof Dot> = {
  args: {
    kind: 'hollow'
  }
};

export const Green: ComponentStoryObj<typeof Dot> = {
  args: {
    kind: 'green'
  }
};

export const Red: ComponentStoryObj<typeof Dot> = {
  args: {
    kind: 'red'
  }
};

export const Yellow: ComponentStoryObj<typeof Dot> = {
  args: {
    kind: 'yellow'
  }
};

export const GreenIcon: ComponentStoryObj<typeof Dot> = {
  args: {
    kind: 'green',
    asIcon: true
  }
};

export const RedIcon: ComponentStoryObj<typeof Dot> = {
  args: {
    kind: 'red',
    asIcon: true
  }
};

export const YellowIcon: ComponentStoryObj<typeof Dot> = {
  args: {
    kind: 'yellow',
    asIcon: true
  }
};
