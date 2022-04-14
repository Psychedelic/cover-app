import {ComponentMeta, ComponentStoryObj} from '@storybook/react';

import {Dot} from './dot';

const meta: ComponentMeta<typeof Dot> = {
  title: 'Components/Dot',
  component: Dot
};
export default meta;

export const Green: ComponentStoryObj<typeof Dot> = {
  args: {
    status: 'green'
  }
};

export const Red: ComponentStoryObj<typeof Dot> = {
  args: {
    status: 'red'
  }
};

export const Yellow: ComponentStoryObj<typeof Dot> = {
  args: {
    status: 'yellow'
  }
};
