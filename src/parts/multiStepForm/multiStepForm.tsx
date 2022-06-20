import React, {MutableRefObject, useCallback, useRef, useState} from 'react';

import {ErrorResponse} from '@psychedelic/cover';
import {CSS} from '@stitches/react';
import {useNavigate} from 'react-router-dom';

import {
  ErrorDialog,
  ErrorDialogHandler,
  InfoDialog,
  InfoDialogHandler,
  SuccessDialog,
  SuccessDialogHandler
} from '@/components';
import {DASHBOARD_PATH} from '@/constants';
import {coverAnonymousBuild} from '@/utils';

import {BuildInfo, BuildInfoStep} from './buildInfoStep';
import {GeneralInfo, GeneralInfoStep} from './generalInfoStep';
import {StitchesMultiStepForm} from './multiStepForm.styled';

interface PropTypes extends React.ComponentProps<typeof StitchesMultiStepForm> {
  css?: CSS;
}

interface InfoRefs {
  generalInfo: MutableRefObject<GeneralInfo | null>;
  buildInfo: MutableRefObject<BuildInfo | null>;
}

const useInfoRefs = (): InfoRefs => ({
  generalInfo: useRef<GeneralInfo>(null),
  buildInfo: useRef<BuildInfo>(null)
});

interface DialogRefs {
  infoDialog: React.RefObject<InfoDialogHandler>;
  errDialog: React.RefObject<ErrorDialogHandler>;
  successDialog: React.RefObject<SuccessDialogHandler>;
}

const useDialogRefs = (): DialogRefs => ({
  errDialog: useRef<ErrorDialogHandler>(null),
  infoDialog: useRef<InfoDialogHandler>(null),
  successDialog: useRef<SuccessDialogHandler>(null)
});

export const MultiStepForm: React.FC<PropTypes> = ({css}) => {
  const [steps, setSteps] = useState({generalInfoStep: true, buildInfoStep: false});
  const infoRefs = useInfoRefs();
  const dialogRefs = useDialogRefs();
  const navigate = useNavigate();
  const goToDashboard = useCallback(() => navigate(DASHBOARD_PATH), [navigate]);
  const onGoBack = useCallback(
    (buildInfo: BuildInfo) => {
      infoRefs.buildInfo.current = buildInfo;
      setSteps({generalInfoStep: true, buildInfoStep: false});
    },
    [infoRefs.buildInfo]
  );
  const onCompletedGeneralInfoStep = useCallback(
    (generalInfo: GeneralInfo) => {
      infoRefs.generalInfo.current = generalInfo;
      setSteps({generalInfoStep: false, buildInfoStep: true});
    },
    [infoRefs.generalInfo]
  );
  const onCompletedBuildInfoStep = useCallback(
    (buildInfo: BuildInfo) => {
      infoRefs.buildInfo.current = buildInfo;
      handleSubmit(infoRefs, dialogRefs);
    },
    [infoRefs, dialogRefs]
  );
  const onSubmit = useCallback(() => {
    handleSubmit(infoRefs, dialogRefs);
  }, [infoRefs, dialogRefs]);
  return (
    <StitchesMultiStepForm css={css}>
      {steps.generalInfoStep ? (
        <GeneralInfoStep defaultValue={infoRefs.generalInfo.current} onCompleted={onCompletedGeneralInfoStep} />
      ) : (
        <BuildInfoStep
          defaultValue={infoRefs.buildInfo.current}
          onCompleted={onCompletedBuildInfoStep}
          onGoBack={onGoBack}
        />
      )}
      <SuccessDialog actionContent={'Go back to Dashboard'} onAction={goToDashboard} ref={dialogRefs.successDialog} />
      <InfoDialog ref={dialogRefs.infoDialog} />
      <ErrorDialog
        actionContent={'Retry Verification'}
        cancelContent={'Close'}
        onAction={onSubmit}
        ref={dialogRefs.errDialog}
      />
    </StitchesMultiStepForm>
  );
};

const handleSubmit = (infoRefs: InfoRefs, {infoDialog, errDialog, successDialog}: DialogRefs) => {
  infoDialog.current?.open({
    title: 'Submission Processing',
    description: 'Your submission is processing, please allow some time for the verification to finish.'
  });
  coverAnonymousBuild({
    owner_id: infoRefs.generalInfo.current?.ownerId as string,
    canister_id: infoRefs.generalInfo.current?.canisterId as string,
    canister_name: infoRefs.generalInfo.current?.canisterName as string,
    repo_url: infoRefs.generalInfo.current?.repoUrl as string,
    commit_hash: infoRefs.generalInfo.current?.commitHash as string,
    repo_access_token: infoRefs.generalInfo.current?.repoAccessToken as string,
    rust_version: infoRefs.buildInfo.current?.rustVersion as string,
    dfx_version: infoRefs.buildInfo.current?.dfxVersion as string,
    optimize_count: parseInt(infoRefs.buildInfo.current?.optimizeCount as string, 10),
    timestamp: parseInt(infoRefs.buildInfo.current?.timestamp as string, 10),
    signature: infoRefs.buildInfo.current?.signature as string,
    public_key: infoRefs.buildInfo.current?.publicKey as string
  })
    .then(() =>
      successDialog.current?.open({
        description: 'Congrats!!! You have submitted verification successfully',
        showActionBtn: true
      })
    )
    .catch((e: ErrorResponse) => errorHandler(e, errDialog.current as ErrorDialogHandler))
    .finally(() => infoDialog.current?.close());
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
