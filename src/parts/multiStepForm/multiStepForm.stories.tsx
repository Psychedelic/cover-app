import {ComponentMeta, ComponentStoryObj} from '@storybook/react';
import {MemoryRouter} from 'react-router-dom';

import {MultiStepForm} from './multiStepForm';

const meta: ComponentMeta<typeof MultiStepForm> = {
  title: 'Parts/MultiStepForm',
  component: MultiStepForm,
  decorators: [
    Story => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    )
  ]
};
export default meta;

export const Example: ComponentStoryObj<typeof MultiStepForm> = {
  args: {}
};
