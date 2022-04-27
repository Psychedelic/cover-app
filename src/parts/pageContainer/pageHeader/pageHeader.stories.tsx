import {ComponentMeta, ComponentStoryObj} from '@storybook/react';
import {MemoryRouter} from 'react-router-dom';

import {PageHeader} from './pageHeader';

const meta: ComponentMeta<typeof PageHeader> = {
  title: 'Parts/PageHeader',
  component: PageHeader,
  decorators: [
    Story => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    )
  ]
};
export default meta;

export const Example: ComponentStoryObj<typeof PageHeader> = {
  args: {}
};
