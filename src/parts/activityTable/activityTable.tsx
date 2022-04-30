import React from 'react';

import {Core, TableContainer, TableContent, TableHeader, TableRow} from '@/components';
import {getDuration} from '@/utils';

import {tableBodyStyle, tableContainerStyle} from './activityTable.styled';

interface Activity {
  status?: 'Success' | 'Pending' | 'Failed';
  canisterId?: string;
  datetime?: string;
}

interface PropTypes {
  activities?: Activity[];
}

const activityStatus: {[key: string]: 'red' | 'yellow' | 'green'} = {
  Success: 'green',
  Pending: 'yellow',
  Failed: 'red'
};

export const ActivityTable: React.VFC<PropTypes> = ({activities}) => (
  <TableContainer css={tableContainerStyle} paginated>
    <TableHeader>
      <th colSpan={2}>{'Recent Activity'}</th>
    </TableHeader>
    <TableContent css={tableBodyStyle}>
      {activities?.map(({status, canisterId, datetime}, index) => (
        <TableRow
          key={datetime || index}
          showLoadingMaskStatus={typeof status === 'undefined'}
          type={status && activityStatus[status]}>
          <Core.LoadingMask key={0}>
            <span>{status}</span>
          </Core.LoadingMask>
          <Core.LoadingMask key={1}>
            <Core.CopyableText>{canisterId}</Core.CopyableText>
          </Core.LoadingMask>
          <Core.LoadingMask key={2}>
            <span>{datetime && getDuration(datetime)}</span>
          </Core.LoadingMask>
        </TableRow>
      ))}
    </TableContent>
  </TableContainer>
);
