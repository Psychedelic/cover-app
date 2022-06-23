import React, {useCallback, useEffect} from 'react';

import {TableContainer, TableContent, TableHeader} from '@/components';
import {DEFAULT_ACTIVITIES, fetchActivities, useActivityContext} from '@/contexts';
import {Activity} from '@/models';
import {ActivityRow} from '@/parts';

import {tableBodyStyle, tableContainerStyle} from './activityTable.styled';

interface PropTypes {
  defaultActivity?: Activity[];
}

export const ActivityTable: React.FC<PropTypes> = ({defaultActivity = DEFAULT_ACTIVITIES}) => {
  const {
    state: {activities = defaultActivity, totalPage, disablePaginated},
    dispatch
  } = useActivityContext();
  useEffect(() => {
    fetchActivities(dispatch);
  }, [dispatch]);
  const onPageChange = useCallback(
    (pageNum: number) => {
      fetchActivities(dispatch, pageNum);
    },
    [dispatch]
  );
  return (
    <TableContainer
      css={tableContainerStyle}
      disablePaginated={disablePaginated}
      lastPage={totalPage}
      onPageChanged={onPageChange}
      paginated>
      <TableHeader>
        <th colSpan={2}>{'Recent Activities'}</th>
      </TableHeader>
      <TableContent css={tableBodyStyle}>
        {activities?.map(({buildStatus, canisterId, datetime}, index) => (
          <ActivityRow
            buildStatus={buildStatus}
            canisterId={canisterId}
            dateTime={datetime}
            key={(datetime && canisterId && `${datetime}${canisterId}`) || index}
          />
        ))}
      </TableContent>
    </TableContainer>
  );
};
