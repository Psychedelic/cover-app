import {ComponentMeta, ComponentStoryObj} from '@storybook/react';

import {FormInput} from './formInput';

const meta: ComponentMeta<typeof FormInput> = {
  title: 'Components/FormInput',
  component: FormInput
};
export default meta;

export const InputExample: ComponentStoryObj<typeof FormInput> = {
  args: {
    label: 'FormInput Example Label'
  }
};

export const TextareaExample: ComponentStoryObj<typeof FormInput> = {
  args: {
    label: 'Textarea Example Label',
    textarea: true,
    rows: 7
  }
};
