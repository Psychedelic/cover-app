import {ComponentMeta, ComponentStoryObj} from '@storybook/react';

import {TableContainer} from './tableContainer';

const meta: ComponentMeta<typeof TableContainer> = {
  title: 'Components/TableContainer',
  component: TableContainer
};
export default meta;

export const TableContainerExample: ComponentStoryObj<typeof TableContainer> = {
  args: {
    children: 'This is a table container'
  }
};
