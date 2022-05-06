import {ComponentMeta, ComponentStoryObj} from '@storybook/react';

import {InfoDialog} from './infoDialog';

const meta: ComponentMeta<typeof InfoDialog> = {
  title: 'Components/InfoDialog',
  component: InfoDialog
};
export default meta;

export const Default: ComponentStoryObj<typeof InfoDialog> = {
  args: {
    open: true
  }
};
