import React, {useCallback, useState} from 'react';

import {Core, TableContainer, TableContent, TableHeader, TableRow} from '@/components';

import {DetailCell} from './DetailCell';
import {
  tableContainerStyle,
  tableContentTransparent,
  tableHeaderStyle,
  tableRowSelected
} from './verificationTable.styled';

interface Verification {
  isVerified: boolean;
  canisterId: string;
  name: string;
  repo: string;
  gitCommit: string;
  wasmHash: string;
  lastVerified: string;
  ownerId: string;
  repoVisibility: string;
  rustVersion: string;
  canisterType: string;
  dfxVersion: string;
  optimizeCount: string;
  buildWasmHash: string;
  buildUrl: string;
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
    <TableContainer css={tableContainerStyle} paginated>
      <TableHeader css={tableHeaderStyle}>
        {['Canister ID', 'Name', 'Repo', 'Git Commit', 'Wasm Hash', 'Last Verified', '']}
      </TableHeader>
      <TableContent css={canisterIdSelected === '' ? undefined : tableContentTransparent}>
        {verifications?.map(
          ({
            isVerified,
            canisterId,
            name,
            repo,
            gitCommit,
            wasmHash,
            lastVerified,
            ownerId,
            repoVisibility,
            rustVersion,
            canisterType,
            dfxVersion,
            optimizeCount,
            buildWasmHash,
            buildUrl
          }) => (
            <React.Fragment key={canisterId}>
              <TableRow
                css={canisterIdSelected === canisterId ? tableRowSelected : undefined}
                isSelected={canisterIdSelected === canisterId}
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
              {canisterIdSelected === canisterId && (
                <>
                  <TableRow override>
                    <DetailCell label={'Owner Principal ID'} value={ownerId} />
                    <DetailCell label={'Repo visibility'} value={repoVisibility} />
                  </TableRow>
                  <TableRow override>
                    <DetailCell label={'Rust version'} value={rustVersion} />
                    <DetailCell label={'Canister type'} value={canisterType} />
                  </TableRow>
                  <TableRow override>
                    <DetailCell label={'DFX version'} value={dfxVersion} />
                    <DetailCell label={'WASM Optimization count'} value={optimizeCount} />
                  </TableRow>
                  <TableRow override>
                    <DetailCell label={'Build WASM hash'} value={buildWasmHash} />
                    <DetailCell label={'Build Result'} value={buildUrl} />
                  </TableRow>
                </>
              )}
            </React.Fragment>
          )
        )}
      </TableContent>
    </TableContainer>
  );
};
