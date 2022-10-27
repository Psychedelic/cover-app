import {FC, FormEvent, useCallback, useRef} from 'react';

import {Link} from 'react-router-dom';

import {Core, FormContainer, FormInput, FormInputHandler} from '@/components';
import {DASHBOARD_PATH} from '@/constants';
import {isNotEmpty, isPrincipal, isValidHexFormat, isValidRepoFormat} from '@/utils';

import {StitchesGeneralInfoStep} from './generalInfoStep.styled';

interface PropTypes {
  defaultValue: GeneralInfo | undefined;
  onCompleted: (input: GeneralInfo) => void;
}

export interface GeneralInfo {
  callerId: string;
  delegateCanisterId: string;
  canisterId: string;
  canisterName: string;
  repoUrl: string;
  commitHash: string;
  repoAccessToken: string;
}

export const GeneralInfoStep: FC<PropTypes> = ({onCompleted, defaultValue}) => {
  const callerIdRef = useRef<FormInputHandler>(null),
    delegateCanisterIdRef = useRef<FormInputHandler>(null),
    canisterIdRef = useRef<FormInputHandler>(null),
    canisterNameRef = useRef<FormInputHandler>(null),
    repoUrlRef = useRef<FormInputHandler>(null),
    commitHashRef = useRef<FormInputHandler>(null),
    repoAccessTokenRef = useRef<FormInputHandler>(null);
  const onSubmit = useCallback(
    (event?: FormEvent) => {
      event?.preventDefault();
      const hasError = [
        callerIdRef,
        delegateCanisterIdRef,
        canisterIdRef,
        canisterNameRef,
        repoUrlRef,
        commitHashRef,
        repoAccessTokenRef
      ].reduce((result, ref) => {
        if (ref.current) return ref.current.hasError() || result;
        return result;
      }, false);
      if (hasError) return;
      onCompleted({
        callerId: callerIdRef.current?.value() || '',
        delegateCanisterId: delegateCanisterIdRef.current?.value() || '',
        canisterId: canisterIdRef.current?.value() || '',
        canisterName: canisterNameRef.current?.value() || '',
        repoUrl: repoUrlRef.current?.value() || '',
        commitHash: commitHashRef.current?.value() || '',
        repoAccessToken: repoAccessTokenRef.current?.value() || ''
      });
    },
    [onCompleted]
  );
  return (
    <StitchesGeneralInfoStep>
      <FormContainer autoComplete={'off'} onSubmit={onSubmit}>
        <div className={'header'}>
          <span>{'Submit Verification'}</span>
        </div>
        <FormInput
          defaultValue={defaultValue?.callerId}
          errorMessage={'Invalid principal format.'}
          infoTooltip={'The owner (controller) principal ID associated with the canister'}
          label={'Owner Principal ID'}
          ref={callerIdRef}
          required
          validations={[isPrincipal]}
        />
        <FormInput
          defaultValue={defaultValue?.delegateCanisterId}
          errorMessage={'Invalid principal format.'}
          infoTooltip={`The canister controller of the 'Canister ID' field,
useful when the controller is the cycle wallet or proxy canister.
Leave it empty if you don't use it.`}
          label={'Delegate Canister ID'}
          ref={delegateCanisterIdRef}
          validations={[isPrincipal]}
        />
        <FormInput
          defaultValue={defaultValue?.canisterId}
          errorMessage={'Invalid principal format.'}
          infoTooltip={'The canister ID associated with this verification'}
          label={'Canister ID'}
          ref={canisterIdRef}
          required
          validations={[isPrincipal]}
        />
        <FormInput
          defaultValue={defaultValue?.canisterName}
          errorMessage={'Required.'}
          infoTooltip={'The canister name defined in your dfx.json and canister_ids.json'}
          label={'Canister Name'}
          ref={canisterNameRef}
          required
          validations={[isNotEmpty]}
        />
        <FormInput
          defaultValue={defaultValue?.repoUrl}
          errorMessage={'Invalid repo url format. Example: psychedelic/cover'}
          infoTooltip={'The git repository of the canister in format {server}/{repo}'}
          label={'Repo URL'}
          ref={repoUrlRef}
          required
          validations={[isValidRepoFormat]}
        />
        <FormInput
          defaultValue={defaultValue?.commitHash}
          errorMessage={'Invalid hex format. Example: f01f'}
          infoTooltip={'The git commit hash associated with the git repository in hex format'}
          label={'Commit Hash'}
          ref={commitHashRef}
          required
          validations={[isValidHexFormat]}
        />
        <FormInput
          defaultValue={defaultValue?.repoAccessToken}
          infoTooltip={
            'Personal Access Token of a github account that has READ permission. Leave it empty if your repo is public'
          }
          label={'Repo Access Token'}
          ref={repoAccessTokenRef}
        />
        <div className={'formButtonGroup'}>
          <Link to={DASHBOARD_PATH}>
            <Core.Button kind={'outline'} size={'large'}>
              {'Cancel'}
            </Core.Button>
          </Link>
          <Core.Button size={'large'}>{'Continue'}</Core.Button>
        </div>
      </FormContainer>
    </StitchesGeneralInfoStep>
  );
};
