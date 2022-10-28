import {FC, useCallback, useEffect, useRef} from 'react';

import {faRotate} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {Core, PaginationHandler, TableContainer, TableContent, TableHeader} from '@/components';
import {
  autoRefresh,
  DEFAULT_ACTIVITIES,
  fetchActivities,
  useActivityContext,
  useCoverSettingsContext
} from '@/contexts';
import {Activity} from '@/models';
import {ActivityRow} from '@/parts';

import {ActivityEmpty} from './activityEmpty';
import {tableBodyStyle, tableContainerStyle} from './myActivityTable.styled';

interface PropTypes {
  defaultActivity?: Activity[];
}

export const MyActivityTable: FC<PropTypes> = ({defaultActivity = DEFAULT_ACTIVITIES}) => {
  const {
      state: {activities = defaultActivity, totalPage, disablePaginated},
      dispatch
    } = useActivityContext(),
    {
      state: {coverSettings}
    } = useCoverSettingsContext();

  const onPageChange = useCallback((pageNum: number) => fetchActivities(dispatch, pageNum), [dispatch]);

  const paginationRef = useRef<PaginationHandler>(null);

  const resetPage = useCallback(() => {
    fetchActivities(dispatch);
    paginationRef.current?.forceReset();
  }, [dispatch]);

  const isActivityNotFound = activities.length < 1;

  useEffect(() => {
    fetchActivities(dispatch);
    paginationRef.current?.forceReset();
    return autoRefresh(coverSettings, () => {
      fetchActivities(dispatch);
      paginationRef.current?.forceReset();
    });
  }, [dispatch, coverSettings]);

  return (
    <TableContainer
      css={tableContainerStyle}
      disablePaginated={disablePaginated || isActivityNotFound}
      onPageChanged={onPageChange}
      paginated
      ref={paginationRef}
      totalPage={totalPage}>
      <TableHeader>
        <th colSpan={2}>{'My Recent Activities'}</th>
        <th>
          <Core.Button disabled={disablePaginated} kind={'text'} onClick={resetPage}>
            <FontAwesomeIcon icon={faRotate} spin={coverSettings.isAutoRefresh} />
          </Core.Button>
        </th>
      </TableHeader>
      <TableContent css={tableBodyStyle}>
        {isActivityNotFound ? (
          <ActivityEmpty />
        ) : (
          activities?.map(({buildStatus, canisterId, datetime}, index) => (
            <ActivityRow
              buildStatus={buildStatus}
              canisterId={canisterId}
              dateTime={datetime}
              key={(datetime && canisterId && `${datetime}${canisterId}`) || index}
            />
          ))
        )}
      </TableContent>
    </TableContainer>
  );
};
