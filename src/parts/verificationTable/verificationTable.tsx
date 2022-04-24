import React, {useCallback, useState} from 'react';

import {Core, TableContainer, TableContent, TableHeader, TableRow} from '@/components';

import {tableBodyStyle, tableHeaderStyle} from './verificationTable.styled';

interface Verification {
  isVerified: boolean;
  canisterId: string;
  name: string;
  repo: string;
  gitCommit: string;
  wasmHash: string;
  lastVerified: string;
}

interface PropTypes {
  verifications?: Verification[];
}

export const VerificationTable: React.VFC<PropTypes> = ({verifications}) => {
  const [canisterIdSelected, setCanisterIdSelected] = useState('');
  const onCollapse = useCallback(
    (canisterId: string) => {
      setCanisterIdSelected(canisterId === canisterIdSelected ? '' : canisterId);
    },
    [canisterIdSelected]
  );
  return (
    <TableContainer>
      <TableHeader css={tableHeaderStyle}>
        {['Canister ID', 'Name', 'Repo', 'Git Commit', 'Wasm Hash', 'Last Verified', '']}
      </TableHeader>
      <TableContent css={tableBodyStyle}>
        {verifications?.map(({isVerified, canisterId, name, repo, gitCommit, wasmHash, lastVerified}) => (
          <TableRow
            isSelected={canisterIdSelected === canisterId}
            key={canisterId}
            onCollapse={onCollapse}
            rowId={canisterId}
            showCollapseBtn
            type={isVerified ? 'green' : 'red'}>
            <Core.CopyableText key={0}>{canisterId}</Core.CopyableText>
            <span key={1}>{name}</span>
            <span key={2}>{repo}</span>
            <Core.CopyableText color={'gray'} key={3}>
              {gitCommit}
            </Core.CopyableText>
            <Core.CopyableText color={'gray'} key={4}>
              {wasmHash}
            </Core.CopyableText>
            <span key={5}>{lastVerified}</span>
          </TableRow>
        ))}
      </TableContent>
    </TableContainer>
  );
};
