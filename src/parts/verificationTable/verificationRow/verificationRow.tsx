import React, {useCallback, useMemo} from 'react';

import {Core, TableRow} from '@/components';

import {VerificationDetail} from './verificationDetail';
import {tableRowSelected} from './verificationRow.styled';

export interface Verification {
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
  verification: Verification;
  isSelected: boolean;
  setCanisterIdSelected: (canisterId: string) => void;
}

export const VerificationRow: React.VFC<PropTypes> = React.memo(({verification, isSelected, setCanisterIdSelected}) => {
  const onCollapse = useCallback(
    (canisterId: string) => {
      setCanisterIdSelected(isSelected ? '' : canisterId);
    },
    [setCanisterIdSelected, isSelected]
  );
  const Row = useMemo(
    () => (
      <TableRow
        css={isSelected ? tableRowSelected : undefined}
        isSelected={isSelected}
        onCollapse={onCollapse}
        rowId={verification.canisterId}
        showCollapseBtn
        type={verification.isVerified ? 'green' : 'red'}>
        <Core.CopyableText key={0}>{verification.canisterId}</Core.CopyableText>
        <span key={1}>{verification.name}</span>
        <span key={2}>{verification.repo}</span>
        <Core.CopyableText color={'gray'} key={3}>
          {verification.gitCommit}
        </Core.CopyableText>
        <Core.CopyableText color={'gray'} key={4}>
          {verification.wasmHash}
        </Core.CopyableText>
        <span key={5}>{verification.lastVerified}</span>
      </TableRow>
    ),
    [onCollapse, isSelected, verification]
  );
  return (
    <>
      {Row}
      {isSelected ? (
        <>
          <TableRow override>
            <VerificationDetail isTrim label={'Owner Principal ID'} value={verification.ownerId} />
            <VerificationDetail label={'Repo visibility'} value={verification.repoVisibility} />
          </TableRow>
          <TableRow override>
            <VerificationDetail label={'Rust version'} value={verification.rustVersion} />
            <VerificationDetail label={'Canister type'} value={verification.canisterType} />
          </TableRow>
          <TableRow override>
            <VerificationDetail label={'DFX version'} value={verification.dfxVersion} />
            <VerificationDetail label={'WASM Optimization count'} value={verification.optimizeCount} />
          </TableRow>
          <TableRow override>
            <VerificationDetail isTrim label={'Build WASM hash'} value={verification.buildWasmHash} />
            <VerificationDetail isLink label={'Build Result'} value={verification.buildUrl} />
          </TableRow>
        </>
      ) : undefined}
    </>
  );
});
