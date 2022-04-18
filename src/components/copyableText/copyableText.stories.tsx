import {ComponentMeta, ComponentStoryObj} from '@storybook/react';

import {CopyableText} from './copyableText';

const meta: ComponentMeta<typeof CopyableText> = {
  title: 'Components/CopyableText',
  component: CopyableText
};
export default meta;

export const White: ComponentStoryObj<typeof CopyableText> = {
  args: {
    children: 'Copyable Text'
  }
};

export const Gray: ComponentStoryObj<typeof CopyableText> = {
  args: {
    children: 'Copyable Text',
    color: 'gray'
  }
};
