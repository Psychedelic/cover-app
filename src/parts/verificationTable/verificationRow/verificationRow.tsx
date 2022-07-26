import {FC, useCallback} from 'react';

import {Core, TableRow} from '@/components';
import {Verification} from '@/models';
import {lastUrlSegment, mdy, toGithubUrl} from '@/utils';

import {VerificationDetail, VerificationStatus} from './verificationDetail';
import {tableRowSelected} from './verificationRow.styled';

interface PropTypes {
  verification: Verification;
  isSelected: boolean;
  setCanisterIdSelected: (canisterId: string) => void;
  disableCollapseBtn?: boolean;
}

const isCustomBuild = (canisterType?: string): boolean => canisterType === 'Custom';

const getVerificationStatus = ({isVerified, canisterType}: Verification): VerificationStatus =>
  typeof isVerified === 'boolean'
    ? isVerified
      ? isCustomBuild(canisterType)
        ? 'yellow'
        : 'green'
      : 'red'
    : isVerified;

const getStatusTooltip = (verificationStatus: VerificationStatus): string => {
  switch (verificationStatus) {
    case 'red':
      return 'Unverified';
    case 'green':
      return 'Verified';
    case 'yellow':
      return 'Custom build';
    default:
      return '';
  }
};

const getStatusTooltipInfo = (verificationStatus: VerificationStatus): string => {
  switch (verificationStatus) {
    case 'red':
      return 'Wasm hashes do not match.';
    case 'green':
      return 'Wasm hashes matched.';
    case 'yellow':
      return 'Custom build is considered unsafe.';
    default:
      return '';
  }
};

export const VerificationRow: FC<PropTypes> = ({
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
  const verificationStatus = getVerificationStatus(verification);
  return (
    <>
      <TableRow
        css={isSelected ? tableRowSelected : {}}
        disableCollapseBtn={disableCollapseBtn}
        isSelected={isSelected}
        kind={verificationStatus}
        onCollapse={onCollapse}
        rowId={verification.canisterId}
        showCollapseBtn
        showLoadingMaskBtn={typeof verification.isVerified === 'undefined'}
        showLoadingMaskStatus={typeof verification.isVerified === 'undefined'}
        statusAsIcon>
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
            <VerificationDetail isTrim label={'Owner principal'} value={verification.ownerId} />
            <VerificationDetail label={'Repo visibility'} value={verification.repoVisibility} />
          </TableRow>
          <TableRow override>
            <VerificationDetail isTrim label={'Delegate canister'} value={verification.delegateCanisterId} />
            <VerificationDetail label={'Canister type'} value={verification.canisterType} />
          </TableRow>
          <TableRow override>
            <VerificationDetail label={'Rust version'} value={verification.rustVersion} />
            <VerificationDetail
              label={'Verification status'}
              statusTooltip={getStatusTooltipInfo(verificationStatus)}
              value={getStatusTooltip(verificationStatus)}
              verificationStatus={verificationStatus}
            />
          </TableRow>
          <TableRow override>
            <VerificationDetail label={'Dfx version'} value={verification.dfxVersion} />
            <VerificationDetail isTrim label={'COVER build wasm hash'} value={verification.buildWasmHash} />
          </TableRow>
          <TableRow override>
            <VerificationDetail label={'Wasm optimization'} value={verification.optimizeCount} />
            <VerificationDetail isLink label={'COVER build result'} value={verification.buildUrl} />
          </TableRow>
        </>
      )}
    </>
  );
};
