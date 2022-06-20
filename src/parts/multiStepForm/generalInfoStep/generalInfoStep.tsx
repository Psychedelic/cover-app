import React, {useCallback, useRef} from 'react';

import {Link} from 'react-router-dom';

import {Core, FormContainer, FormInput, FormInputHandler} from '@/components';
import {DASHBOARD_PATH} from '@/constants';
import {isNotEmpty, isPrincipal, isValidHexFormat, isValidRepoFormat} from '@/utils';

interface PropTypes {
  defaultValue: GeneralInfo | null;
  onCompleted: (input: GeneralInfo) => void;
}

export interface GeneralInfo {
  ownerId: string;
  canisterId: string;
  canisterName: string;
  repoUrl: string;
  commitHash: string;
  repoAccessToken: string;
}

interface InputRefs {
  ownerId: React.RefObject<FormInputHandler>;
  canisterId: React.RefObject<FormInputHandler>;
  canisterName: React.RefObject<FormInputHandler>;
  repoUrl: React.RefObject<FormInputHandler>;
  commitHash: React.RefObject<FormInputHandler>;
  repoAccessToken: React.RefObject<FormInputHandler>;
}

const useInputRefs = (): InputRefs => ({
  ownerId: useRef<FormInputHandler>(null),
  canisterId: useRef<FormInputHandler>(null),
  canisterName: useRef<FormInputHandler>(null),
  repoUrl: useRef<FormInputHandler>(null),
  commitHash: useRef<FormInputHandler>(null),
  repoAccessToken: useRef<FormInputHandler>(null)
});

export const GeneralInfoStep: React.FC<PropTypes> = ({onCompleted, defaultValue}) => {
  const inputRefs = useInputRefs();
  const onSubmit = useCallback(
    (event?: React.FormEvent) => {
      event?.preventDefault();
      const hasError = Object.values(inputRefs).reduce((result, ref) => {
        if (ref.current) {
          return ref.current.hasError() || result;
        }
        return result;
      }, false);
      if (hasError) return;
      onCompleted({
        ownerId: inputRefs.ownerId.current?.value() || '',
        canisterId: inputRefs.canisterId.current?.value() || '',
        canisterName: inputRefs.canisterName.current?.value() || '',
        repoUrl: inputRefs.repoUrl.current?.value() || '',
        commitHash: inputRefs.commitHash.current?.value() || '',
        repoAccessToken: inputRefs.repoAccessToken.current?.value() || ''
      });
    },
    [onCompleted, inputRefs]
  );
  return (
    <FormContainer autoComplete={'off'} onSubmit={onSubmit}>
      <div className={'header'}>
        <span>{'Submit Verification'}</span>
      </div>
      <FormInput
        defaultValue={defaultValue?.ownerId}
        errorMessage={'Invalid principal format.'}
        infoTooltip={'The owner (controller) principal ID associated with the canister'}
        label={'Owner Principal ID'}
        ref={inputRefs.ownerId}
        required
        validations={[isPrincipal]}
      />
      <FormInput
        defaultValue={defaultValue?.canisterId}
        errorMessage={'Invalid principal format.'}
        infoTooltip={'The canister ID associated with this verification'}
        label={'Canister Principal ID'}
        ref={inputRefs.canisterId}
        required
        validations={[isPrincipal]}
      />
      <FormInput
        defaultValue={defaultValue?.canisterName}
        errorMessage={'Required.'}
        infoTooltip={'The canister name defined in your dfx.json and canister_ids.json'}
        label={'Canister Name'}
        ref={inputRefs.canisterName}
        required
        validations={[isNotEmpty]}
      />
      <FormInput
        defaultValue={defaultValue?.repoUrl}
        errorMessage={'Invalid repo url format. Example: psychedelic/cover'}
        infoTooltip={'The git repository of the canister in format {server}/{repo}'}
        label={'Repo URL'}
        ref={inputRefs.repoUrl}
        required
        validations={[isValidRepoFormat]}
      />
      <FormInput
        defaultValue={defaultValue?.commitHash}
        errorMessage={'Invalid hex format. Example: f01f'}
        infoTooltip={'The git commit hash associated with the git repository in hex format'}
        label={'Commit Hash'}
        ref={inputRefs.commitHash}
        required
        validations={[isValidHexFormat]}
      />
      <FormInput
        defaultValue={defaultValue?.repoAccessToken}
        infoTooltip={
          'Personal Access Token of a github account that has READ permission. Leave it empty if your repo is public'
        }
        label={'Repo Access Token'}
        ref={inputRefs.repoAccessToken}
      />
      <div className={'formButtonGroup'}>
        <Link to={DASHBOARD_PATH}>
          <Core.Button size={'large'} type={'outline'}>
            {'Cancel'}
          </Core.Button>
        </Link>
        <Core.Button size={'large'}>{'Continue'}</Core.Button>
      </div>
    </FormContainer>
  );
};
