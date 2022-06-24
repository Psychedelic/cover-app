import {ComponentMeta, ComponentStoryObj} from '@storybook/react';

import {MenuItems} from './menuItems';

const meta: ComponentMeta<typeof MenuItems> = {
  title: 'Components/MenuItems',
  component: MenuItems
};
export default meta;

export const Default: ComponentStoryObj<typeof MenuItems> = {
  args: {}
};
