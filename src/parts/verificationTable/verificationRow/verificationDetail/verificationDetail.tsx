import {FC} from 'react';

import {Core} from '@/components';

import {StatusTooltip} from './statusTooltip';

interface PropTypes {
  label: string;
  value?: string;
  isLink?: boolean;
  isTrim?: boolean;
  statusTooltip?: string;
  verificationStatus?: VerificationStatus;
}

export type VerificationStatus =
  | 'green'
  // 'yellow' |
  | 'red'
  | undefined;

export const VerificationDetail: FC<PropTypes> = ({
  label,
  value,
  isLink,
  isTrim,
  statusTooltip,
  verificationStatus
}) => (
  <>
    <td colSpan={2}>
      <div>
        <span>{label}</span>
      </div>
    </td>
    <td colSpan={2}>
      <div>
        {value ? (
          isTrim ? (
            <Core.CopyableText>{value}</Core.CopyableText>
          ) : (
            <span>
              {isLink ? (
                <a href={value} rel={'noreferrer'} target={'_blank'}>
                  {'View'}{' '}
                </a>
              ) : statusTooltip ? (
                <StatusTooltip info={statusTooltip} text={value} verificationStatus={verificationStatus} />
              ) : (
                value
              )}
            </span>
          )
        ) : (
          <span>{'N/A'}</span>
        )}
      </div>
    </td>
  </>
);
