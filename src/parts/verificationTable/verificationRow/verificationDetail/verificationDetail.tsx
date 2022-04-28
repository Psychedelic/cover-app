import React from 'react';

import {Core} from '@/components';

interface PropTypes {
  label: string;
  value?: string;
  isLink?: boolean;
  isTrim?: boolean;
}

export const VerificationDetail: React.VFC<PropTypes> = ({label, value, isLink, isTrim}) => (
  <>
    <td colSpan={2}>
      <div>
        <span>{label}</span>
      </div>
    </td>
    <td colSpan={2}>
      <div>
        {isTrim ? (
          value ? (
            <Core.CopyableText>{value}</Core.CopyableText>
          ) : (
            <span>{'N/A'}</span>
          )
        ) : (
          <span>
            {isLink ? (
              <a href={value} rel={'noreferrer'} target={'_blank'}>
                {'View'}
              </a>
            ) : (
              value || 'N/A'
            )}
          </span>
        )}
      </div>
    </td>
  </>
);
