import {ComponentMeta, ComponentStoryObj} from '@storybook/react';

import {Pagination} from './pagination';

const meta: ComponentMeta<typeof Pagination> = {
  title: 'Cores/Pagination',
  component: Pagination
};
export default meta;

export const Example: ComponentStoryObj<typeof Pagination> = {
  args: {
    page: '6'
  }
};
