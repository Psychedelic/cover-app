import React from 'react';

import {Core, TableRow} from '@/components';
import {getDuration} from '@/utils';

interface PropTypes {
  buildStatus?: 'Success' | 'Pending' | 'Error' | 'Building';
  canisterId?: string;
  dateTime?: string;
}

const activityStatus: {[key: string]: 'red' | 'yellow' | 'green'} = {
  Success: 'green',
  Pending: 'yellow',
  Error: 'red',
  Building: 'yellow'
};

export const ActivityRow: React.FC<PropTypes> = ({buildStatus, canisterId, dateTime}) => (
  <TableRow
    showLoadingMaskStatus={typeof buildStatus === 'undefined'}
    type={buildStatus ? activityStatus[buildStatus] : null}>
    <Core.LoadingMask key={0}>
      <span>{buildStatus}</span>
    </Core.LoadingMask>
    <Core.LoadingMask key={1}>
      <Core.CopyableText>{canisterId}</Core.CopyableText>
    </Core.LoadingMask>
    <Core.LoadingMask key={2}>
      <span>{dateTime ? getDuration(dateTime) : null}</span>
    </Core.LoadingMask>
  </TableRow>
);
