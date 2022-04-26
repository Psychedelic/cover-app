import React from 'react';

import {Core, TableContainer, TableContent, TableHeader, TableRow} from '@/components';
import {getDuration} from '@/utils';

import {tableBodyStyle} from './activityTable.styled';

interface Activity {
  status?: 'Success' | 'Pending' | 'Failed';
  canisterId?: string;
  datetime?: string;
}

interface PropTypes {
  activities?: Activity[];
}

const activityStatus = {
  Success: 'green',
  Pending: 'yellow',
  Failed: 'red'
};

export const ActivityTable: React.VFC<PropTypes> = ({activities}) => (
  <TableContainer paginated>
    <TableHeader>{['Recent Activity']}</TableHeader>
    <TableContent css={tableBodyStyle}>
      {activities?.map(({status, canisterId, datetime}, index) => (
        <TableRow
          key={datetime || index}
          showLoadingMaskStatus={typeof status === 'undefined'}
          type={status && activityStatus[status]}>
          <Core.LoadingMask>
            <span key={0}>{status}</span>
          </Core.LoadingMask>
          <Core.LoadingMask>
            <Core.CopyableText key={1}>{canisterId}</Core.CopyableText>
          </Core.LoadingMask>
          <Core.LoadingMask>
            <span key={2}>{datetime && getDuration(datetime)}</span>
          </Core.LoadingMask>
        </TableRow>
      ))}
    </TableContent>
  </TableContainer>
);
