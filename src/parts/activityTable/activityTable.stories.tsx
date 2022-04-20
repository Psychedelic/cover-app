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
        canisterId: 'rrkah-fqaaa-aaaaa-aaaaq-cai',
        datetime: '2s'
      },
      {
        status: 'Pending',
        canisterId: 'iftvq-niaaa-aaaai-qasga-cai',
        datetime: '1h'
      },
      {
        status: 'Failed',
        canisterId: 'utozz-siaaa-aaaam-qaaxq-ca',
        datetime: '23h'
      }
    ]
  }
};
