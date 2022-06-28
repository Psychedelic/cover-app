import {createRef, FC, useCallback, useEffect, useState} from 'react';

import {faRotate} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {Core, PaginationHandler, TableContainer, TableContent, TableHeader} from '@/components';
import {DEFAULT_VERIFICATIONS, fetchVerifications, useCoverSettingsContext, useVerificationContext} from '@/contexts';
import {Verification} from '@/models';

import {VerificationRow} from './verificationRow';
import {tableContainerStyle, tableContentTransparent, tableHeaderStyle} from './verificationTable.styled';

interface PropTypes {
  defaultVerifications?: Verification[];
}

export const VerificationTable: FC<PropTypes> = ({defaultVerifications = DEFAULT_VERIFICATIONS}) => {
  const [canisterIdSelected, setCanisterIdSelected] = useState('');

  const {
    state: {verifications = defaultVerifications, totalPage, currentCanisterId = '', disablePaginated},
    dispatch
  } = useVerificationContext();

  const {
    state: {coverSettings}
  } = useCoverSettingsContext();

  useEffect(() => {
    fetchVerifications(dispatch);
    let timer: ReturnType<typeof setInterval> | null = null;
    if (coverSettings.isAutoRefresh) {
      timer = setInterval(() => {
        fetchVerifications(dispatch);
      }, parseInt(coverSettings.refreshInterval, 10) * 60_000);
    }
    return () => {
      timer && clearTimeout(timer);
    };
  }, [dispatch, coverSettings.isAutoRefresh, coverSettings.refreshInterval]);

  const onPageChanged = useCallback(
    (pageNum: number) => {
      fetchVerifications(dispatch, pageNum);
    },
    [dispatch]
  );

  const paginationRef = createRef<PaginationHandler>();

  const resetPage = useCallback(() => {
    fetchVerifications(dispatch);
    paginationRef.current?.forceReset();
  }, [paginationRef, dispatch]);

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
          <Core.Button disabled={disablePaginated} kind={'text'} onClick={resetPage}>
            <FontAwesomeIcon icon={faRotate} spin={coverSettings.isAutoRefresh} />
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
