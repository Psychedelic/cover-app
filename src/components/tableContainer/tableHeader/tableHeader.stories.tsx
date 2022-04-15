import {ComponentMeta, ComponentStoryObj} from '@storybook/react';

import {TableHeader} from './tableHeader';

const meta: ComponentMeta<typeof TableHeader> = {
  title: 'Components/TableHeader',
  component: TableHeader
};
export default meta;

export const EmptyHeader: ComponentStoryObj<typeof TableHeader> = {
  args: {
    children: []
  }
};

export const HeaderWithAttribute: ComponentStoryObj<typeof TableHeader> = {
  args: {
    children: ['Recent Activities']
  }
};
