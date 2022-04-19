import {ComponentMeta, ComponentStoryObj} from '@storybook/react';

import {SearchBar} from './searchBar';

const meta: ComponentMeta<typeof SearchBar> = {
  title: 'Components/SearchBar',
  component: SearchBar
};
export default meta;

export const Example: ComponentStoryObj<typeof SearchBar> = {
  args: {}
};
