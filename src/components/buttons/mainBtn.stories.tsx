import {ComponentMeta, ComponentStoryObj} from '@storybook/react';

import {MainBtn} from './mainBtn';

const meta: ComponentMeta<typeof MainBtn> = {
  title: 'Example/Button',
  component: MainBtn
};
export default meta;

export const Primary: ComponentStoryObj<typeof MainBtn> = {
  args: {
    textContent: 'Button'
  }
};

export const Secondary: ComponentStoryObj<typeof MainBtn> = {
  args: {
    textContent: 'Button'
  }
};

export const Large: ComponentStoryObj<typeof MainBtn> = {
  args: {
    textContent: 'Button'
  }
};

export const Small: ComponentStoryObj<typeof MainBtn> = {
  args: {
    textContent: 'Button'
  }
};
