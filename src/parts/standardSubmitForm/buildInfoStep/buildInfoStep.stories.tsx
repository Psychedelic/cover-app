import {ComponentMeta, ComponentStoryObj} from '@storybook/react';
import {MemoryRouter} from 'react-router-dom';

import {BuildInfoStep} from './buildInfoStep';

const meta: ComponentMeta<typeof BuildInfoStep> = {
  title: 'Parts/BuildInfoStep',
  component: BuildInfoStep,
  decorators: [
    Story => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    )
  ]
};
export default meta;

export const Example: ComponentStoryObj<typeof BuildInfoStep> = {
  args: {}
};
