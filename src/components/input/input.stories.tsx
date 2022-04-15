import {ComponentMeta, ComponentStoryObj} from '@storybook/react';

import {Input} from './input';

const meta: ComponentMeta<typeof Input> = {
  title: 'Components/Input',
  component: Input
};
export default meta;

export const Example: ComponentStoryObj<typeof Input> = {
  args: {
    placeholder: 's4jec-wiaaa-aaaah-qch4q-cai'
  }
};
