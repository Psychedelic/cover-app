import {ComponentMeta, ComponentStoryObj} from '@storybook/react';

import {StatusDot} from '@/components/statusDots/statusDot';

const meta: ComponentMeta<typeof StatusDot> = {
  title: 'Example/StatusDot',
  component: StatusDot
};
export default meta;

export const SuccessDot: ComponentStoryObj<typeof StatusDot> = {
  args: {
    status: 'success'
  }
};
