import {FC, useCallback, useEffect, useState} from 'react';

import {Principal} from '@dfinity/principal';
import {faRotate} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useNavigate, useParams} from 'react-router-dom';

import {Core, TableContainer, TableContent, TableHeader} from '@/components';
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
import {isMyCanisterPage, isPrincipal} from '@/utils';

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
    onResubmitHandler = useCallback((_buildConfig: BuildConfig) => {
      // Do nothing.
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
            isSelected={(currentCanisterId || canisterIdSelected) === buildConfig.canisterId}
            key={buildConfig.canisterId || index}
            onDeleteHandler={onDeleteHandler}
            onEditHandler={onEditHandler}
            onResubmitHandler={onResubmitHandler}
            setCanisterIdSelected={setCanisterIdSelected}
          />
        ))}
      </TableContent>
    </TableContainer>
  );
};
