import {ComponentMeta, ComponentStoryObj} from '@storybook/react';

import {StatsTable} from './statsTable';

const meta: ComponentMeta<typeof StatsTable> = {
  title: 'Parts/StatsTable',
  component: StatsTable
};
export default meta;

export const WithData: ComponentStoryObj<typeof StatsTable> = {
  args: {
    defaultStats: {
      rustCanistersCount: '2,473',
      motokoCanistersCount: '3,823',
      totalCanisters: '6,296',
      buildSuccessCount: '4,012'
    }
  }
};

export const Default: ComponentStoryObj<typeof StatsTable> = {
  args: {}
};
