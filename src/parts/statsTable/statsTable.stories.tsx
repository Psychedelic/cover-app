import {ComponentMeta, ComponentStoryObj} from '@storybook/react';

import {StatsTable} from './statsTable';

const meta: ComponentMeta<typeof StatsTable> = {
  title: 'Parts/StatsTable',
  component: StatsTable
};
export default meta;

export const Example: ComponentStoryObj<typeof StatsTable> = {
  args: {}
};
