import React from 'react';

import {Core, TableContainer, TableContent, TableHeader, TableRow} from '@/components';

import {tableRowStyle} from './activityTable.styled';

interface Activity {
  status: 'Success' | 'Pending' | 'Failed';
  canisterId: string;
  datetime: string;
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
  <TableContainer>
    <TableHeader>{['Recent Activity']}</TableHeader>
    <TableContent css={tableRowStyle}>
      {activities?.map(({status, canisterId, datetime}) => (
        <TableRow key={datetime} type={activityStatus[status]}>
          <span>{status}</span>
          <Core.CopyableText>{canisterId}</Core.CopyableText>
          <span>{datetime}</span>
        </TableRow>
      ))}
    </TableContent>
  </TableContainer>
);
