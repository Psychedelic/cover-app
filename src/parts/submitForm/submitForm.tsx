import React, {useCallback, useRef} from 'react';

import {CSS} from '@stitches/react';
import {Link} from 'react-router-dom';

import {Core, FormContainer, FormInput, FormInputHandler} from '@/components';
import {DASHBOARD_PATH} from '@/constants';
import {
  coverSDK,
  isFrom1To10,
  isNotEmpty,
  isPrincipal,
  isValidHexFormat,
  isValidRepoFormat,
  isValidVersionFormat
} from '@/utils';

import {StitchesSubmitForm} from './submitForm.styled';

interface PropTypes extends React.ComponentProps<typeof StitchesSubmitForm> {
  css?: CSS;
}

const useRefs = () => ({
  ownerId: useRef<FormInputHandler | null>(null),
  canisterId: useRef<FormInputHandler | null>(null),
  canisterName: useRef<FormInputHandler | null>(null),
  repoUrl: useRef<FormInputHandler | null>(null),
  commitHash: useRef<FormInputHandler | null>(null),
  repoAccessToken: useRef<FormInputHandler | null>(null),
  rustVersion: useRef<FormInputHandler | null>(null),
  dfxVersion: useRef<FormInputHandler | null>(null),
  optimizeCount: useRef<FormInputHandler | null>(null),
  signature: useRef<FormInputHandler | null>(null),
  publicKey: useRef<FormInputHandler | null>(null)
});

export const SubmitForm: React.VFC<PropTypes> = ({css}) => {
  const refs = useRefs();
  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const hasError = Object.values(refs).reduce((result, ref) => {
        if (ref.current) {
          return ref.current.hasError() || result;
        }
        return result;
      }, false);
      if (!hasError) {
        coverSDK.build({
          owner_id: refs.ownerId.current?.value() as string,
          canister_id: refs.canisterId.current?.value() as string,
          canister_name: refs.canisterId.current?.value() as string,
          repo_url: refs.repoUrl.current?.value() as string,
          commit_hash: refs.commitHash.current?.value() as string,
          repo_access_token: refs.repoAccessToken.current?.value() as string,
          rust_version: refs.rustVersion.current?.value() as string,
          dfx_version: refs.dfxVersion.current?.value() as string,
          optimize_count: parseInt(refs.optimizeCount.current?.value() as string, 10)
        });
      }
    },
    [refs]
  );
  return (
    <StitchesSubmitForm css={css} onSubmit={onSubmit}>
      <FormContainer>
        <h3>{'Submit Verification'}</h3>
        <FormInput
          errorMessage={'Invalid principal format.'}
          label={'Owner Principal ID'}
          ref={refs.ownerId}
          required
          validations={[isPrincipal]}
        />
        <FormInput
          errorMessage={'Invalid principal format.'}
          label={'Canister Principal ID'}
          ref={refs.canisterId}
          required
          validations={[isPrincipal]}
        />
        <FormInput
          errorMessage={'Required.'}
          label={'Canister Name'}
          ref={refs.canisterName}
          required
          validations={[isNotEmpty]}
        />
        <FormInput
          errorMessage={'Invalid repo url format. Example: psychedelic/cover'}
          label={'Repo URL'}
          ref={refs.repoUrl}
          required
          validations={[isValidRepoFormat]}
        />
        <FormInput
          errorMessage={'Invalid hex format. Example: f01f'}
          label={'Commit Hash'}
          ref={refs.commitHash}
          required
          validations={[isValidHexFormat]}
        />
        <FormInput
          errorMessage={'Required.'}
          label={'Repo Access Token'}
          ref={refs.repoAccessToken}
          required
          validations={[isNotEmpty]}
        />
        <FormInput
          errorMessage={'Invalid version format. Example 0.9.3'}
          label={'Rust Version'}
          ref={refs.rustVersion}
          validations={[isValidVersionFormat]}
        />
        <FormInput
          errorMessage={'Invalid version format. Example 0.9.3'}
          label={'DFX Version'}
          ref={refs.dfxVersion}
          required
          validations={[isValidVersionFormat]}
        />
        <FormInput
          errorMessage={'Invalid number. Only support positive number from 0-10'}
          label={'IC CDK Optimizer'}
          ref={refs.optimizeCount}
          required
          validations={[isFrom1To10]}
        />
        <FormInput
          errorMessage={'Invalid hex format. Example: f01f'}
          label={'Signature'}
          ref={refs.signature}
          required
          rows={3}
          textarea
          validations={[isValidHexFormat]}
        />
        <FormInput
          errorMessage={'Invalid hex format. Example: f01f'}
          label={'Public Key'}
          ref={refs.publicKey}
          required
          textarea
          validations={[isValidHexFormat]}
        />
        <div className={'formButtonGroup'}>
          <Link to={DASHBOARD_PATH}>
            <Core.Button size={'large'} type={'outline'}>
              {'Cancel'}
            </Core.Button>
          </Link>
          <Core.Button size={'large'}>{'Submit Verification'}</Core.Button>
        </div>
      </FormContainer>
    </StitchesSubmitForm>
  );
};
