import {ComponentMeta, ComponentStoryObj} from '@storybook/react';

import {Loading} from './loading';

const meta: ComponentMeta<typeof Loading> = {
  title: 'Components/Loading',
  component: Loading
};
export default meta;

export const Default: ComponentStoryObj<typeof Loading> = {
  args: {}
};
