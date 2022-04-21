import {ComponentMeta, ComponentStoryObj} from '@storybook/react';

import {CopyableText} from './copyableText';

const meta: ComponentMeta<typeof CopyableText> = {
  title: 'Cores/CopyableText',
  component: CopyableText
};
export default meta;

export const White: ComponentStoryObj<typeof CopyableText> = {
  args: {
    children: 'rrkah-fqaaa-aaaaa-aaaaq-cai'
  }
};

export const Gray: ComponentStoryObj<typeof CopyableText> = {
  args: {
    children: 'rrkah-fqaaa-aaaaa-aaaaq-cai',
    color: 'gray'
  }
};
