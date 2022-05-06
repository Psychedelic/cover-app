import {ComponentMeta, ComponentStoryObj} from '@storybook/react';

import {ActivityTable} from './activityTable';

const meta: ComponentMeta<typeof ActivityTable> = {
  title: 'Parts/ActivityTable',
  component: ActivityTable
};
export default meta;

export const WithData: ComponentStoryObj<typeof ActivityTable> = {
  args: {
    activity: [
      {
        buildStatus: 'Success',
        canisterId: 'rrkah-fqaaa-aaaaa-aaaaq-cai',
        datetime: new Date().toString()
      },
      {
        buildStatus: 'Pending',
        canisterId: 'rrkah-fqaaa-aaaaa-aaaaq-cai',
        datetime: new Date(Date.now() - 59 * 1000).toString()
      },
      {
        buildStatus: 'Pending',
        canisterId: 'rrkah-fqaaa-aaaaa-aaaaq-cai',
        datetime: new Date(Date.now() - 60 * 1000).toString()
      },
      {
        buildStatus: 'Pending',
        canisterId: 'iftvq-niaaa-aaaai-qasga-cai',
        datetime: new Date(Date.now() - 60 * 1000 * 59).toString()
      },
      {
        buildStatus: 'Pending',
        canisterId: 'iftvq-niaaa-aaaai-qasga-cai',
        datetime: new Date(Date.now() - 60 * 1000 * 60).toString()
      },
      {
        buildStatus: 'Building',
        canisterId: 'utozz-siaaa-aaaam-qaaxq-cai',
        datetime: new Date(Date.now() - 60 * 1000 * 60 * 23).toString()
      },
      {
        buildStatus: 'Success',
        canisterId: 'utozz-siaaa-aaaam-qaaxq-cai',
        datetime: new Date(Date.now() - 60 * 1000 * 60 * 24).toString()
      },
      {
        buildStatus: 'Pending',
        canisterId: 'utozz-siaaa-aaaam-qaaxq-cai',
        datetime: new Date(Date.now() - 60 * 1000 * 60 * 99999).toString()
      }
    ]
  }
};

export const Loading: ComponentStoryObj<typeof ActivityTable> = {
  args: {
    activity: [{}, {}, {}, {}, {}, {}, {}, {}]
  }
};
