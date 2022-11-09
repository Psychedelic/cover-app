import {FC, useCallback, useEffect} from 'react';

import {faRotate} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {Core, TableContainer, TableContent, TableHeader, TableRow} from '@/components';
import {autoRefresh, DEFAULT_MY_STATS, fetchMyStats, useCoverSettingsContext, useMyStatsContext} from '@/contexts';
import {Stats} from '@/models';

import {tableBodyStyle, tableContainerStyle} from './myStatsTable.styled';

interface PropTypes {
  defaultStats?: Stats;
}

const renderItems = (label: string, value?: string) => [
  <td colSpan={3} key={0}>
    <div>
      <div>{label}</div>
    </div>
  </td>,
  <td colSpan={2} key={1}>
    <div>
      <div>{value}</div>
    </div>
  </td>
];

export const MyStatsTable: FC<PropTypes> = ({defaultStats = DEFAULT_MY_STATS}) => {
  const {
      state: {myStats = defaultStats, isFetching},
      dispatch
    } = useMyStatsContext(),
    {
      state: {coverSettings}
    } = useCoverSettingsContext();

  const resetPage = useCallback(() => fetchMyStats(dispatch), [dispatch]);

  useEffect(() => {
    fetchMyStats(dispatch);
    return autoRefresh(coverSettings, () => fetchMyStats(dispatch));
  }, [dispatch, coverSettings]);

  return (
    <TableContainer css={tableContainerStyle}>
      <TableHeader>
        <th colSpan={3}>{'My Verification Statistics'}</th>
        <th>
          <Core.Button disabled={isFetching} kind={'text'} onClick={resetPage}>
            <FontAwesomeIcon icon={faRotate} spin={coverSettings.isAutoRefresh} />
          </Core.Button>
        </th>
      </TableHeader>
      <TableContent css={tableBodyStyle}>
        <TableRow override>{renderItems('Total Canisters', myStats.totalCanisters)}</TableRow>
        <TableRow override>{renderItems('-- Motoko Canisters', myStats.motokoCanistersCount)}</TableRow>
        <TableRow override>{renderItems('-- Rust Canisters', myStats.rustCanistersCount)}</TableRow>
        <TableRow override>{renderItems('-- Assets Canisters', myStats.assetsCanisterCount)}</TableRow>
        <TableRow override>{renderItems('-- Custom Canisters', myStats.customCanistersCount)}</TableRow>
        <TableRow override>{renderItems('-- Unknown Canisters', myStats.unknownCanistersCount)}</TableRow>
        <TableRow override>{renderItems('Build Success Canisters', myStats.buildSuccessCount)}</TableRow>
      </TableContent>
    </TableContainer>
  );
};
