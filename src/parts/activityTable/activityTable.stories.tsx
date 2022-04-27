import {ComponentMeta, ComponentStoryObj} from '@storybook/react';

import {ActivityTable} from './activityTable';

const meta: ComponentMeta<typeof ActivityTable> = {
  title: 'Parts/ActivityTable',
  component: ActivityTable
};
export default meta;

export const WithData: ComponentStoryObj<typeof ActivityTable> = {
  args: {
    activities: [
      {
        status: 'Success',
        canisterId: 'rrkah-fqaaa-aaaaa-aaaaq-cai',
        datetime: new Date().toString()
      },
      {
        status: 'Pending',
        canisterId: 'rrkah-fqaaa-aaaaa-aaaaq-cai',
        datetime: new Date(Date.now() - 59 * 1000).toString()
      },
      {
        status: 'Failed',
        canisterId: 'rrkah-fqaaa-aaaaa-aaaaq-cai',
        datetime: new Date(Date.now() - 60 * 1000).toString()
      },
      {
        status: 'Pending',
        canisterId: 'iftvq-niaaa-aaaai-qasga-cai',
        datetime: new Date(Date.now() - 60 * 1000 * 59).toString()
      },
      {
        status: 'Failed',
        canisterId: 'iftvq-niaaa-aaaai-qasga-cai',
        datetime: new Date(Date.now() - 60 * 1000 * 60).toString()
      },
      {
        status: 'Failed',
        canisterId: 'utozz-siaaa-aaaam-qaaxq-cai',
        datetime: new Date(Date.now() - 60 * 1000 * 60 * 23).toString()
      },
      {
        status: 'Success',
        canisterId: 'utozz-siaaa-aaaam-qaaxq-cai',
        datetime: new Date(Date.now() - 60 * 1000 * 60 * 24).toString()
      },
      {
        status: 'Pending',
        canisterId: 'utozz-siaaa-aaaam-qaaxq-cai',
        datetime: new Date(Date.now() - 60 * 1000 * 60 * 99999).toString()
      }
    ]
  }
};

export const Loading: ComponentStoryObj<typeof ActivityTable> = {
  args: {
    activities: [{}, {}, {}, {}, {}, {}, {}, {}]
  }
};
