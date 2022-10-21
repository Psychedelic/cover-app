import {FC, FormEvent, Fragment, useCallback, useRef, useState} from 'react';

import {faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import {CoverMetadata, ErrorResponse} from '@psychedelic/cover';
import {Link, useNavigate} from 'react-router-dom';

import {
  Core,
  ErrorDialog,
  ErrorDialogHandler,
  FormContainer,
  FormInput,
  FormInputHandler,
  InfoDialog,
  InfoDialogHandler,
  SuccessDialog,
  SuccessDialogHandler
} from '@/components';
import {DASHBOARD_PATH} from '@/constants';
import {anonymousCoverMetadata, buildWithCoverMetadata, isPrincipal} from '@/utils';

import {StitchesAutoSubmitForm} from './autoSubmitForm.styled';

export const AutoSubmitForm: FC = () => {
  const [isFetched, setIsFetched] = useState(false);
  const [coverMetadata, setCoverMetadata] = useState<CoverMetadata>();
  const canisterIdTemp = useRef<string>();
  const canisterIdRef = useRef<FormInputHandler>(null),
    repoAccessTokenRef = useRef<FormInputHandler>(null);
  const errDialogRef = useRef<ErrorDialogHandler>(null),
    infoDialogRef = useRef<InfoDialogHandler>(null),
    successDialogRef = useRef<SuccessDialogHandler>(null);
  const navigate = useNavigate();
  const goToDashboard = useCallback(() => navigate(DASHBOARD_PATH), [navigate]);
  const onCanisterIdChanged = useCallback((canisterId: string) => {
    if (canisterIdTemp.current === canisterId) return;
    canisterIdTemp.current = canisterId;
    setIsFetched(false);
    setCoverMetadata({
      dfx_version: '',
      canister_name: '',
      commit_hash: '',
      repo_url: '',
      rust_version: [],
      optimize_count: 0
    });
  }, []);
  const onSubmit = useCallback(
    (event?: FormEvent) => {
      event?.preventDefault();
      const hasError = [canisterIdRef, repoAccessTokenRef].reduce((result, ref) => {
        if (ref.current) {
          return ref.current.hasError() || result;
        }
        return result;
      }, false);
      if (hasError) return;
      if (isFetched) {
        infoDialogRef.current?.open({
          title: 'Submission Processing',
          description: 'Your submission is processing, please allow some time for the verification to finish.'
        });
        buildWithCoverMetadata(canisterIdRef.current?.value() as string, repoAccessTokenRef.current?.value() as string)
          .then(() =>
            successDialogRef.current?.open({
              description: 'Congrats!!! You have submitted verification successfully.',
              showActionBtn: true
            })
          )
          .catch((e: ErrorResponse) => errorHandler(e, errDialogRef.current as ErrorDialogHandler))
          .finally(() => infoDialogRef.current?.close());
      } else {
        infoDialogRef.current?.open({
          title: 'Fetch Cover Metadata',
          description: 'Your submission is processing, please allow some time for the verification to finish.'
        });
        anonymousCoverMetadata(canisterIdRef.current?.value() as string)
          .then(result => {
            setCoverMetadata(result);
            setIsFetched(true);
            return true;
          })
          .catch(_ => {
            errDialogRef.current?.open({
              title: 'Failed to fetch Cover Metadata',
              description: 'The canister requested was not Cover Metadata supported.'
            });
          })
          .finally(() => infoDialogRef.current?.close());
      }
    },
    [isFetched]
  );
  return (
    <StitchesAutoSubmitForm>
      <FormContainer autoComplete={'off'} onSubmit={onSubmit}>
        <div className={'header'}>
          <span>{'Submit Automatic Verification'}</span>
        </div>
        <div className={'info'}>
          <Core.Icon icon={faInfoCircle} />
          <span>
            {'To surface "Cover Metadata" information, '}
            {'please provide the canister build configuration exposed '}
            {'with the "coverMetadata" query method from the canister ('}
            <a
              href={'https://github.com/Psychedelic/cover-validator#build-with-cover-metadata'}
              rel={'noreferrer'}
              target={'_blank'}>
              {'Example'}
            </a>
            {').'}
          </span>
        </div>
        <FormInput
          errorMessage={'Invalid principal format.'}
          infoTooltip={'The canister ID associated with this verification'}
          label={'Canister ID'}
          onBlurHandler={onCanisterIdChanged}
          ref={canisterIdRef}
          required
          validations={[isPrincipal]}
        />
        <FormInput
          infoTooltip={
            'Personal Access Token of a github account that has READ permission. Leave it empty if your repo is public'
          }
          label={'Repo Access Token'}
          ref={repoAccessTokenRef}
        />
        {isFetched && (
          <>
            <div className={'header'}>
              <span>{'Fetched Results'}</span>
            </div>
            <FormInput defaultValue={coverMetadata?.canister_name} disabled label={'Canister Name'} />
            <FormInput defaultValue={coverMetadata?.repo_url} disabled label={'Repo URL'} />
            <FormInput defaultValue={coverMetadata?.commit_hash} disabled label={'Commit Hash'} />
            <FormInput defaultValue={coverMetadata?.rust_version[0]} disabled label={'Rust Version'} />
            <FormInput defaultValue={coverMetadata?.dfx_version} disabled label={'DFX Version'} />
            <FormInput defaultValue={String(coverMetadata?.optimize_count)} disabled label={'IC CDK Optimizer'} />
          </>
        )}
        <div className={'formButtonGroup'}>
          <Link to={DASHBOARD_PATH}>
            <Core.Button kind={'outline'} size={'large'}>
              {'Cancel'}
            </Core.Button>
          </Link>
          <Core.Button size={'large'}>{isFetched ? 'Submit' : 'Verify Information'}</Core.Button>
        </div>
      </FormContainer>
      <SuccessDialog actionContent={'Go back to Dashboard'} onAction={goToDashboard} ref={successDialogRef} />
      <InfoDialog ref={infoDialogRef} />
      <ErrorDialog
        actionContent={'Retry Verification'}
        cancelContent={'Close'}
        onAction={onSubmit}
        ref={errDialogRef}
      />
    </StitchesAutoSubmitForm>
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
      ))}{' '}
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
