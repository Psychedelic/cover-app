import {FC, useCallback, useEffect} from 'react';

import {faRotate} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {Core, TableContainer, TableContent, TableHeader, TableRow} from '@/components';
import {DEFAULT_STATS, fetchStats, useCoverSettingsContext, useStatsContext} from '@/contexts';
import {Stats} from '@/models';

import {tableBodyStyle, tableContainerStyle} from './statsTable.styled';

interface PropTypes {
  defaultStats?: Stats;
}

const renderItems = (label: string, value?: string) => [
  <td colSpan={2} key={0}>
    <div>
      <div>{label}</div>
    </div>
  </td>,
  <td key={1}>
    <div>
      <div>{value}</div>
    </div>
  </td>
];

export const StatsTable: FC<PropTypes> = ({defaultStats = DEFAULT_STATS}) => {
  const {
    state: {stats = defaultStats, isFetching},
    dispatch
  } = useStatsContext();

  const {
    state: {coverSettings}
  } = useCoverSettingsContext();

  const fetch = useCallback(() => {
    fetchStats(dispatch);
  }, [dispatch]);

  useEffect(fetch, [fetch]);

  return (
    <TableContainer css={tableContainerStyle}>
      <TableHeader>
        <th>{'Statistics'}</th>
        <th>
          <Core.Button disabled={isFetching} kind={'text'} onClick={fetch}>
            <FontAwesomeIcon icon={faRotate} spin={coverSettings.isAutoRefresh} />
          </Core.Button>
        </th>
      </TableHeader>
      <TableContent css={tableBodyStyle}>
        <TableRow override>{renderItems('Total Canisters', stats.totalCanisters)}</TableRow>
        <TableRow override>{renderItems('-- Motoko Canisters', stats.motokoCanistersCount)}</TableRow>
        <TableRow override>{renderItems('-- Rust Canisters', stats.rustCanistersCount)}</TableRow>
        <TableRow override>{renderItems('Build Success Canisters', stats.buildSuccessCount)}</TableRow>
      </TableContent>
    </TableContainer>
  );
};
