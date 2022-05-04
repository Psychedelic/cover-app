import React, {useCallback, useRef} from 'react';

import {CSS} from '@stitches/react';
import {Link} from 'react-router-dom';

import {Core, FormContainer, FormInput, FormInputHandler} from '@/components';
import {DASHBOARD_PATH} from '@/constants';
import {isFrom1To10, isNotEmpty, isPrincipal, isValidHexFormat, isValidRepoFormat, isValidVersionFormat} from '@/utils';

import {StitchesSubmitForm} from './submitForm.styled';

interface PropTypes extends React.ComponentProps<typeof StitchesSubmitForm> {
  css?: CSS;
}

export const SubmitForm: React.VFC<PropTypes> = ({css}) => {
  const ownerId = useRef(null);
  const canisterId = useRef(null);
  const canisterName = useRef(null);
  const repoUrl = useRef(null);
  const commitHash = useRef(null);
  const repoAccessToken = useRef(null);
  const rustVersion = useRef(null);
  const dfxVersion = useRef(null);
  const optimizeCount = useRef(null);
  const signature = useRef(null);
  const publicKey = useRef(null);
  const onSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    [
      ownerId,
      canisterId,
      canisterName,
      repoUrl,
      commitHash,
      repoAccessToken,
      rustVersion,
      dfxVersion,
      optimizeCount,
      signature,
      publicKey
    ].forEach(ref => {
      if (ref.current) (ref.current as FormInputHandler).hasError();
    });
  }, []);
  return (
    <StitchesSubmitForm css={css} onSubmit={onSubmit}>
      <FormContainer>
        <h3>{'Submit Verification'}</h3>
        <FormInput
          errorMessage={'Invalid principal format.'}
          label={'Owner Principal ID'}
          ref={ownerId}
          validations={[isPrincipal]}
        />
        <FormInput
          errorMessage={'Invalid principal format.'}
          label={'Canister Principal ID'}
          ref={canisterId}
          validations={[isPrincipal]}
        />
        <FormInput errorMessage={'Required.'} label={'Canister Name'} ref={canisterName} validations={[isNotEmpty]} />
        <FormInput
          errorMessage={'Invalid repo url format. Example: psychedelic/cover'}
          label={'Repo URL'}
          ref={repoUrl}
          validations={[isValidRepoFormat]}
        />
        <FormInput
          errorMessage={'Invalid hex format. Example: f01f'}
          label={'Commit Hash'}
          ref={commitHash}
          validations={[isValidHexFormat]}
        />
        <FormInput
          errorMessage={'Required.'}
          label={'Repo Access Token'}
          ref={repoAccessToken}
          validations={[isNotEmpty]}
        />
        <FormInput
          errorMessage={'Invalid version format. Example 0.9.3'}
          label={'Rust Version'}
          ref={rustVersion}
          validations={[isValidVersionFormat]}
        />
        <FormInput
          errorMessage={'Invalid version format. Example 0.9.3'}
          label={'DFX Version'}
          ref={dfxVersion}
          validations={[isValidVersionFormat]}
        />
        <FormInput
          errorMessage={'Invalid number. Only support positive number from 0-10'}
          label={'IC CDK Optimizer'}
          ref={optimizeCount}
          validations={[isFrom1To10]}
        />
        <FormInput
          errorMessage={'Invalid hex format. Example: f01f'}
          label={'Signature'}
          ref={signature}
          rows={3}
          textarea
          validations={[isValidHexFormat]}
        />
        <FormInput
          errorMessage={'Invalid hex format. Example: f01f'}
          label={'Public Key'}
          ref={publicKey}
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
