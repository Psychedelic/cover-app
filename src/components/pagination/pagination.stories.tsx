import {ComponentMeta, ComponentStoryObj} from '@storybook/react';

import {Pagination} from './pagination';

const meta: ComponentMeta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination
};
export default meta;

export const Default: ComponentStoryObj<typeof Pagination> = {
  args: {}
};

export const WithPages: ComponentStoryObj<typeof Pagination> = {
  args: {
    defaultPage: 2,
    totalPage: 50
  }
};

export const ForceDisable: ComponentStoryObj<typeof Pagination> = {
  args: {
    defaultPage: 40,
    totalPage: 50,
    disablePaginated: true
  }
};
