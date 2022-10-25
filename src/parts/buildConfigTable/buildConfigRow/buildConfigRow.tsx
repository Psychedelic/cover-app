import {FC, useCallback} from 'react';

import {Core, TableRow} from '@/components';
import {BuildConfig} from '@/models';
import {lastUrlSegment, mdy, toGithubUrl} from '@/utils';

import {BuildConfigDetail, BuildConfigStatus} from './buildConfigDetail';
import {btnRow, tableRowSelected} from './buildConfigRow.styled';

interface PropTypes {
  buildConfig: BuildConfig;
  isSelected: boolean;
  setCanisterIdSelected: (canisterId: string) => void;
  disableCollapseBtn?: boolean;
  onDeleteHandler: (buildConfig: BuildConfig) => void;
  onEditHandler: (buildConfig: BuildConfig) => void;
  onResubmitHandler: (buildConfig: BuildConfig) => void;
}

const getBuildConfigStatus = ({isVerified, lastBuildStatus}: BuildConfig): BuildConfigStatus =>
  lastBuildStatus === 'Building' || lastBuildStatus === 'Pending'
    ? 'gray'
    : typeof isVerified === 'boolean'
    ? isVerified
      ? 'green'
      : 'red'
    : isVerified;

const getStatusTooltip = (buildConfigStatus: BuildConfigStatus): string => {
  switch (buildConfigStatus) {
    case 'red':
      return 'Unverified';
    case 'green':
      return 'Verified';
    case 'gray':
      return 'Building';
    default:
      return '';
  }
};

const getStatusTooltipInfo = (buildConfigStatus: BuildConfigStatus): string => {
  switch (buildConfigStatus) {
    case 'red':
      return 'Wasm hashes do not match.';
    case 'green':
      return 'Wasm hashes matched.';
    case 'gray':
      return 'Canister builds in progress.';
    default:
      return '';
  }
};

export const BuildConfigRow: FC<PropTypes> = ({
  buildConfig,
  isSelected,
  setCanisterIdSelected,
  disableCollapseBtn,
  onDeleteHandler,
  onEditHandler,
  onResubmitHandler
}) => {
  const onCollapse = useCallback(
    (canisterId: string) => {
      setCanisterIdSelected(isSelected ? '' : canisterId);
    },
    [setCanisterIdSelected, isSelected]
  );
  const onDeleteHandlerCb = useCallback(() => {
      onDeleteHandler(buildConfig);
    }, [onDeleteHandler, buildConfig]),
    onEditHandlerCb = useCallback(() => {
      onEditHandler(buildConfig);
    }, [onEditHandler, buildConfig]),
    onResubmitHandlerCb = useCallback(() => {
      onResubmitHandler(buildConfig);
    }, [onResubmitHandler, buildConfig]);
  const buildConfigStatus = getBuildConfigStatus(buildConfig);
  return (
    <>
      <TableRow
        css={isSelected ? tableRowSelected : {}}
        disableCollapseBtn={disableCollapseBtn}
        isSelected={isSelected}
        kind={buildConfigStatus}
        onCollapse={onCollapse}
        rowId={buildConfig.canisterId}
        showCollapseBtn
        showLoadingMaskBtn={typeof buildConfig.isVerified === 'undefined'}
        showLoadingMaskStatus={typeof buildConfig.isVerified === 'undefined'}
        statusAsIcon>
        {[
          <Core.LoadingMask key={0}>
            <Core.CopyableText>{buildConfig.canisterId}</Core.CopyableText>
          </Core.LoadingMask>,
          <Core.LoadingMask key={1}>
            <span>{buildConfig.name}</span>
          </Core.LoadingMask>,
          <Core.LoadingMask depth={2} key={2}>
            <a href={toGithubUrl(buildConfig.repo, buildConfig.gitCommit)} rel={'noreferrer'} target={'_blank'}>
              <span>{lastUrlSegment(buildConfig.repo)}</span>
            </a>
          </Core.LoadingMask>,
          <Core.LoadingMask key={3}>
            <Core.CopyableText color={'gray'}>{buildConfig.gitCommit}</Core.CopyableText>
          </Core.LoadingMask>,
          <Core.LoadingMask key={4}>
            <Core.CopyableText color={'gray'}>{buildConfig.wasmHash}</Core.CopyableText>
          </Core.LoadingMask>,
          <Core.LoadingMask key={5}>
            <span>{mdy(buildConfig.lastActivity)}</span>
          </Core.LoadingMask>
        ]}
      </TableRow>
      {isSelected && (
        <>
          <TableRow override>
            <BuildConfigDetail isTrim label={'Owner | Caller'} value={buildConfig.callerId} />
            <BuildConfigDetail label={'Last build repo visibility'} value={buildConfig.lastBuildRepoVisibility} />
          </TableRow>
          <TableRow override>
            <BuildConfigDetail isTrim label={'Delegate canister'} value={buildConfig.delegateCanisterId} />
            <BuildConfigDetail label={'Last build canister type'} value={buildConfig.lastBuildCanisterType} />
          </TableRow>
          <TableRow override>
            <BuildConfigDetail label={'Rust version'} value={buildConfig.rustVersion} />
            <BuildConfigDetail
              buildConfigStatus={buildConfigStatus}
              label={'Last build status'}
              statusTooltip={getStatusTooltipInfo(buildConfigStatus)}
              value={getStatusTooltip(buildConfigStatus)}
            />
          </TableRow>
          <TableRow override>
            <BuildConfigDetail label={'Dfx version'} value={buildConfig.dfxVersion} />
            <BuildConfigDetail isTrim label={'Last build wasm hash'} value={buildConfig.lastBuildWasmHash} />
          </TableRow>
          <TableRow override>
            <BuildConfigDetail label={'Wasm optimization'} value={buildConfig.optimizeCount} />
            <BuildConfigDetail isLink label={'Last build result'} value={buildConfig.lastBuildUrl} />
          </TableRow>
          <TableRow css={btnRow} override>
            {[
              <td colSpan={8} key={99999}>
                <Core.Button kind={'outline'} onClick={onDeleteHandlerCb}>
                  {'Delete'}
                </Core.Button>
                <Core.Button kind={'outline'} onClick={onEditHandlerCb}>
                  {'Edit'}
                </Core.Button>
                <Core.Button kind={'main'} onClick={onResubmitHandlerCb}>
                  {'Submit'}
                </Core.Button>
              </td>
            ]}
          </TableRow>
        </>
      )}
    </>
  );
};
