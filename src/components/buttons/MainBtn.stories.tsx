import {ComponentStory, ComponentMeta} from '@storybook/react';

import {MainBtn} from './MainBtn';

export default {
  title: 'Button/MainBtn',
  component: MainBtn,
  argTypes: {
    backgroundColor: {control: 'color'}
  }
} as ComponentMeta<typeof MainBtn>;

const Template: ComponentStory<typeof MainBtn> = () => <MainBtn />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Button'
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Button'
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: 'Button'
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'Button'
};
