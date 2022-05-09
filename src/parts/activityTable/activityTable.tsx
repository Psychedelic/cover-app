import React, {useCallback, useEffect, useState} from 'react';

import {ActivitiesPagination, Activity as CanisterActivity} from '@psychedelic/cover';

import {TableContainer, TableContent, TableHeader} from '@/components';
import {ActivityRow} from '@/parts';
import {coverSDK} from '@/utils';

import {tableBodyStyle, tableContainerStyle} from './activityTable.styled';

interface Activity {
  buildStatus?: 'Success' | 'Pending' | 'Error' | 'Building';
  canisterId?: string;
  datetime?: string;
}
interface PropTypes {
  activity?: Activity[];
}

export const mapActivity = (activity: CanisterActivity): Activity => ({
  buildStatus: Object.keys(activity.build_status)[0] as 'Success' | 'Pending' | 'Error' | 'Building',
  canisterId: activity.canister_id.toString(),
  datetime: activity.create_at
});

export const mapActivityList = (activityList: CanisterActivity[]): Activity[] => activityList.map(a => mapActivity(a));

const fetchActivity = (pageNum = 1): Promise<ActivitiesPagination> =>
  coverSDK.getActivities({page_index: BigInt(pageNum), items_per_page: BigInt(12)});

const emptyList = Array<Activity>(12).fill({});

export const ActivityTable: React.VFC<PropTypes> = ({activity = emptyList}) => {
  const [activities, setActivities] = useState(activity);
  const [lastPage, setLastPage] = useState(1);
  const [disablePaginated, setDisablePaginated] = useState(false);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      const activityPagination = await fetchActivity();
      isMounted && setLastPage(Number(activityPagination.total_pages));
      isMounted && setActivities(mapActivityList(activityPagination.data));
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  const onPageChange = useCallback(pageNum => {
    setActivities(emptyList);
    setDisablePaginated(true);
    (async () => {
      const activityPagination = await fetchActivity(pageNum);
      setActivities(mapActivityList(activityPagination.data));
      setDisablePaginated(false);
      setLastPage(Number(activityPagination.total_pages));
    })();
  }, []);

  return (
    <TableContainer
      css={tableContainerStyle}
      disablePaginated={disablePaginated}
      lastPage={lastPage}
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
