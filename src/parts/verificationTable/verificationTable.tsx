import React, {useCallback, useState} from 'react';

import {faCaretSquareDown} from '@fortawesome/free-regular-svg-icons';
import {faCaretSquareRight} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

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

// FIXME: react-hooks/rules-of-hooks
export const VerificationTable: React.VFC<PropTypes> = ({verifications}) => {
  const [canisterIdSelected, setCanisterIdSelected] = useState('');
  return (
    <TableContainer>
      <TableHeader css={tableHeaderStyle}>
        {['Canister ID', 'Name', 'Repo', 'Git Commit', 'Wasm Hash', 'Last Verified', '']}
      </TableHeader>
      <TableContent css={tableBodyStyle}>
        {verifications?.map(({isVerified, canisterId, name, repo, gitCommit, wasmHash, lastVerified}) => {
          const onClick = useCallback(() => {
            setCanisterIdSelected(canisterIdSelected === canisterId ? '' : canisterId);
          }, [canisterIdSelected, canisterId]);
          return (
            <TableRow key={canisterId} type={isVerified ? 'green' : 'red'}>
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
              <Core.Button key={6} onClick={onClick} type={'text'}>
                <FontAwesomeIcon
                  icon={canisterIdSelected === canisterId ? faCaretSquareDown : faCaretSquareRight}
                  size={'lg'}
                />
              </Core.Button>
            </TableRow>
          );
        })}
      </TableContent>
    </TableContainer>
  );
};
