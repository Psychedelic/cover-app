import React, {useCallback, useRef} from 'react';

import {ErrorResponse} from '@psychedelic/cover';
import {CSS} from '@stitches/react';
import {Link, useNavigate} from 'react-router-dom';

import {
  Core,
  ErrorDialog,
  ErrorDialogHandler,
  FormContainer,
  FormInput,
  FormInputHandler,
  InfoDialog,
  InfoDialogHandler
} from '@/components';
import {DASHBOARD_PATH} from '@/constants';
import {
  coverAnonymousBuild,
  isFrom1To10,
  isNotEmpty,
  isPrincipal,
  isValidHexFormat,
  isValidRepoFormat,
  isValidTimestamp,
  isValidVersionFormat
} from '@/utils';

import {StitchesSubmitForm} from './submitForm.styled';

interface PropTypes extends React.ComponentProps<typeof StitchesSubmitForm> {
  css?: CSS;
}

interface InputRefs {
  ownerId: React.RefObject<FormInputHandler>;
  canisterId: React.RefObject<FormInputHandler>;
  canisterName: React.RefObject<FormInputHandler>;
  repoUrl: React.RefObject<FormInputHandler>;
  commitHash: React.RefObject<FormInputHandler>;
  repoAccessToken: React.RefObject<FormInputHandler>;
  rustVersion: React.RefObject<FormInputHandler>;
  dfxVersion: React.RefObject<FormInputHandler>;
  optimizeCount: React.RefObject<FormInputHandler>;
  timestamp: React.RefObject<FormInputHandler>;
  signature: React.RefObject<FormInputHandler>;
  publicKey: React.RefObject<FormInputHandler>;
}

const useInputRefs = (): InputRefs => ({
  ownerId: useRef<FormInputHandler>(null),
  canisterId: useRef<FormInputHandler>(null),
  canisterName: useRef<FormInputHandler>(null),
  repoUrl: useRef<FormInputHandler>(null),
  commitHash: useRef<FormInputHandler>(null),
  repoAccessToken: useRef<FormInputHandler>(null),
  rustVersion: useRef<FormInputHandler>(null),
  dfxVersion: useRef<FormInputHandler>(null),
  optimizeCount: useRef<FormInputHandler>(null),
  timestamp: useRef<FormInputHandler>(null),
  signature: useRef<FormInputHandler>(null),
  publicKey: useRef<FormInputHandler>(null)
});

export const SubmitForm: React.VFC<PropTypes> = ({css}) => {
  const inputRefs = useInputRefs();
  const errDialogRef = useRef<ErrorDialogHandler>(null);
  const infoDialogRef = useRef<InfoDialogHandler>(null);
  const navigate = useNavigate();
  const goToDashboard = useCallback(() => navigate(DASHBOARD_PATH), [navigate]);
  const onSubmit = useCallback(
    (event?: React.FormEvent) => {
      event?.preventDefault();
      handleSubmit(inputRefs, infoDialogRef, errDialogRef);
    },
    [inputRefs]
  );
  return (
    <StitchesSubmitForm css={css} onSubmit={onSubmit}>
      <FormContainer autoComplete={'off'}>
        <h3>{'Submit Verification'}</h3>
        <FormInput
          errorMessage={'Invalid principal format.'}
          infoTooltip={'The owner (controller) principal ID associated with the canister'}
          label={'Owner Principal ID'}
          ref={inputRefs.ownerId}
          required
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
          errorMessage={'Required.'}
          infoTooltip={
            'Personal Access Token of a github account that is an OWNER or has TRIAGE permission to the canister repo'
          }
          label={'Repo Access Token'}
          ref={inputRefs.repoAccessToken}
          required
          validations={[isNotEmpty]}
        />
        <FormInput
          errorMessage={'Invalid version format. Example 1.60.0'}
          infoTooltip={'Rust stable version to build the canister; skip this field if using Motoko'}
          label={'Rust Version'}
          ref={inputRefs.rustVersion}
          validationIf={[value => parseInt(value, 10) > 0]}
          validations={[isValidVersionFormat]}
        />
        <FormInput
          errorMessage={'Invalid version format. Example 0.9.2'}
          infoTooltip={'Dfx version to deploy/build the canister'}
          label={'DFX Version'}
          ref={inputRefs.dfxVersion}
          required
          validations={[isValidVersionFormat]}
        />
        <FormInput
          errorMessage={'Invalid number. Only support positive number from 0-10'}
          infoTooltip={
            'The times you want to optimize your wasm. After the first time, ' +
            'the wasm will not be significantly smaller anymore. If times > 0, you must specify the rust version'
          }
          label={'IC CDK Optimizer'}
          ref={inputRefs.optimizeCount}
          required
          validations={[isFrom1To10]}
        />
        <FormInput
          errorMessage={'Invalid timestamp format. Example: 1651742769039'}
          infoTooltip={
            'The timestamp in UNIX epoch format is also a challenge to sign by your identity, ' +
            'and the signature will be expired after 5 minutes.'
          }
          label={'Timestamp'}
          ref={inputRefs.timestamp}
          required
          validations={[isValidTimestamp]}
        />
        <FormInput
          errorMessage={'Invalid hex format. Example: f01f'}
          infoTooltip={'The signature is signed with the timestamp being the message'}
          label={'Signature'}
          ref={inputRefs.signature}
          required
          rows={3}
          textarea
          validations={[isValidHexFormat]}
        />
        <FormInput
          errorMessage={'Invalid hex format. Example: f01f'}
          infoTooltip={'The public key that associated with the owner principal ID'}
          label={'Public Key'}
          ref={inputRefs.publicKey}
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
      <InfoDialog actionContent={'Go back to Dashboard'} onAction={goToDashboard} ref={infoDialogRef} />
      <ErrorDialog
        actionContent={'Retry Verification'}
        cancelContent={'Close'}
        onAction={onSubmit}
        ref={errDialogRef}
      />
    </StitchesSubmitForm>
  );
};

