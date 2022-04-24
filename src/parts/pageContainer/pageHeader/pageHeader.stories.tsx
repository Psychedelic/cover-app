import {ComponentMeta, ComponentStoryObj} from '@storybook/react';

import {PageHeader} from './pageHeader';

const meta: ComponentMeta<typeof PageHeader> = {
  title: 'Parts/PageHeader',
  component: PageHeader
};
export default meta;

export const Example: ComponentStoryObj<typeof PageHeader> = {
  args: {}
};
