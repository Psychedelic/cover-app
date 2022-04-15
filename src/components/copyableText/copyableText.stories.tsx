import {ComponentMeta, ComponentStoryObj} from '@storybook/react';

import {CopyableText} from './copyableText';

const meta: ComponentMeta<typeof CopyableText> = {
  title: 'Components/CopyableText',
  component: CopyableText
};
export default meta;

export const Example: ComponentStoryObj<typeof CopyableText> = {
  args: {
    children: 'Copyable Text'
  }
};
