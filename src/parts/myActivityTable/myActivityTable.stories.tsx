import {ComponentMeta, ComponentStoryObj} from '@storybook/react';

import {MyActivityTable} from './myActivityTable';

const meta: ComponentMeta<typeof MyActivityTable> = {
  title: 'Parts/MyActivityTable',
  component: MyActivityTable
};
export default meta;

export const WithData: ComponentStoryObj<typeof MyActivityTable> = {
  args: {
    defaultActivity: [
      {
        buildStatus: 'Success',
        canisterId: 'rrkah-fqaaa-aaaaa-aaaaq-cai',
        datetime: new Date()
      },
      {
        buildStatus: 'Pending',
        canisterId: 'rrkah-fqaaa-aaaaa-aaaaq-cai',
        datetime: new Date(Date.now() - 59 * 1000)
      },
      {
        buildConfigStatus: 'Save Config',
        canisterId: 'rrkah-fqaaa-aaaaa-aaaaq-cai',
        datetime: new Date(Date.now() - 60 * 1000)
      },
      {
        buildStatus: 'Error',
        canisterId: 'iftvq-niaaa-aaaai-qasga-cai',
        datetime: new Date(Date.now() - 60 * 1000 * 59)
      },
      {
        buildStatus: 'Pending',
        canisterId: 'iftvq-niaaa-aaaai-qasga-cai',
        datetime: new Date(Date.now() - 60 * 1000 * 60)
      },
      {
        buildConfigStatus: 'Save Config',
        canisterId: 'utozz-siaaa-aaaam-qaaxq-cai',
        datetime: new Date(Date.now() - 60 * 1000 * 60 * 23)
      },
      {
        buildStatus: 'Success',
        canisterId: 'utozz-siaaa-aaaam-qaaxq-cai',
        datetime: new Date(Date.now() - 60 * 1000 * 60 * 24)
      },
      {
        buildConfigStatus: 'Delete Config',
        canisterId: 'utozz-siaaa-aaaam-qaaxq-cai',
        datetime: new Date(Date.now() - 60 * 1000 * 60 * 99999)
      }
    ]
  }
};

export const Loading: ComponentStoryObj<typeof MyActivityTable> = {
  args: {}
};

export const Empty: ComponentStoryObj<typeof MyActivityTable> = {
  args: {
    defaultActivity: []
  }
};
