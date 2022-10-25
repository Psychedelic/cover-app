import {ComponentMeta, ComponentStoryObj} from '@storybook/react';
import {MemoryRouter} from 'react-router-dom';

import {GeneralInfoStep} from './generalInfoStep';

const meta: ComponentMeta<typeof GeneralInfoStep> = {
  title: 'Parts/GeneralInfoStep',
  component: GeneralInfoStep,
  decorators: [
    Story => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    )
  ]
};
export default meta;

export const Example: ComponentStoryObj<typeof GeneralInfoStep> = {
  args: {}
};
