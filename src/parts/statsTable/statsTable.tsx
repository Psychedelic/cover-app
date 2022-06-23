import React, {useEffect} from 'react';

import {TableContainer, TableContent, TableHeader, TableRow} from '@/components';
import {DEFAULT_STATS, fetchStats, useStatsContext} from '@/contexts';
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

export const StatsTable: React.VFC<PropTypes> = ({defaultStats = DEFAULT_STATS}) => {
  const {
    state: {stats = defaultStats},
    dispatch
  } = useStatsContext();
  useEffect(() => {
    fetchStats(dispatch);
  }, [dispatch]);
  return (
    <TableContainer css={tableContainerStyle}>
      <TableHeader>
        <th colSpan={2}>{'Statistics'}</th>
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
