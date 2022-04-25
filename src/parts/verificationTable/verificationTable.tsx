import React, {useState} from 'react';

import {TableContainer, TableContent, TableHeader} from '@/components';

import {Verification, VerificationRow} from './verificationRow';
import {tableContainerStyle, tableContentTransparent, tableHeaderStyle} from './verificationTable.styled';

interface PropTypes {
  verifications?: Verification[];
}

export const VerificationTable: React.VFC<PropTypes> = ({verifications}) => {
  const [canisterIdSelected, setCanisterIdSelected] = useState('');
  return (
    <TableContainer css={tableContainerStyle} paginated>
      <TableHeader css={tableHeaderStyle}>
        {['Canister ID', 'Name', 'Repo', 'Git Commit', 'IC Wasm Hash', 'Last Activity', '']}
      </TableHeader>
      <TableContent css={canisterIdSelected === '' ? undefined : tableContentTransparent}>
        {verifications?.map(verification => (
          <VerificationRow
            isSelected={canisterIdSelected === verification.canisterId}
            key={verification.canisterId}
            setCanisterIdSelected={setCanisterIdSelected}
            verification={verification}
          />
        ))}
      </TableContent>
    </TableContainer>
  );
};
