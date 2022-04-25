import React from 'react';

export const DetailCell: React.VFC<{label: string; value: string; isLink?: boolean}> = ({label, value, isLink}) => (
  <>
    <td colSpan={2}>
      <div>
        <span>{label}</span>
      </div>
    </td>
    <td colSpan={2}>
      <div>
        <span>{isLink ? <a href={value}>{'View'}</a> : value}</span>
      </div>
    </td>
  </>
);
