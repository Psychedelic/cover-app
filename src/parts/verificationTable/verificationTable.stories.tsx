import {ComponentMeta, ComponentStoryObj} from '@storybook/react';

import {VerificationTable} from './verificationTable';

const meta: ComponentMeta<typeof VerificationTable> = {
  title: 'Parts/VerificationTable',
  component: VerificationTable
};
export default meta;

export const Example: ComponentStoryObj<typeof VerificationTable> = {
  args: {
    verifications: [
      {
        isVerified: true,
        canisterId: 'hello',
        name: 'xxx',
        repo: 'abc',
        gitCommit: '1fkasdf',
        wasmHash: '23fsadfasd',
        lastVerified: '31231 3123'
      },
      {
        isVerified: true,
        canisterId: 'hello1',
        name: 'xxx',
        repo: 'abc',
        gitCommit: '1fkasdf',
        wasmHash: '23fsadfasd',
        lastVerified: '31231 3123'
      },
      {
        isVerified: false,
        canisterId: 'hello3',
        name: 'xxx',
        repo: 'abc',
        gitCommit: '1fkasdf',
        wasmHash: '23fsadfasd',
        lastVerified: '31231 3123'
      }
    ]
  }
};
