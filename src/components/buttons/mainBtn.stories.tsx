import {ComponentStory, ComponentMeta} from '@storybook/react';

import {MainBtn} from './mainBtn';

export default {
  title: 'Button/MainBtn',
  component: MainBtn,
  argTypes: {
    backgroundColor: {control: 'color'}
  }
} as ComponentMeta<typeof MainBtn>;

const Template: ComponentStory<typeof MainBtn> = () => <MainBtn />;

export const Primary = Template.bind({});

export const Secondary = Template.bind({});

export const Large = Template.bind({});

export const Small = Template.bind({});
