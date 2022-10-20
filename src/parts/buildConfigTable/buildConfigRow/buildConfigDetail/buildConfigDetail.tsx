import {FC} from 'react';

import {Core} from '@/components';

import {StatusTooltip} from './statusTooltip';

interface PropTypes {
  label: string;
  value?: string;
  isLink?: boolean;
  isTrim?: boolean;
  statusTooltip?: string;
  buildConfigStatus?: BuildConfigStatus;
}

export type BuildConfigStatus = 'green' | 'gray' | 'red' | undefined;

export const BuildConfigDetail: FC<PropTypes> = ({label, value, isLink, isTrim, statusTooltip, buildConfigStatus}) => (
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
                <StatusTooltip buildConfigStatus={buildConfigStatus} info={statusTooltip} text={value} />
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
