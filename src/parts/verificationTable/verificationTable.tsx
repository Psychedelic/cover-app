import React, {useCallback, useRef, useState} from 'react';

import {Core, TableContainer, TableContent, TableHeader, TableRow} from '@/components';

import {VerificationDetail} from './verificationDetail';
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
  const cacheSelectedCanisterId = useRef('');
  const onCollapse = useCallback((canisterId: string) => {
    cacheSelectedCanisterId.current = canisterId === cacheSelectedCanisterId.current ? '' : canisterId;
    setCanisterIdSelected(cacheSelectedCanisterId.current);
  }, []);
  return (
    <TableContainer css={tableContainerStyle} paginated>
      <TableHeader css={tableHeaderStyle}>
        {['Canister ID', 'Name', 'Repo', 'Git Commit', 'IC Wasm Hash', 'Last Activity', '']}
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
                    <VerificationDetail isTrim label={'Owner Principal ID'} value={ownerId} />
                    <VerificationDetail label={'Repo visibility'} value={repoVisibility} />
                  </TableRow>
                  <TableRow override>
                    <VerificationDetail label={'Rust version'} value={rustVersion} />
                    <VerificationDetail label={'Canister type'} value={canisterType} />
                  </TableRow>
                  <TableRow override>
                    <VerificationDetail label={'DFX version'} value={dfxVersion} />
                    <VerificationDetail label={'WASM Optimization count'} value={optimizeCount} />
                  </TableRow>
                  <TableRow override>
                    <VerificationDetail isTrim label={'Build WASM hash'} value={buildWasmHash} />
                    <VerificationDetail isLink label={'Build Result'} value={buildUrl} />
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
