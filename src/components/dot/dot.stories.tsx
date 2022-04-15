import {ComponentMeta, ComponentStoryObj} from '@storybook/react';

import {Dot} from './dot';

const meta: ComponentMeta<typeof Dot> = {
  title: 'Components/Dot',
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
