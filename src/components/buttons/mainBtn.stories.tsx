import {ComponentMeta, ComponentStoryObj} from '@storybook/react';

import {MainBtn} from './mainBtn';

const meta: ComponentMeta<typeof MainBtn> = {
  title: 'Example/Button',
  component: MainBtn
};
export default meta;

export const Primary: ComponentStoryObj<typeof MainBtn> = {
  args: {
    primary: true,
    label: 'Button'
  }
};

export const Secondary: ComponentStoryObj<typeof MainBtn> = {
  args: {
    label: 'Button'
  }
};

export const Large: ComponentStoryObj<typeof MainBtn> = {
  args: {
    size: 'large',
    label: 'Button'
  }
};

export const Small: ComponentStoryObj<typeof MainBtn> = {
  args: {
    size: 'small',
    label: 'Button'
  }
};
