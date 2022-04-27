import {ComponentMeta, ComponentStoryObj} from '@storybook/react';

import {SubmitForm} from './submitForm';

const meta: ComponentMeta<typeof SubmitForm> = {
  title: 'Parts/SubmitForm',
  component: SubmitForm
};
export default meta;

export const SubmitVerification: ComponentStoryObj<typeof SubmitForm> = {
  args: {}
};
