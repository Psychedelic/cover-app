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
        canisterId: 'rrkah-fqaaa-aaaaa-aaaaq-cai',
        name: 'my_local_canister',
        repo: '/sonic',
        gitCommit: '54102a5871a3146a821eea36a8fef76a345a6dd2',
        wasmHash: '0xae173b2e914bac019d0b1f2210fcc3b26b84d39da4a80b4e156fb7dc249291a9',
        lastVerified: '12/10/2020',
        ownerId: 'erhcf-gmf7q-o3dal-7hhou-dcduc-vserz-hmyrn-jhmkr-2icvq-r6b5x-dqe',
        repoVisibility: 'Public',
        rustVersion: '1.59.0',
        canisterType: 'Rust',
        dfxVersion: '0.9.3',
        optimizeCount: '1',
        buildWasmHash: '0xae173b2e914bac019d0b1f2210fcc3b26b84d39da4a80b4e156fb7dc249291a9',
        buildUrl: 'https://github.com/Psychedelic/cover/actions/runs/2096948851'
      },
      {
        isVerified: true,
        canisterId: 'iftvq-niaaa-aaaai-qasga-cai',
        name: 'cover_test',
        repo: '/cover',
        gitCommit: 'a0a4428275018a5e7d7391556d060294393aec30',
        wasmHash: '0xb809d6b1713f68f8a042bc51878fd57640ee46aaa3ddae9e09ac25c37feb6cb5',
        lastVerified: '12/20/2021',
        ownerId: 'j3dqd-46f74-s45g5-yt6qa-c5vyq-4zv7t-y4iie-omikc-cjngg-olpgg-rqe',
        repoVisibility: 'Private',
        rustVersion: 'N/A',
        canisterType: 'Motoko',
        dfxVersion: '0.9.3',
        optimizeCount: '0',
        buildWasmHash: '0xb809d6b1713f68f8a042bc51878fd57640ee46aaa3ddae9e09ac25c37feb6cb5',
        buildUrl: 'https://github.com/Psychedelic/cover/actions/runs/2096948851'
      }
    ]
  }
};
