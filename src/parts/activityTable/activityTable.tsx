import {createRef, FC, useCallback, useEffect} from 'react';

import {faRotate} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {Core, PaginationHandler, TableContainer, TableContent, TableHeader} from '@/components';
import {DEFAULT_ACTIVITIES, fetchActivities, useActivityContext, useCoverSettingsContext} from '@/contexts';
import {Activity} from '@/models';
import {ActivityRow} from '@/parts';

import {tableBodyStyle, tableContainerStyle} from './activityTable.styled';

interface PropTypes {
  defaultActivity?: Activity[];
}

export const ActivityTable: FC<PropTypes> = ({defaultActivity = DEFAULT_ACTIVITIES}) => {
  const {
    state: {activities = defaultActivity, totalPage, disablePaginated},
    dispatch
  } = useActivityContext();

  const {
    state: {coverSettings}
  } = useCoverSettingsContext();

  useEffect(() => {
    fetchActivities(dispatch);
    let timer: ReturnType<typeof setInterval> | null = null;
    if (coverSettings.isAutoRefresh) {
      timer = setInterval(() => {
        fetchActivities(dispatch);
      }, parseInt(coverSettings.refreshInterval, 10) * 60_000);
    }
    return () => {
      timer && clearTimeout(timer);
    };
  }, [dispatch, coverSettings.isAutoRefresh, coverSettings.refreshInterval]);

  const onPageChange = useCallback(
    (pageNum: number) => {
      fetchActivities(dispatch, pageNum);
    },
    [dispatch]
  );

  const paginationRef = createRef<PaginationHandler>();

  const resetPage = useCallback(() => {
    fetchActivities(dispatch);
    paginationRef.current?.forceReset();
  }, [paginationRef, dispatch]);

  return (
    <TableContainer
      css={tableContainerStyle}
      disablePaginated={disablePaginated}
      onPageChanged={onPageChange}
      paginated
      ref={paginationRef}
      totalPage={totalPage}>
      <TableHeader>
        <th colSpan={2}>{'Recent Activities'}</th>
        <th>
          <Core.Button disabled={disablePaginated} kind={'text'} onClick={resetPage}>
            <FontAwesomeIcon icon={faRotate} spin={coverSettings.isAutoRefresh} />
          </Core.Button>
        </th>
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
