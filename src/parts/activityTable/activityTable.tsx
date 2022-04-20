import React from 'react';

import {Core, TableContainer, TableContent, TableHeader, TableRow} from '@/components';

import {tableBodyStyle} from './activityTable.styled';

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
    <TableContent css={tableBodyStyle}>
      {activities?.map(({status, canisterId, datetime}) => (
        <TableRow key={datetime} type={activityStatus[status]}>
          <span key={0}>{status}</span>
          <Core.CopyableText key={1}>{canisterId}</Core.CopyableText>
          <span key={2}>{datetime}</span>
        </TableRow>
      ))}
    </TableContent>
  </TableContainer>
);
