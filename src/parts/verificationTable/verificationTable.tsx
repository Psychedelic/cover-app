import React, {useEffect, useMemo, useState} from 'react';

import {TableContainer, TableContent, TableHeader} from '@/components';
import {useVerificationContext} from '@/contexts';
import {Verification} from '@/models';

import {VerificationRow} from './verificationRow';
import {tableContainerStyle, tableContentTransparent, tableHeaderStyle} from './verificationTable.styled';

interface PropTypes {
  defaultVerifications?: Verification[];
}

export const VerificationTable: React.VFC<PropTypes> = ({defaultVerifications}) => {
  const [canisterIdSelected, setCanisterIdSelected] = useState('');
  const {
    state: {verifications = defaultVerifications},
    dispatch
  } = useVerificationContext();
  useEffect(() => dispatch({type: 'fetch'}), [dispatch]);
  return (
    <TableContainer css={tableContainerStyle} paginated>
      <TableHeader css={tableHeaderStyle}>
        {useMemo(
          () => (
            <>
              <th>{'Canister ID'}</th>
              <th>{'Name'}</th>
              <th>{'Repo'}</th>
              <th>{'Git Commit'}</th>
              <th>{'IC Wasm Hash'}</th>
              <th>{'Last Activity'}</th>
              <th>{''}</th>
            </>
          ),
          []
        )}
      </TableHeader>
      <TableContent css={canisterIdSelected === '' ? {} : tableContentTransparent}>
        {verifications?.map((verification, index) => (
          <VerificationRow
            isSelected={canisterIdSelected === verification.canisterId}
            key={verification.canisterId || index}
            setCanisterIdSelected={setCanisterIdSelected}
            verification={verification}
          />
        ))}
      </TableContent>
    </TableContainer>
  );
};
