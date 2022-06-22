import React, {useCallback} from 'react';

import {Core, TableRow} from '@/components';
import {Verification} from '@/models';
import {lastUrlSegment, mdy, toGithubUrl} from '@/utils';

import {VerificationDetail} from './verificationDetail';
import {tableRowSelected} from './verificationRow.styled';

interface PropTypes {
  verification: Verification;
  isSelected: boolean;
  setCanisterIdSelected: (canisterId: string) => void;
  disableCollapseBtn?: boolean;
}

const getStatus = (isVerified?: boolean) =>
  typeof isVerified === 'boolean' ? (isVerified ? 'green' : 'red') : isVerified;

export const VerificationRow: React.VFC<PropTypes> = ({
  verification,
  isSelected,
  setCanisterIdSelected,
  disableCollapseBtn
}) => {
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
        disableCollapseBtn={disableCollapseBtn}
        isSelected={isSelected}
        onCollapse={onCollapse}
        rowId={verification.canisterId}
        showCollapseBtn
        showLoadingMaskBtn={typeof verification.isVerified === 'undefined'}
        showLoadingMaskStatus={typeof verification.isVerified === 'undefined'}
        statusAsIcon
        type={getStatus(verification.isVerified)}>
        {[
          <Core.LoadingMask key={0}>
            <Core.CopyableText>{verification.canisterId}</Core.CopyableText>
          </Core.LoadingMask>,
          <Core.LoadingMask key={1}>
            <span>{verification.name}</span>
          </Core.LoadingMask>,
          <Core.LoadingMask depth={2} key={2}>
            <a href={toGithubUrl(verification.repo)} rel={'noreferrer'} target={'_blank'}>
              <span>{lastUrlSegment(verification.repo)}</span>
            </a>
          </Core.LoadingMask>,
          <Core.LoadingMask key={3}>
            <Core.CopyableText color={'gray'}>{verification.gitCommit}</Core.CopyableText>
          </Core.LoadingMask>,
          <Core.LoadingMask key={4}>
            <Core.CopyableText color={'gray'}>{verification.wasmHash}</Core.CopyableText>
          </Core.LoadingMask>,
          <Core.LoadingMask key={5}>
            <span>{mdy(verification.lastActivity)}</span>
          </Core.LoadingMask>
        ]}
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
};
