import {ComponentMeta, ComponentStoryObj} from '@storybook/react';
import {MemoryRouter} from 'react-router-dom';

import {SubmitForm} from './submitForm';

const meta: ComponentMeta<typeof SubmitForm> = {
  title: 'Parts/SubmitForm',
  component: SubmitForm,
  decorators: [
    Story => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    )
  ]
};
export default meta;

export const Example: ComponentStoryObj<typeof SubmitForm> = {
  args: {}
};
