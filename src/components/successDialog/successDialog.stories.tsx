import {ComponentMeta, ComponentStoryObj} from '@storybook/react';

import {SuccessDialog} from '@/components';

const meta: ComponentMeta<typeof SuccessDialog> = {
  title: 'Components/SuccessDialog',
  component: SuccessDialog
};
export default meta;

export const Default: ComponentStoryObj<typeof SuccessDialog> = {
  args: {
    open: true
  }
};
