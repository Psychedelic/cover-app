import {ComponentMeta, ComponentStoryObj} from '@storybook/react';

import {ErrorDialog} from './errorDialog';

const meta: ComponentMeta<typeof ErrorDialog> = {
  title: 'Components/ErrorDialog',
  component: ErrorDialog
};
export default meta;

export const Default: ComponentStoryObj<typeof ErrorDialog> = {
  args: {
    open: true
  }
};