const handleSubmit = (
  inputRefs: InputRefs,
  infoDialogRef: React.RefObject<InfoDialogHandler>,
  errDialogRef: React.RefObject<ErrorDialogHandler>
) => {
  const hasError = Object.values(inputRefs).reduce((result, ref) => {
    if (ref.current) {
      return ref.current.hasError() || result;
    }
    return result;
  }, false);
  if (!hasError) {
    coverAnonymousBuild({
      owner_id: inputRefs.ownerId.current?.value() as string,
      canister_id: inputRefs.canisterId.current?.value() as string,
      canister_name: inputRefs.canisterName.current?.value() as string,
      repo_url: inputRefs.repoUrl.current?.value() as string,
      commit_hash: inputRefs.commitHash.current?.value() as string,
      repo_access_token: inputRefs.repoAccessToken.current?.value() as string,
      rust_version: inputRefs.rustVersion.current?.value() as string,
      dfx_version: inputRefs.dfxVersion.current?.value() as string,
      optimize_count: parseInt(inputRefs.optimizeCount.current?.value() as string, 10),
      timestamp: parseInt(inputRefs.timestamp.current?.value() as string, 10),
      signature: inputRefs.signature.current?.value() as string,
      public_key: inputRefs.publicKey.current?.value() as string
    })
      .then(() =>
        infoDialogRef.current?.open({
          description: 'Congrats!!! You have submitted verification successfully',
          showActionBtn: true
        })
      )
      .catch((e: ErrorResponse) => errorHandler(e, errDialogRef.current as ErrorDialogHandler));
  }
};

const mapBadInputToDescriptionList = (e: ErrorResponse) => ({
  title: e.message,
  description: (
    <dl>
      {(e.details as Array<{property: string; constraints: Record<string, string>}>).map(({property, constraints}) => (
        <React.Fragment key={property}>
          <dt>{`- ${property}:`}</dt>
          <dd>
            {Object.values(constraints).map(c => (
              <li key={c}>{c}</li>
            ))}
          </dd>
        </React.Fragment>
      ))}
    </dl>
  )
});

const errorHandler = (err: ErrorResponse, dialog: ErrorDialogHandler) => {
  if (err.code.startsWith('ERR_001')) {
    // Bad input
    dialog.open(mapBadInputToDescriptionList(err));
  } else if (err.code.startsWith('ERR_010')) {
    // In progress
    dialog.open({
      title: 'Validator Error',
      description: 'Build in progress! Please retry after 5 minutes.'
    });
  } else if (err.code.startsWith('ERR_000')) {
    // Internal error
    dialog.open({showActionBtn: true});
  } else if (err.code.startsWith('ERR_00')) {
    // Validator error
    dialog.open({title: 'Validator Error', description: err.message});
  } else {
    // Client error
    dialog.open({showActionBtn: true});
  }
};
