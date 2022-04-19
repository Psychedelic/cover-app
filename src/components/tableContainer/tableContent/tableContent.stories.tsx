import {ComponentMeta, ComponentStoryObj} from '@storybook/react';

import {TableContent} from './tableContent';

const meta: ComponentMeta<typeof TableContent> = {
  title: 'Components/TableContent',
  component: TableContent
};
export default meta;

export const content: ComponentStoryObj<typeof TableContent> = {
  args: {
    children: ['Canister ID', 'Name', 'Repo'],
    css: {}
  }
};
