import {FC, useCallback, useEffect, useRef} from 'react';

import {faRotate} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {Core, PaginationHandler, TableContainer, TableContent, TableHeader} from '@/components';
import {
  autoRefresh,
  DEFAULT_MY_ACTIVITIES,
  fetchMyActivities,
  useMyActivityContext,
  useCoverSettingsContext
} from '@/contexts';
import {MyActivity} from '@/models';

import {MyActivityEmpty} from './myActivityEmpty';
import {MyActivityRow} from './myActivityRow';
import {tableBodyStyle, tableContainerStyle} from './myActivityTable.styled';

interface PropTypes {
  defaultActivity?: MyActivity[];
}

export const MyActivityTable: FC<PropTypes> = ({defaultActivity = DEFAULT_MY_ACTIVITIES}) => {
  const {
      state: {myActivities = defaultActivity, totalPage, disablePaginated},
      dispatch
    } = useMyActivityContext(),
    {
      state: {coverSettings}
    } = useCoverSettingsContext();

  const onPageChange = useCallback((pageNum: number) => fetchMyActivities(dispatch, pageNum), [dispatch]);

  const paginationRef = useRef<PaginationHandler>(null);

  const resetPage = useCallback(() => {
    fetchMyActivities(dispatch);
    paginationRef.current?.forceReset();
  }, [dispatch]);

  const isActivityNotFound = myActivities.length < 1;

  useEffect(() => {
    fetchMyActivities(dispatch);
    paginationRef.current?.forceReset();
    return autoRefresh(coverSettings, () => {
      fetchMyActivities(dispatch);
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
          <MyActivityEmpty />
        ) : (
          myActivities?.map(({buildStatus, buildConfigStatus, canisterId, datetime}, index) => (
            <MyActivityRow
              buildStatus={buildStatus}
              buildConfigStatus={buildConfigStatus}
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
