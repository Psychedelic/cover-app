import React, {useCallback, useMemo} from 'react';

import {Core, TableRow} from '@/components';
import {Verification} from '@/models';

import {VerificationDetail} from './verificationDetail';
import {tableRowSelected} from './verificationRow.styled';

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
        showLoadingMaskBtn={typeof verification.isVerified === 'undefined'}
        showLoadingMaskStatus={typeof verification.isVerified === 'undefined'}
        type={getStatus(verification.isVerified)}>
        {useMemo(
          () => [
            <Core.LoadingMask key={0}>
              <Core.CopyableText>{verification.canisterId}</Core.CopyableText>
            </Core.LoadingMask>,
            <Core.LoadingMask key={1}>
              <span>{verification.name}</span>
            </Core.LoadingMask>,
            <Core.LoadingMask key={2}>
              <span>{verification.repo}</span>
            </Core.LoadingMask>,
            <Core.LoadingMask key={3}>
              <Core.CopyableText color={'gray'}>{verification.gitCommit}</Core.CopyableText>
            </Core.LoadingMask>,
            <Core.LoadingMask key={4}>
              <Core.CopyableText color={'gray'}>{verification.wasmHash}</Core.CopyableText>
            </Core.LoadingMask>,
            <Core.LoadingMask key={5}>
              <span>{verification.lastActivity}</span>
            </Core.LoadingMask>
          ],
          [verification]
        )}
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
