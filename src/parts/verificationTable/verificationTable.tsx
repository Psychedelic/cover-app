import React from 'react';

import {faCaretSquareRight} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {Core, TableContainer, TableContent, TableHeader, TableRow} from '@/components';

import {tableBodyStyle, tableHeaderStyle} from './verification.styled';

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

export const VerificationTable: React.VFC<PropTypes> = ({verifications}) => (
  <TableContainer>
    <TableHeader css={tableHeaderStyle}>
      {['Canister ID', 'Name', 'Repo', 'Git Commit', 'Wasm Hash', 'Last Verified', '']}
    </TableHeader>
    <TableContent css={tableBodyStyle}>
      {verifications?.map(({isVerified, canisterId, name, repo, gitCommit, wasmHash, lastVerified}) => (
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
          <Core.CopyableText color={'gray'} key={5}>
            {lastVerified}
          </Core.CopyableText>
          <FontAwesomeIcon flip={'vertical'} icon={faCaretSquareRight} size={'lg'} />
        </TableRow>
      ))}
    </TableContent>
  </TableContainer>
);
