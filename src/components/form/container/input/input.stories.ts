import {ComponentMeta, ComponentStoryObj} from '@storybook/react';

import {Input} from './input';

const meta: ComponentMeta<typeof Input> = {
  title: 'Components/Input',
  component: Input
};
export default meta;

export const InputExample: ComponentStoryObj<typeof Input> = {
  args: {
    label: 'Input Example Label'
  }
};

export const TextareaExample: ComponentStoryObj<typeof Input> = {
  args: {
    label: 'Textarea Example Label',
    textarea: true,
    rows: 7
  }
};
