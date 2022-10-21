import {FC, Fragment, MutableRefObject, useCallback, useRef, useState} from 'react';

import {ErrorResponse} from '@psychedelic/cover';
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
import {anonymousBuild} from '@/utils';

import {BuildInfo, BuildInfoStep} from './buildInfoStep';
import {GeneralInfo, GeneralInfoStep} from './generalInfoStep';

export const MultiStepForm: FC = () => {
  const [steps, setSteps] = useState({generalInfoStep: true, buildInfoStep: false});
  const generalInfoRef = useRef<GeneralInfo>(),
    buildInfoRef = useRef<BuildInfo>();
  const errDialogRef = useRef<ErrorDialogHandler>(null),
    infoDialogRef = useRef<InfoDialogHandler>(null),
    successDialogRef = useRef<SuccessDialogHandler>(null);
  const navigate = useNavigate();
  const goToDashboard = useCallback(() => navigate(DASHBOARD_PATH), [navigate]);
  const onGoBack = useCallback((buildInfo: BuildInfo) => {
    buildInfoRef.current = buildInfo;
    setSteps({generalInfoStep: true, buildInfoStep: false});
  }, []);
  const onCompletedGeneralInfoStep = useCallback((generalInfo: GeneralInfo) => {
    generalInfoRef.current = generalInfo;
    setSteps({generalInfoStep: false, buildInfoStep: true});
  }, []);
  const onCompletedBuildInfoStep = useCallback((buildInfo: BuildInfo) => {
    buildInfoRef.current = buildInfo;
    handleSubmit(generalInfoRef, buildInfoRef, infoDialogRef, errDialogRef, successDialogRef);
  }, []);
  const onSubmit = useCallback(() => {
    handleSubmit(generalInfoRef, buildInfoRef, infoDialogRef, errDialogRef, successDialogRef);
  }, []);
  return (
    <>
      {steps.generalInfoStep ? (
        <GeneralInfoStep defaultValue={generalInfoRef.current} onCompleted={onCompletedGeneralInfoStep} />
      ) : (
        <BuildInfoStep defaultValue={buildInfoRef.current} onCompleted={onCompletedBuildInfoStep} onGoBack={onGoBack} />
      )}
      <SuccessDialog actionContent={'Go back to Dashboard'} onAction={goToDashboard} ref={successDialogRef} />
      <InfoDialog ref={infoDialogRef} />
      <ErrorDialog
        actionContent={'Retry Verification'}
        cancelContent={'Close'}
        onAction={onSubmit}
        ref={errDialogRef}
      />
    </>
  );
};

const handleSubmit = (
  generalInfoRef: MutableRefObject<GeneralInfo | undefined>,
  buildInfoRef: MutableRefObject<BuildInfo | undefined>,
  infoDialogRef: MutableRefObject<InfoDialogHandler | null>,
  errDialogRef: MutableRefObject<ErrorDialogHandler | null>,
  successDialogRef: MutableRefObject<SuccessDialogHandler | null>
) => {
  infoDialogRef.current?.open({
    title: 'Submission Processing',
    description: 'Your submission is processing, please allow some time for the verification to finish.'
  });
  anonymousBuild({
    callerId: generalInfoRef.current?.callerId as string,
    delegateCanisterId: generalInfoRef.current?.delegateCanisterId as string,
    canisterId: generalInfoRef.current?.canisterId as string,
    canisterName: generalInfoRef.current?.canisterName as string,
    repoUrl: generalInfoRef.current?.repoUrl as string,
    commitHash: generalInfoRef.current?.commitHash as string,
    repoAccessToken: generalInfoRef.current?.repoAccessToken as string,
    rustVersion: buildInfoRef.current?.rustVersion as string,
    dfxVersion: buildInfoRef.current?.dfxVersion as string,
    optimizeCount: parseInt(buildInfoRef.current?.optimizeCount as string, 10),
    timestamp: parseInt(buildInfoRef.current?.timestamp as string, 10),
    signature: buildInfoRef.current?.signature as string,
    publicKey: buildInfoRef.current?.publicKey as string
  })
    .then(() =>
      successDialogRef.current?.open({
        description: 'Congrats!!! You have submitted verification successfully.',
        showActionBtn: true
      })
    )
    .catch((e: ErrorResponse) => errorHandler(e, errDialogRef.current as ErrorDialogHandler))
    .finally(() => infoDialogRef.current?.close());
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
