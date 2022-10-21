import {createRef, FC, useCallback, useEffect, useState} from 'react';

import {Principal} from '@dfinity/principal';
import {faRotate} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useNavigate, useParams} from 'react-router-dom';

import {Core, PaginationHandler, TableContainer, TableContent, TableHeader} from '@/components';
import {NOT_FOUND_PATH} from '@/constants';
import {
  autoRefresh,
  DEFAULT_VERIFICATIONS,
  fetchVerificationByCanisterId,
  fetchVerifications,
  useCoverSettingsContext,
  useVerificationContext
} from '@/contexts';
import {Verification} from '@/models';
import {isDashboardPage, isPrincipal} from '@/utils';

import {VerificationRow} from './verificationRow';
import {tableContainerStyle, tableContentTransparent, tableHeaderStyle} from './verificationTable.styled';

interface PropTypes {
  defaultVerifications?: Verification[];
}

export const VerificationTable: FC<PropTypes> = ({defaultVerifications = DEFAULT_VERIFICATIONS}) => {
  const {
      state: {verifications = defaultVerifications, totalPage, currentCanisterId = '', disablePaginated},
      dispatch
    } = useVerificationContext(),
    {
      state: {coverSettings}
    } = useCoverSettingsContext();

  const {canisterId: canisterIdParam} = useParams(),
    [canisterIdSelected, setCanisterIdSelected] = useState(''),
    navigate = useNavigate(),
    paginationRef = createRef<PaginationHandler>(),
    resetPage = useCallback(() => {
      fetchVerifications(dispatch);
      paginationRef.current?.forceReset();
    }, [paginationRef, dispatch]),
    onPageChanged = useCallback(
      (pageNum: number) => {
        fetchVerifications(dispatch, pageNum);
      },
      [dispatch]
    );

  const isDetailPage = typeof canisterIdParam === 'string' && isPrincipal(canisterIdParam),
    isCanisterNotFound = verifications?.length === 0;

  useEffect(() => {
    if (!(isDashboardPage() || isDetailPage) || (isCanisterNotFound && isDetailPage)) {
      navigate(NOT_FOUND_PATH);
      return;
    }
    isDetailPage
      ? fetchVerificationByCanisterId(dispatch, Principal.fromText(canisterIdParam))
      : fetchVerifications(dispatch);
    return autoRefresh(coverSettings, () => fetchVerifications(dispatch), !isDetailPage);
  }, [dispatch, coverSettings, canisterIdParam, isDetailPage, isCanisterNotFound, navigate]);

  return (
    <TableContainer
      css={tableContainerStyle}
      disablePaginated={disablePaginated}
      onPageChanged={onPageChanged}
      paginated
      ref={paginationRef}
      totalPage={totalPage}>
      <TableHeader css={tableHeaderStyle}>
        <th>{'Canister ID'}</th>
        <th>{'Name'}</th>
        <th>{'Repo'}</th>
        <th>{'Git Commit'}</th>
        <th>{'IC Wasm Hash'}</th>
        <th>{'Last Activity'}</th>
        <th>
          <Core.Button disabled={disablePaginated || isDetailPage} kind={'text'} onClick={resetPage}>
            <FontAwesomeIcon icon={faRotate} spin={!isDetailPage && coverSettings.isAutoRefresh} />
          </Core.Button>
        </th>
      </TableHeader>
      <TableContent css={canisterIdSelected === '' ? {} : tableContentTransparent}>
        {verifications?.map((verification, index) => (
          <VerificationRow
            disableCollapseBtn={Boolean(currentCanisterId)}
            isSelected={(currentCanisterId || canisterIdSelected) === verification.canisterId}
            key={verification.canisterId || index}
            setCanisterIdSelected={setCanisterIdSelected}
            verification={verification}
          />
        ))}
      </TableContent>
    </TableContainer>
  );
};
