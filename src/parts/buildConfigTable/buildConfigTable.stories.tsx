import {ComponentMeta, ComponentStoryObj} from '@storybook/react';
import {MemoryRouter} from 'react-router-dom';

import {BuildConfigTable} from './buildConfigTable';

const meta: ComponentMeta<typeof BuildConfigTable> = {
  title: 'Parts/BuildConfigTable',
  component: BuildConfigTable,
  decorators: [
    Story => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    )
  ]
};
export default meta;

export const WithData: ComponentStoryObj<typeof BuildConfigTable> = {
  args: {
    defaultBuildConfigs: [
      {
        canisterId: 'rrkah-fqaaa-aaaaa-aaaaq-cai',
        name: 'my_local_canister',
        repo: '/sonic',
        gitCommit: '54102a5871a3146a821eea36a8fef76a345a6dd2',
        lastActivity: new Date(2020, 11, 10),
        callerId: 'erhcf-gmf7q-o3dal-7hhou-dcduc-vserz-hmyrn-jhmkr-2icvq-r6b5x-dqe',
        rustVersion: '1.59.0',
        dfxVersion: '0.9.3',
        optimizeCount: '1',
        lastBuildWasmHash: '0xae173b2e914bac019d0b1f2210fcc3b26b84d39da4a80b4e156fb7dc249291a9',
        lastBuildUrl: 'https://github.com/Psychedelic/cover/actions/runs/2096948851',
        lastBuildStatus: 'Pending',
        lastBuildRepoVisibility: 'Public',
        lastBuildCanisterType: 'Rust',
        isVerified: false,
        wasmHash: '0xae173b2e914bac019d0b1f2210fcc3b26b84d39da4a80b4e156fb7dc249291a9'
      },
      {
        canisterId: 'iftvq-niaaa-aaaai-qasga-cai',
        name: 'cover_test',
        repo: '/cover',
        gitCommit: 'a0a4428275018a5e7d7391556d060294393aec30',
        lastActivity: new Date(2021, 11, 20),
        callerId: 'j3dqd-46f74-s45g5-yt6qa-c5vyq-4zv7t-y4iie-omikc-cjngg-olpgg-rqe',
        rustVersion: 'N/A',
        dfxVersion: '0.9.3',
        optimizeCount: '0',
        lastBuildWasmHash: '0xb809d6b1713f68f8a042bc51878fd57640ee46aaa3ddae9e09ac25c37feb6cb5',
        lastBuildUrl: 'https://github.com/Psychedelic/cover/actions/runs/2096948851',
        lastBuildStatus: 'Building',
        lastBuildRepoVisibility: 'Private',
        lastBuildCanisterType: 'Custom',
        isVerified: false,
        wasmHash: '0xb809d6b1713f68f8a042bc51878fd57640ee46aaa3ddae9e09ac25c37feb6cb5'
      },
      {
        canisterId: 'utozz-siaaa-aaaam-qaaxq-cai',
        name: 'WICP',
        repo: '/wicp',
        gitCommit: '7e654d94c514e709d4b25374820149997305f6ad',
        lastActivity: new Date(2021, 11, 29),
        callerId: 'v4ehh-6sqi7-irvn2-s43ef-enl26-h7vtu-kymgf-ikejl-k7mdv-wypuo-kqe',
        rustVersion: 'N/A',
        dfxVersion: '0.9.3',
        optimizeCount: '0',
        lastBuildWasmHash: '0x5b872f9177b871b6f957f0268ce0f5722008a5abc45f9d2bef28e9300ad9693e',
        lastBuildUrl: 'https://github.com/Psychedelic/cover/actions/runs/2096948851',
        lastBuildStatus: 'Success',
        lastBuildRepoVisibility: 'Public',
        lastBuildCanisterType: 'Motoko',
        isVerified: true,
        wasmHash: '0x5b872f9177b871b6f957f0268ce0f5722008a5abc45f9d2bef28e9300ad9693e'
      },
      {
        isVerified: false,
        canisterId: '3x7en-uqaaa-aaaai-abgca-cai',
        name: 'cover_test',
        repo: '/cover',
        gitCommit: '7e654d94c514e709d4b25374820149997305f6ad',
        wasmHash: '0x5b872f9177b871b6f957f0268ce0f5722008a5abc45f9d2bef28e9300ad9693e',
        lastActivity: new Date(2021, 11, 29),
        callerId: 'v4ehh-6sqi7-irvn2-s43ef-enl26-h7vtu-kymgf-ikejl-k7mdv-wypuo-kqe',
        rustVersion: 'N/A',
        dfxVersion: '0.9.3',
        optimizeCount: '0'
      }
    ]
  }
};

export const Loading: ComponentStoryObj<typeof BuildConfigTable> = {
  args: {}
};