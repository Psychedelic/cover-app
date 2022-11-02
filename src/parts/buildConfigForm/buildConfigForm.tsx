import {FormEvent, Fragment, useCallback, useEffect, useRef} from 'react';

import {ErrorResponse} from '@psychedelic/cover';
import {Link, useLocation, useNavigate} from 'react-router-dom';

import {
  Core,
  ErrorDialog,
  ErrorDialogHandler,
  FormContainer,
  FormInput,
  FormInputHandler,
  InfoDialog,
  InfoDialogHandler,
  Loading,
  SuccessDialog,
  SuccessDialogHandler
} from '@/components';
import {DASHBOARD_PATH, MY_CANISTER_PATH} from '@/constants';
import {useAuthenticationContext} from '@/contexts';
import {BuildConfig} from '@/models';
import {
  anonymousSaveBuildConfig,
  isFrom1To10,
  isNotEmpty,
  isPrincipal,
  isValidHexFormat,
  isValidRepoFormat,
  isValidVersionFormat
} from '@/utils';

import {StitchesBuildConfigForm} from './buildConfigForm.styled';

export const BuildConfigForm = () => {
  const errDialogRef = useRef<ErrorDialogHandler>(null),
    infoDialogRef = useRef<InfoDialogHandler>(null),
    successDialogRef = useRef<SuccessDialogHandler>(null);
  const callerIdRef = useRef<FormInputHandler>(null),
    delegateCanisterIdRef = useRef<FormInputHandler>(null),
    canisterIdRef = useRef<FormInputHandler>(null),
    canisterNameRef = useRef<FormInputHandler>(null),
    repoUrlRef = useRef<FormInputHandler>(null),
    commitHashRef = useRef<FormInputHandler>(null),
    repoAccessTokenRef = useRef<FormInputHandler>(null),
    rustVersionRef = useRef<FormInputHandler>(null),
    dfxVersionRef = useRef<FormInputHandler>(null),
    optimizeCountRef = useRef<FormInputHandler>(null);
  const location = useLocation(),
    isEditPage = Boolean(location.state?.buildConfig),
    buildConfig: BuildConfig = location.state?.buildConfig || {};
  const navigate = useNavigate(),
    goToMyCanisterPath = useCallback(() => navigate(MY_CANISTER_PATH), [navigate]),
    onSubmit = useCallback((event?: FormEvent) => {
      event?.preventDefault();
      const hasError = [
        callerIdRef,
        delegateCanisterIdRef,
        canisterIdRef,
        canisterNameRef,
        repoUrlRef,
        commitHashRef,
        repoAccessTokenRef,
        rustVersionRef,
        dfxVersionRef,
        optimizeCountRef
      ].reduce((result, ref) => {
        if (ref.current) return ref.current.hasError() || result;
        return result;
      }, false);
      if (hasError) return;
      infoDialogRef.current?.open({
        title: 'Processing',
        description: 'Please allow some time for the request to finish.'
      });
      anonymousSaveBuildConfig({
        callerId: callerIdRef.current?.value() || '',
        delegateCanisterId: delegateCanisterIdRef.current?.value() || '',
        canisterId: canisterIdRef.current?.value() || '',
        canisterName: canisterNameRef.current?.value() || '',
        repoUrl: repoUrlRef.current?.value() || '',
        commitHash: commitHashRef.current?.value() || '',
        repoAccessToken: repoAccessTokenRef.current?.value() || '',
        rustVersion: rustVersionRef.current?.value() || '',
        dfxVersion: dfxVersionRef.current?.value() || '',
        optimizeCount: parseInt(optimizeCountRef.current?.value() || '', 10),
        timestamp: 0,
        signature: '',
        publicKey: ''
      })
        .then(() =>
          successDialogRef.current?.open({
            description: 'Congrats!!! You have saved build config successfully.',
            showActionBtn: true
          })
        )
        .catch((e: ErrorResponse) => errorHandler(e, errDialogRef.current as ErrorDialogHandler))
        .finally(() => infoDialogRef.current?.close());
    }, []);
  const {
    state: {pid, isFetching, isAuthenticated}
  } = useAuthenticationContext();
  useEffect(() => {
    if (typeof isFetching === 'undefined' || isFetching) return;
    if (!isAuthenticated) navigate(DASHBOARD_PATH);
  }, [isFetching, isAuthenticated, navigate]);
  return typeof isFetching === 'undefined' || isFetching || !isAuthenticated ? (
    <Loading />
  ) : (
    <StitchesBuildConfigForm>
      <FormContainer autoComplete={'off'} onSubmit={onSubmit}>
        <div className={'header'}>
          <span>{`${isEditPage ? 'Edit' : 'Add'} Build Config`}</span>
        </div>
        <FormInput
          defaultValue={pid}
          disabled
          errorMessage={'Invalid principal format.'}
          infoTooltip={'The owner (controller) principal ID associated with the canister'}
          label={'Owner Principal ID'}
          ref={callerIdRef}
          required
          validations={[isPrincipal]}
        />
        <FormInput
          defaultValue={buildConfig.delegateCanisterId}
          errorMessage={'Invalid principal format.'}
          infoTooltip={`The canister controller of the 'Canister ID' field,
useful when the controller is the cycle wallet or proxy canister.
Leave it empty if you don't use it.`}
          label={'Delegate Canister ID'}
          ref={delegateCanisterIdRef}
          validations={[isPrincipal]}
        />
        <FormInput
          defaultValue={buildConfig.canisterId}
          disabled={isEditPage}
          errorMessage={'Invalid principal format.'}
          infoTooltip={'The canister ID associated with this verification'}
          label={'Canister ID'}
          ref={canisterIdRef}
          required
          validations={[isPrincipal]}
        />
        <FormInput
          defaultValue={buildConfig.name}
          errorMessage={'Required.'}
          infoTooltip={'The canister name defined in your dfx.json and canister_ids.json'}
          label={'Canister Name'}
          ref={canisterNameRef}
          required
          validations={[isNotEmpty]}
        />
        <FormInput
          defaultValue={buildConfig.repo}
          errorMessage={'Invalid repo url format. Example: psychedelic/cover'}
          infoTooltip={'The git repository of the canister in format {server}/{repo}'}
          label={'Repo URL'}
          ref={repoUrlRef}
          required
          validations={[isValidRepoFormat]}
        />
        <FormInput
          defaultValue={buildConfig.gitCommit}
          errorMessage={'Invalid hex format. Example: f01f'}
          infoTooltip={'The git commit hash associated with the git repository in hex format'}
          label={'Commit Hash'}
          ref={commitHashRef}
          required
          validations={[isValidHexFormat]}
        />
        <FormInput
          infoTooltip={
            'Personal Access Token of a github account that has READ permission. Leave it empty if your repo is public'
          }
          label={'Repo Access Token'}
          ref={repoAccessTokenRef}
        />
        <FormInput
          defaultValue={buildConfig.rustVersion}
          errorMessage={'Invalid version format. Example 1.60.0'}
          infoTooltip={'Rust stable version to build the canister; skip this field if using Motoko'}
          label={'Rust Version'}
          ref={rustVersionRef}
          validationIf={[value => parseInt(value, 10) > 0]}
          validations={[isValidVersionFormat]}
        />
        <FormInput
          defaultValue={buildConfig.dfxVersion}
          errorMessage={'Invalid version format. Example 0.9.2'}
          infoTooltip={'Dfx version to deploy/build the canister'}
          label={'DFX Version'}
          ref={dfxVersionRef}
          required
          validations={[isValidVersionFormat]}
        />
        <FormInput
          defaultValue={buildConfig.optimizeCount}
          errorMessage={'Invalid number. Only support positive number from 0-10'}
          infoTooltip={
            'The times you want to optimize your wasm. After the first time, ' +
            'the wasm will not be significantly smaller anymore. If times > 0, you must specify the rust version'
          }
          label={'IC CDK Optimizer'}
          ref={optimizeCountRef}
          required
          validations={[isFrom1To10]}
        />
        <div className={'formButtonGroup'}>
          <Link to={MY_CANISTER_PATH}>
            <Core.Button kind={'outline'} size={'large'}>
              {'Cancel'}
            </Core.Button>
          </Link>
          <Core.Button size={'large'}>{'Save'}</Core.Button>
        </div>
      </FormContainer>
      <SuccessDialog actionContent={'Go back to My Canister'} onAction={goToMyCanisterPath} ref={successDialogRef} />
      <InfoDialog ref={infoDialogRef} />
      <ErrorDialog actionContent={'Retry'} cancelContent={'Close'} onAction={onSubmit} ref={errDialogRef} />
    </StitchesBuildConfigForm>
  );
};

const mapBadInputToDescriptionList = (e: ErrorResponse) => ({
  title: e.message,
  description: (
    <dl>
      {(e.details as Array<{property: string; constraints: Record<string, string>}>).map(({property, constraints}) => (
        <Fragment key={property}>
          <dt>{`- ${property}:`}</dt>
          <dd>
            {Object.values(constraints).map(c => (
              <li key={c}>{c}</li>
            ))}
          </dd>
        </Fragment>
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
