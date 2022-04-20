import {ComponentMeta, ComponentStoryObj} from '@storybook/react';

import {ActivityTable} from './activityTable';

const meta: ComponentMeta<typeof ActivityTable> = {
  title: 'Parts/ActivityTable',
  component: ActivityTable
};
export default meta;

export const Example: ComponentStoryObj<typeof ActivityTable> = {
  args: {
    activities: [
      {
        status: 'Success',
        canisterId: 's4jec...cai',
        datetime: '2s'
      },
      {
        status: 'Pending',
        canisterId: 'iftvq...cai',
        datetime: '1h'
      },
      {
        status: 'Failed',
        canisterId: 'utozz...cai',
        datetime: '23h'
      }
    ]
  }
};
