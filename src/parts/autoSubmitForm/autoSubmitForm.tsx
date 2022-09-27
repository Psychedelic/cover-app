import {createRef, FC, FormEvent, RefObject, useCallback} from 'react';

import {Link} from 'react-router-dom';

import {Core, FormContainer, FormInput, FormInputHandler} from '@/components';
import {DASHBOARD_PATH} from '@/constants';
import {isNotEmpty, isPrincipal, isValidHexFormat, isValidRepoFormat} from '@/utils';

import {StitchesAutoSubmitForm} from './autoSubmitForm.styled';

interface InputRefs {
  callerId: RefObject<FormInputHandler>;
  delegateCanisterId: RefObject<FormInputHandler>;
  canisterId: RefObject<FormInputHandler>;
  canisterName: RefObject<FormInputHandler>;
  repoUrl: RefObject<FormInputHandler>;
  commitHash: RefObject<FormInputHandler>;
  repoAccessToken: RefObject<FormInputHandler>;
}
const useInputRefs = (): InputRefs => ({
  callerId: createRef<FormInputHandler>(),
  delegateCanisterId: createRef<FormInputHandler>(),
  canisterId: createRef<FormInputHandler>(),
  canisterName: createRef<FormInputHandler>(),
  repoUrl: createRef<FormInputHandler>(),
  commitHash: createRef<FormInputHandler>(),
  repoAccessToken: createRef<FormInputHandler>()
});
export const AutoSubmitForm: FC = () => {
  const inputRefs = useInputRefs();
  const onSubmit = useCallback(
    (event?: FormEvent) => {
      event?.preventDefault();
      const hasError = Object.values(inputRefs).reduce((result, ref) => {
        if (ref.current) {
          return ref.current.hasError() || result;
        }
        return result;
      }, false);
      if (hasError) return;
      /*
       * OnCompleted({
       * callerId: inputRefs.callerId.current?.value() || '',
       * delegateCanisterId: inputRefs.delegateCanisterId.current?.value() || '',
       * canisterId: inputRefs.canisterId.current?.value() || '',
       * canisterName: inputRefs.canisterName.current?.value() || '',
       * repoUrl: inputRefs.repoUrl.current?.value() || '',
       * commitHash: inputRefs.commitHash.current?.value() || '',
       * repoAccessToken: inputRefs.repoAccessToken.current?.value() || ''
       * });
       */
    },
    [inputRefs]
  );
  return (
    <StitchesAutoSubmitForm>
      <FormContainer autoComplete={'off'} onSubmit={onSubmit}>
        <div className={'header'}>
          <span>{'Submit Verification'}</span>
        </div>
        <FormInput
          errorMessage={'Invalid principal format.'}
          infoTooltip={'The owner (controller) principal ID associated with the canister'}
          label={'Owner Principal ID'}
          ref={inputRefs.callerId}
          required
          validations={[isPrincipal]}
        />
        <FormInput
          errorMessage={'Invalid principal format.'}
          infoTooltip={`The canister controller of the 'Canister Principal ID' field,
useful when the controller is the cycle wallet or proxy canister.
Leave it empty if you don't use it.`}
          label={'Delegate canister ID'}
          ref={inputRefs.delegateCanisterId}
          validations={[isPrincipal]}
        />
        <FormInput
          errorMessage={'Invalid principal format.'}
          infoTooltip={'The canister ID associated with this verification'}
          label={'Canister Principal ID'}
          ref={inputRefs.canisterId}
          required
          validations={[isPrincipal]}
        />
        <FormInput
          errorMessage={'Required.'}
          infoTooltip={'The canister name defined in your dfx.json and canister_ids.json'}
          label={'Canister Name'}
          ref={inputRefs.canisterName}
          required
          validations={[isNotEmpty]}
        />
        <FormInput
          errorMessage={'Invalid repo url format. Example: psychedelic/cover'}
          infoTooltip={'The git repository of the canister in format {server}/{repo}'}
          label={'Repo URL'}
          ref={inputRefs.repoUrl}
          required
          validations={[isValidRepoFormat]}
        />
        <FormInput
          errorMessage={'Invalid hex format. Example: f01f'}
          infoTooltip={'The git commit hash associated with the git repository in hex format'}
          label={'Commit Hash'}
          ref={inputRefs.commitHash}
          required
          validations={[isValidHexFormat]}
        />
        <FormInput
          infoTooltip={
            'Personal Access Token of a github account that has READ permission. Leave it empty if your repo is public'
          }
          label={'Repo Access Token'}
          ref={inputRefs.repoAccessToken}
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
    </StitchesAutoSubmitForm>
  );
};
