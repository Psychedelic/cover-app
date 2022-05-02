import React, {useCallback, useEffect, useState} from 'react';

import {TableContainer, TableContent, TableHeader} from '@/components';
import {fetchVerifications, useVerificationContext} from '@/contexts';
import {Verification} from '@/models';

import {VerificationRow} from './verificationRow';
import {tableContainerStyle, tableContentTransparent, tableHeaderStyle} from './verificationTable.styled';

interface PropTypes {
  defaultVerifications?: Verification[];
}

export const VerificationTable: React.VFC<PropTypes> = ({defaultVerifications}) => {
  const [canisterIdSelected, setCanisterIdSelected] = useState('');
  const {
    state: {verifications = defaultVerifications, totalPage, currentCanisterIdSelected = ''},
    dispatch
  } = useVerificationContext();
  useEffect(() => {
    fetchVerifications(dispatch);
  }, [dispatch]);
  const onPageChanged = useCallback(
    pageNum => {
      fetchVerifications(dispatch, pageNum);
    },
    [dispatch]
  );
  return (
    <TableContainer css={tableContainerStyle} lastPage={totalPage} onPageChanged={onPageChanged} paginated>
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
            disableCollapseBtn={Boolean(currentCanisterIdSelected)}
            isSelected={(currentCanisterIdSelected || canisterIdSelected) === verification.canisterId}
            key={verification.canisterId || index}
            setCanisterIdSelected={setCanisterIdSelected}
            verification={verification}
          />
        ))}
      </TableContent>
    </TableContainer>
  );
};
