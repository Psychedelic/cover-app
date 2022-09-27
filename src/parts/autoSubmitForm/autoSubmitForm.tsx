import {createRef, FC, FormEvent, Fragment, RefObject, useCallback, useRef, useState} from 'react';

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

interface InputRefs {
  canisterId: RefObject<FormInputHandler>;
  repoAccessToken: RefObject<FormInputHandler>;
}

const useInputRefs = (): InputRefs => ({
  canisterId: createRef<FormInputHandler>(),
  repoAccessToken: createRef<FormInputHandler>()
});

interface DialogRefs {
  infoDialog: RefObject<InfoDialogHandler>;
  errDialog: RefObject<ErrorDialogHandler>;
  successDialog: RefObject<SuccessDialogHandler>;
}

const useDialogRefs = (): DialogRefs => ({
  errDialog: createRef<ErrorDialogHandler>(),
  infoDialog: createRef<InfoDialogHandler>(),
  successDialog: createRef<SuccessDialogHandler>()
});

export const AutoSubmitForm: FC = () => {
  const [isFetched, setIsFetched] = useState(false);
  const [coverMetadata, setCoverMetadata] = useState<CoverMetadata>();
  const canisterIdTemp = useRef<string>();
  const inputRefs = useInputRefs();
  const dialogRefs = useDialogRefs();
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
      const hasError = Object.values(inputRefs).reduce((result, ref) => {
        if (ref.current) {
          return ref.current.hasError() || result;
        }
        return result;
      }, false);
      if (hasError) return;
      if (isFetched) {
        dialogRefs.infoDialog.current?.open({
          title: 'Submission Processing',
          description: 'Your submission is processing, please allow some time for the verification to finish.'
        });
        buildWithCoverMetadata(
          inputRefs.canisterId.current?.value() as string,
          inputRefs.repoAccessToken.current?.value() as string
        )
          .then(() =>
            dialogRefs.successDialog.current?.open({
              description: 'Congrats!!! You have submitted verification successfully.',
              showActionBtn: true
            })
          )
          .catch((e: ErrorResponse) => errorHandler(e, dialogRefs.errDialog.current as ErrorDialogHandler))
          .finally(() => dialogRefs.infoDialog.current?.close());
      } else {
        dialogRefs.infoDialog.current?.open({
          title: 'Fetch Cover Metadata',
          description: 'Your submission is processing, please allow some time for the verification to finish.'
        });
        anonymousCoverMetadata(inputRefs.canisterId.current?.value() as string)
          .then(result => {
            setCoverMetadata(result);
            setIsFetched(true);
            return true;
          })
          .catch(_ => {
            dialogRefs.errDialog.current?.open({
              title: 'Failed to fetch Cover Metadata',
              description: 'The canister requested was not Cover Metadata supported.'
            });
          })
          .finally(() => dialogRefs.infoDialog.current?.close());
      }
    },
    [isFetched, inputRefs, dialogRefs]
  );
  return (
    <StitchesAutoSubmitForm>
      <FormContainer autoComplete={'off'} onSubmit={onSubmit}>
        <div className={'header'}>
          <span>{'Submit Automatic Verification'}</span>
        </div>
        <FormInput
          errorMessage={'Invalid principal format.'}
          infoTooltip={'The canister ID associated with this verification'}
          label={'Canister ID'}
          onBlurHandler={onCanisterIdChanged}
          ref={inputRefs.canisterId}
          required
          validations={[isPrincipal]}
        />
        <FormInput
          infoTooltip={
            'Personal Access Token of a github account that has READ permission. Leave it empty if your repo is public'
          }
          label={'Repo Access Token'}
          ref={inputRefs.repoAccessToken}
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
      <SuccessDialog actionContent={'Go back to Dashboard'} onAction={goToDashboard} ref={dialogRefs.successDialog} />
      <InfoDialog ref={dialogRefs.infoDialog} />
      <ErrorDialog
        actionContent={'Retry Verification'}
        cancelContent={'Close'}
        onAction={onSubmit}
        ref={dialogRefs.errDialog}
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
