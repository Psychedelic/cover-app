import React, {useCallback} from 'react';

import {Core, TableRow} from '@/components';

import {VerificationDetail} from './verificationDetail';
import {tableRowSelected} from './verificationRow.styled';

export interface Verification {
  isVerified?: boolean;
  canisterId?: string;
  name?: string;
  repo?: string;
  gitCommit?: string;
  wasmHash?: string;
  lastVerified?: string;
  ownerId?: string;
  repoVisibility?: string;
  rustVersion?: string;
  canisterType?: string;
  dfxVersion?: string;
  optimizeCount?: string;
  buildWasmHash?: string;
  buildUrl?: string;
}

interface PropTypes {
  verification: Verification;
  isSelected: boolean;
  setCanisterIdSelected: (canisterId: string) => void;
}

const getStatus = (isVerified?: boolean) =>
  typeof isVerified === 'boolean' ? (isVerified ? 'green' : 'red') : isVerified;

export const VerificationRow: React.VFC<PropTypes> = React.memo(({verification, isSelected, setCanisterIdSelected}) => {
  const onCollapse = useCallback(
    (canisterId: string) => {
      setCanisterIdSelected(isSelected ? '' : canisterId);
    },
    [setCanisterIdSelected, isSelected]
  );
  return (
    <>
      <TableRow
        css={isSelected ? tableRowSelected : {}}
        isSelected={isSelected}
        onCollapse={onCollapse}
        rowId={verification.canisterId}
        showCollapseBtn
        showLoadingMask
        type={getStatus(verification.isVerified)}>
        <Core.LoadingMask key={0}>
          <Core.CopyableText>{verification.canisterId}</Core.CopyableText>
        </Core.LoadingMask>
        <Core.LoadingMask key={1}>
          <span>{verification.name}</span>
        </Core.LoadingMask>
        <Core.LoadingMask key={2}>
          <span>{verification.repo}</span>
        </Core.LoadingMask>
        <Core.LoadingMask key={3}>
          <Core.CopyableText color={'gray'}>{verification.gitCommit}</Core.CopyableText>
        </Core.LoadingMask>
        <Core.LoadingMask key={4}>
          <Core.CopyableText color={'gray'}>{verification.wasmHash}</Core.CopyableText>
        </Core.LoadingMask>
        <Core.LoadingMask key={5}>
          <span>{verification.lastVerified}</span>
        </Core.LoadingMask>
      </TableRow>
      {isSelected && (
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
      )}
    </>
  );
});
