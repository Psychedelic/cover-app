import {FC, useCallback, useEffect, useState} from 'react';

import {Principal} from '@dfinity/principal';
import {faRotate} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {_SERVICE as CoverActor} from '@psychedelic/cover';
import {useNavigate, useParams} from 'react-router-dom';

import {Core, TableContainer, TableContent, TableHeader} from '@/components';
import {NOT_FOUND_PATH} from '@/constants';
import {
  DEFAULT_BUILD_CONFIGS,
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
      state: {plugCoverActor}
    } = useAuthenticationContext();

  const {canisterId: canisterIdParam} = useParams(),
    [canisterIdSelected, setCanisterIdSelected] = useState(''),
    resetPage = useCallback(() => {
      fetchBuildConfigs(dispatch, plugCoverActor as CoverActor);
    }, [dispatch, plugCoverActor]),
    navigate = useNavigate();

  const isDetailPage = typeof canisterIdParam === 'string' && isPrincipal(canisterIdParam),
    isCanisterNotFound = buildConfigs?.length === 0;

  const onDeleteHandler = useCallback((_buildConfig: BuildConfig) => {
      // Do nothing.
    }, []),
    onEditHandler = useCallback((_buildConfig: BuildConfig) => {
      // Do nothing.
    }, []),
    onResubmitHandler = useCallback((_buildConfig: BuildConfig) => {
      // Do nothing.
    }, []);

  useEffect(() => {
    if (!(isMyCanisterPage() || isDetailPage) || (isCanisterNotFound && isDetailPage)) {
      navigate(NOT_FOUND_PATH);
      return () => {
        // Do nothing.
      };
    }
    isDetailPage
      ? fetchBuildConfigByCanisterId(dispatch, plugCoverActor as CoverActor, Principal.fromText(canisterIdParam))
      : fetchBuildConfigs(dispatch, plugCoverActor as CoverActor);
    let timer: ReturnType<typeof setInterval> | null = null;
    if (!isDetailPage && coverSettings.isAutoRefresh) {
      timer = setInterval(() => {
        fetchBuildConfigs(dispatch, plugCoverActor as CoverActor);
      }, parseInt(coverSettings.refreshInterval, 10) * 60_000);
    }
    return () => {
      timer && clearTimeout(timer);
    };
  }, [
    dispatch,
    coverSettings.isAutoRefresh,
    coverSettings.refreshInterval,
    canisterIdParam,
    isDetailPage,
    isCanisterNotFound,
    navigate,
    plugCoverActor
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
