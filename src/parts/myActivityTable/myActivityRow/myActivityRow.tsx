import {FC} from 'react';

import {Core, TableRow} from '@/components';
import {getDuration} from '@/utils';

interface PropTypes {
  buildStatus?: 'Success' | 'Pending' | 'Error' | 'Building';
  buildConfigStatus?: 'Save' | 'Delete';
  canisterId?: string;
  dateTime?: Date;
}

const activityStatus: {[key: string]: 'red' | 'yellow' | 'green'} = {
  Success: 'green',
  Pending: 'yellow',
  Error: 'red',
  Building: 'yellow',
  Save: 'green',
  Delete: 'red'
};

export const MyActivityRow: FC<PropTypes> = ({buildStatus, buildConfigStatus, canisterId, dateTime}) => (
  <TableRow
    kind={(buildStatus || buildConfigStatus) && activityStatus[(buildStatus || buildConfigStatus) as string]}
    showLoadingMaskStatus={typeof canisterId === 'undefined'}>
    <Core.LoadingMask key={0}>
      <span>{buildStatus || buildConfigStatus}</span>
    </Core.LoadingMask>
    <Core.LoadingMask key={1}>
      <Core.CopyableText>{canisterId}</Core.CopyableText>
    </Core.LoadingMask>
    <Core.LoadingMask key={2}>
      <span>{dateTime && getDuration(dateTime)}</span>
    </Core.LoadingMask>
  </TableRow>
);
