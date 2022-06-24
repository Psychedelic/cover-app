import {FC, useCallback, useEffect, useState} from 'react';

import {TableContainer, TableContent, TableHeader} from '@/components';
import {DEFAULT_VERIFICATIONS, fetchVerifications, useVerificationContext} from '@/contexts';
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
  useEffect(() => {
    fetchVerifications(dispatch);
  }, [dispatch]);
  const onPageChanged = useCallback(
    (pageNum: number) => {
      fetchVerifications(dispatch, pageNum);
    },
    [dispatch]
  );
  return (
    <TableContainer
      css={tableContainerStyle}
      disablePaginated={disablePaginated}
      onPageChanged={onPageChanged}
      paginated
      totalPage={totalPage}>
      <TableHeader css={tableHeaderStyle}>
        <>
          <th>{'Canister ID'}</th>
          <th>{'Name'}</th>
          <th>{'Repo'}</th>
          <th>{'Git Commit'}</th>
          <th>{'IC Wasm Hash'}</th>
          <th>{'Last Activity'}</th>
          <th />
        </>
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
