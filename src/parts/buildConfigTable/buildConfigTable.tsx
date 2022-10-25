import {FC, Fragment, useCallback, useEffect, useRef, useState} from 'react';

import {Principal} from '@dfinity/principal';
import {faRotate} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {ErrorResponse} from '@psychedelic/cover';
import {useNavigate, useParams} from 'react-router-dom';

import {
  Core,
  ErrorDialog,
  ErrorDialogHandler,
  InfoDialog,
  InfoDialogHandler,
  SuccessDialog,
  SuccessDialogHandler,
  TableContainer,
  TableContent,
  TableHeader
} from '@/components';
import {BUILD_CONFIG_SUBMIT_PATH, DASHBOARD_PATH, NOT_FOUND_PATH} from '@/constants';
import {
  autoRefresh,
  DEFAULT_BUILD_CONFIGS,
  deleteBuildConfig,
  fetchBuildConfigByCanisterId,
  fetchBuildConfigs,
  useAuthenticationContext,
  useBuildConfigContext,
  useCoverSettingsContext
} from '@/contexts';
import {BuildConfig} from '@/models';
import {anonymousBuildWithConfig, isMyCanisterPage, isPrincipal} from '@/utils';

import {BuildConfigRow} from './buildConfigRow';
import {tableContainerStyle, tableContentTransparent, tableHeaderStyle} from './buildConfigTable.styled';

interface PropTypes {
  defaultBuildConfigs?: BuildConfig[];
}

export const BuildConfigTable: FC<PropTypes> = ({defaultBuildConfigs = DEFAULT_BUILD_CONFIGS}) => {
  const {
      state: {buildConfigs = defaultBuildConfigs, currentCanisterId = ''},
      dispatch
    } = useBuildConfigContext(),
    {
      state: {coverSettings}
    } = useCoverSettingsContext(),
    {
      state: {isPending, isAuthenticated}
    } = useAuthenticationContext();

  const errDialogRef = useRef<ErrorDialogHandler>(null),
    infoDialogRef = useRef<InfoDialogHandler>(null),
    successDialogRef = useRef<SuccessDialogHandler>(null);

  const {canisterId: canisterIdParam} = useParams(),
    [canisterIdSelected, setCanisterIdSelected] = useState(''),
    resetPage = useCallback(() => {
      fetchBuildConfigs(dispatch);
    }, [dispatch]),
    navigate = useNavigate();

  const isDetailPage = typeof canisterIdParam === 'string' && isPrincipal(canisterIdParam),
    isCanisterNotFound = buildConfigs?.length === 0;

  const onDeleteHandler = useCallback(
      (buildConfig: BuildConfig) => {
        (async () => {
          await deleteBuildConfig(dispatch, Principal.fromText(buildConfig.canisterId as string));
          await fetchBuildConfigs(dispatch);
        })();
      },
      [dispatch]
    ),
    onEditHandler = useCallback(
      (buildConfig: BuildConfig) => navigate(BUILD_CONFIG_SUBMIT_PATH, {state: {buildConfig}}),
      [navigate]
    ),
    onResubmitHandler = useCallback((buildConfig: BuildConfig) => {
      infoDialogRef.current?.open({
        title: 'Submission Processing',
        description: 'Your submission is processing, please allow some time for the verification to finish.'
      });
      anonymousBuildWithConfig({
        canisterId: buildConfig.canisterId as string,
        repoAccessToken: '',
        callerId: buildConfig.callerId as string,
        publicKey: '',
        signature: '',
        timestamp: 0
      })
        .then(() =>
          successDialogRef.current?.open({
            description: 'Congrats!!! You have submitted verification successfully.',
            showActionBtn: true
          })
        )
        .catch((e: ErrorResponse) => errorHandler(e, errDialogRef.current as ErrorDialogHandler))
        .finally(() => infoDialogRef.current?.close());
    }, []);

  useEffect(() => {
    if (typeof isPending === 'undefined' || isPending) {
      return;
    }
    if (!isAuthenticated) {
      navigate(DASHBOARD_PATH);
      return;
    }
    if (!(isMyCanisterPage() || isDetailPage) || (isCanisterNotFound && isDetailPage)) {
      navigate(NOT_FOUND_PATH);
      return;
    }
    isDetailPage
      ? fetchBuildConfigByCanisterId(dispatch, Principal.fromText(canisterIdParam))
      : fetchBuildConfigs(dispatch);
    return autoRefresh(coverSettings, () => fetchBuildConfigs(dispatch), !isDetailPage);
  }, [
    dispatch,
    coverSettings,
    canisterIdParam,
    isDetailPage,
    isCanisterNotFound,
    isPending,
    isAuthenticated,
    navigate
  ]);

  return (
    <TableContainer css={tableContainerStyle} paginated={false}>
      <TableHeader css={tableHeaderStyle}>
        <th>{'Canister ID'}</th>
        <th>{'Name'}</th>
        <th>{'Repo'}</th>
        <th>{'Git Commit'}</th>
        <th>{'IC Wasm Hash'}</th>
        <th>{'Last Activity'}</th>
        <th>
          <Core.Button disabled={isDetailPage} kind={'text'} onClick={resetPage}>
            <FontAwesomeIcon icon={faRotate} spin={!isDetailPage && coverSettings.isAutoRefresh} />
          </Core.Button>
        </th>
      </TableHeader>
      <TableContent css={canisterIdSelected === '' ? {} : tableContentTransparent}>
        {buildConfigs?.map((buildConfig, index) => (
          <BuildConfigRow
            buildConfig={buildConfig}
            disableCollapseBtn={Boolean(currentCanisterId)}
            isNew={!buildConfig.lastBuildWasmHash}
            isSelected={(currentCanisterId || canisterIdSelected) === buildConfig.canisterId}
            key={buildConfig.canisterId || index}
            onDeleteHandler={onDeleteHandler}
            onEditHandler={onEditHandler}
            onResubmitHandler={onResubmitHandler}
            setCanisterIdSelected={setCanisterIdSelected}
          />
        ))}
      </TableContent>
      <SuccessDialog ref={successDialogRef} />
      <InfoDialog ref={infoDialogRef} />
      <ErrorDialog ref={errDialogRef} />
    </TableContainer>
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
